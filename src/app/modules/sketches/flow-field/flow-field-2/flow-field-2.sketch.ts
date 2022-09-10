import * as P5 from 'p5';
import { ButtonControl, Sketch, SliderControl } from 'src/app/core';
import { CheckboxControl } from 'src/app/core/types/sketch-controls/checkbox-control';
import { SelectControl } from 'src/app/core/types/sketch-controls/select-control';
import {
  createCanvasOnParentContainer,
  DARK_MODE_BACKGROUND,
  DARK_MODE_FOREGROUND,
  Bounds,
  PointGridOptionsByRowColCount,
} from 'src/app/sketch-lib';
import { FlowFieldForce } from '../types/flow-field-force';
import { ApplyClosestForceStrategy } from '../types/particle/apply-forces-strategy/apply-closest-force-strategy';
import {
  ApplyForcesStrategyType,
  applyForcesStrategyTypeValues,
} from '../types/particle/apply-forces-strategy/apply-forces-strategy';
import { FlowFieldParticleOptions } from '../types/particle/flow-field-particle';
import { FlowFieldParticleFactory } from '../types/particle/flow-field-particle-factory';
import {
  HandleOutOfBoundsStrategy,
  HandleOutOfBoundsStrategyType,
  handleOutOfBoundsStrategyTypeValues,
} from '../types/particle/handle-out-of-bounds-strategy/handle-out-of-bounds-strategy';
import { KillParticleOutOfBoundsStrategy } from '../types/particle/handle-out-of-bounds-strategy/kill-particle-out-of-bounds-strategy';
import { ReinitiateHandleOutOfBoundsStrategy } from '../types/particle/handle-out-of-bounds-strategy/reinitiate-handle-of-bounds-strategy';
import {
  InitialKinematicsStrategy,
  InitialKinematicsStrategyType,
  initialKinematicsStrategyTypeValues,
} from '../types/particle/initial-kinematics-strategy/initial-kinematics-strategy';
import { RandomAnyEdgeInitialPositionStrategy } from '../types/particle/initial-kinematics-strategy/random-any-edge-initial-position-strategy';
import { RandomBottomEdgeInitialPositionStrategy } from '../types/particle/initial-kinematics-strategy/random-bottom-edge-initial-position-strategy';
import { RandomInCircleInitialPositionStrategy } from '../types/particle/initial-kinematics-strategy/random-in-circle-initial-position-strategy';
import { RandomInitialPositionKinematicsStrategy } from '../types/particle/initial-kinematics-strategy/random-initial-position-kinematics-strategy';
import { RandomLeftEdgeInitialPositionStrategy } from '../types/particle/initial-kinematics-strategy/random-left-edge-initial-position-strategy';
import { RandomRightEdgeInitialPositionStrategy } from '../types/particle/initial-kinematics-strategy/random-right-edge-initial-position-strategy';
import { RandomTopEdgeInitialPositionStrategy } from '../types/particle/initial-kinematics-strategy/random-top-edge-initial-position-strategy';
import { BatchParticleDrawStrategy } from '../types/particle/particle-draw-strategy/batch-particle-draw-strategy';
import {
  FlowFieldParticleDrawStrategy,
  FlowFieldParticleDrawStrategyType,
  flowFieldParticleDrawStrategyTypeValues,
} from '../types/particle/particle-draw-strategy/particle-draw-strategy';
import { RealTimeParticleDrawStrategy } from '../types/particle/particle-draw-strategy/real-time-particle-draw-strategy';
import { PerlinFlowField } from '../types/perlin-flow-field';

const width = 1000;
const height = 800;

const runPauseButton = new ButtonControl('Pause');
const drawOnceButton = new ButtonControl('Draw Once');
const drawForcesCheckbox = new CheckboxControl('Draw Forces', false);
const clearBeforeDrawCheckbox = new CheckboxControl('Clear before draw', false);
const particleAlphaSlider = new SliderControl('Particle Alpha', 0, 255, 64, 1);
const forceGridCountSlider = new SliderControl(
  'Force Grid Count',
  2,
  100,
  10,
  1
);
const forcePerlinFactorSlider = new SliderControl(
  'Perlin Force Factor',
  0.0001,
  0.1,
  0.01,
  0.001
);
const forceAngleBiasSlider = new SliderControl(
  'Force Angle Bias (multiples of Pi)',
  0.5,
  2,
  0.01,
  0.01
);

const minParticleSpeedSlider = new SliderControl(
  'Minimum Particle Speed',
  0,
  10,
  0.1,
  0.1
);
const maxParticleSpeedSlider = new SliderControl(
  'Maximum Particle Speed',
  0,
  10,
  5,
  0.1
);
const particleCountSlider = new SliderControl('Particle Count', 1, 100, 10, 1);
const particleDrawStrategySelect = new SelectControl(
  'Particle Draw Strategy',
  flowFieldParticleDrawStrategyTypeValues,
  FlowFieldParticleDrawStrategyType.RealTime
);
const initialKinematicsStrategySelect = new SelectControl(
  'Initial Kinematics Strategy',
  initialKinematicsStrategyTypeValues,
  InitialKinematicsStrategyType.FullyRandom
);
const applyForcesStrategySelect = new SelectControl(
  'Apply Forces Strategy',
  applyForcesStrategyTypeValues,
  ApplyForcesStrategyType.ApplyClosestForce
);
const handleOutOfBoundsStrategySelect = new SelectControl(
  'Handle Out of Bounds Strategy',
  handleOutOfBoundsStrategyTypeValues,
  HandleOutOfBoundsStrategyType.Reinitiate
);
const randomInCircleRadiusSlider = new SliderControl(
  'Random in circle radius',
  1,
  1000,
  200,
  1
);
const randomInCircleXPosSlider = new SliderControl(
  'Random in circle X position',
  1,
  width,
  width / 2,
  1
);
const randomInCircleYPosSlider = new SliderControl(
  'Random in circle Y position',
  1,
  height,
  height / 2,
  1
);

export const flowField2: Sketch = {
  title: 'Flow Field 2',
  width,
  height,
  isSvg: false,
  controls: {
    refreshButton: true,
    downloadButton: true,
    customControls: [
      runPauseButton,
      drawOnceButton,
      clearBeforeDrawCheckbox,
      particleAlphaSlider,
      drawForcesCheckbox,
      forceGridCountSlider,
      forcePerlinFactorSlider,
      forceAngleBiasSlider,
      particleCountSlider,
      minParticleSpeedSlider,
      maxParticleSpeedSlider,
      particleDrawStrategySelect,
      applyForcesStrategySelect,
      handleOutOfBoundsStrategySelect,
      initialKinematicsStrategySelect,
      randomInCircleRadiusSlider,
      randomInCircleXPosSlider,
      randomInCircleYPosSlider,
    ],
  },
  func: (p5: P5) => {
    let running = true;
    let frameCount = 0;
    const clearBeforeDraw = clearBeforeDrawCheckbox.value;

    const bounds: Bounds = {
      minX: 0,
      maxX: width,
      minY: 0,
      maxY: height,
    };

    const particleDrawStrategies: Record<
      FlowFieldParticleDrawStrategyType,
      FlowFieldParticleDrawStrategy
    > = {
      [FlowFieldParticleDrawStrategyType.Batch]: new BatchParticleDrawStrategy(
        p5
      ),
      [FlowFieldParticleDrawStrategyType.RealTime]:
        new RealTimeParticleDrawStrategy(p5),
    };

    const initialKinematicsStrategies: Record<
      InitialKinematicsStrategyType,
      InitialKinematicsStrategy
    > = {
      [InitialKinematicsStrategyType.FullyRandom]:
        new RandomInitialPositionKinematicsStrategy(p5, bounds),
      [InitialKinematicsStrategyType.RandomLeftEdge]:
        new RandomLeftEdgeInitialPositionStrategy(p5, bounds),
      [InitialKinematicsStrategyType.RandomRightEdge]:
        new RandomRightEdgeInitialPositionStrategy(p5, bounds),
      [InitialKinematicsStrategyType.RandomTopEdge]:
        new RandomTopEdgeInitialPositionStrategy(p5, bounds),
      [InitialKinematicsStrategyType.RandomBottomEdge]:
        new RandomBottomEdgeInitialPositionStrategy(p5, bounds),
      [InitialKinematicsStrategyType.RandomAnyEdge]:
        new RandomAnyEdgeInitialPositionStrategy(p5, bounds),
      [InitialKinematicsStrategyType.RandomInCircle]:
        new RandomInCircleInitialPositionStrategy(
          p5,
          randomInCircleRadiusSlider.value,
          p5.createVector(
            randomInCircleXPosSlider.value,
            randomInCircleYPosSlider.value
          )
        ),
    };

    const applyForcesStrategies: Record<
      ApplyForcesStrategyType,
      ApplyClosestForceStrategy
    > = {
      [ApplyForcesStrategyType.ApplyClosestForce]:
        new ApplyClosestForceStrategy(),
    };

    const handleOutOfBoundsStrategies: Record<
      HandleOutOfBoundsStrategyType,
      HandleOutOfBoundsStrategy
    > = {
      [HandleOutOfBoundsStrategyType.Reinitiate]:
        new ReinitiateHandleOutOfBoundsStrategy(),
      [HandleOutOfBoundsStrategyType.Kill]:
        new KillParticleOutOfBoundsStrategy(),
    };

    const particleFactoryOptions: FlowFieldParticleOptions = {
      particleDrawStrategy:
        particleDrawStrategies[particleDrawStrategySelect.value],
      initialKinematicsStrategy:
        initialKinematicsStrategies[initialKinematicsStrategySelect.value],
      applyForcesStrategy:
        applyForcesStrategies[applyForcesStrategySelect.value],
      handleOutOfBoundsStrategy:
        handleOutOfBoundsStrategies[handleOutOfBoundsStrategySelect.value],
      bounds,
      minSpeed: minParticleSpeedSlider.value,
      maxSpeed: maxParticleSpeedSlider.value,
    };

    const particleFactory = new FlowFieldParticleFactory(
      particleFactoryOptions
    );

    let flowField: PerlinFlowField;

    p5.setup = () => {
      createCanvasOnParentContainer(p5, {
        width: flowField2.width,
        height: flowField2.height,
        useSvg: flowField2.isSvg,
      });
      p5.background(DARK_MODE_BACKGROUND);
      p5.stroke(DARK_MODE_FOREGROUND, particleAlphaSlider.value);
      p5.noFill();
      p5.blendMode(p5.SCREEN);

      p5.noiseSeed(p5.random(0, 10000));
      p5.randomSeed(p5.random(0, 10000));

      drawOnceButton.onPress = () => {
        drawOnce();
      };

      runPauseButton.onPress = () => {
        running = !running;
        runPauseButton.label$.next(running ? 'Pause' : 'Run');
      };

      flowField = new PerlinFlowField(p5, {
        drawForces: drawForcesCheckbox.value,
        pointGridOptions: {
          bounds,
          columnCount: forceGridCountSlider.value,
          rowCount: forceGridCountSlider.value,
        } as PointGridOptionsByRowColCount<FlowFieldForce>,
        forcePerlinXFactor: forcePerlinFactorSlider.value,
        forcePerlinYFactor: forcePerlinFactorSlider.value,
        angleBias: forceAngleBiasSlider.value * Math.PI,
        particleFactory,
        particleCount: particleCountSlider.value,
      });
    };

    p5.draw = () => {
      if (running) {
        if (clearBeforeDraw) {
          p5.blendMode(p5.REPLACE);
          p5.background(DARK_MODE_BACKGROUND);
          p5.blendMode(p5.SCREEN);
        }
        drawOnce();
      }
    };

    function drawOnce(): void {
      flowField.step();
      flowField.draw();

      frameCount++;
    }
  },
};
