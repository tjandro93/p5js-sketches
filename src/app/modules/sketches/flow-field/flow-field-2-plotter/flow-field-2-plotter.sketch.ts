import * as P5 from 'p5';
import { PlotterFriendlyDimensions, Sketch, SliderControl } from 'src/app/core';
import { CheckboxControl } from 'src/app/core/types/sketch-controls/checkbox-control';
import { SelectControl } from 'src/app/core/types/sketch-controls/select-control';
import {
  createCanvasOnParentContainer,
  DARK_MODE_FOREGROUND,
  Bounds,
  PointGridOptionsByRowColCount,
} from 'src/app/sketch-lib';
import { FlowFieldForce } from '../types/flow-field-force';
import { ApplyClosestForceStrategy } from '../types/particle/apply-forces-strategy/apply-closest-force-strategy';
import {
  applyForcesStrategyTypeValues,
  ApplyForcesStrategyType,
} from '../types/particle/apply-forces-strategy/apply-forces-strategy';
import { FlowFieldParticleOptions } from '../types/particle/flow-field-particle';
import { FlowFieldParticleFactory } from '../types/particle/flow-field-particle-factory';
import {
  handleOutOfBoundsStrategyTypeValues,
  HandleOutOfBoundsStrategyType,
  HandleOutOfBoundsStrategy,
} from '../types/particle/handle-out-of-bounds-strategy/handle-out-of-bounds-strategy';
import { ReinitiateHandleOutOfBoundsStrategy } from '../types/particle/handle-out-of-bounds-strategy/reinitiate-handle-of-bounds-strategy';
import {
  initialKinematicsStrategyTypeValues,
  InitialKinematicsStrategyType,
  InitialKinematicsStrategy,
} from '../types/particle/initial-kinematics-strategy/initial-kinematics-strategy';
import { RandomInitialPositionKinematicsStrategy } from '../types/particle/initial-kinematics-strategy/random-initial-position-kinematics-strategy';
import { BatchParticleDrawStrategy } from '../types/particle/particle-draw-strategy/batch-particle-draw-strategy';
import {
  flowFieldParticleDrawStrategyTypeValues,
  FlowFieldParticleDrawStrategyType,
  FlowFieldParticleDrawStrategy,
} from '../types/particle/particle-draw-strategy/particle-draw-strategy';
import { RealTimeParticleDrawStrategy } from '../types/particle/particle-draw-strategy/real-time-particle-draw-strategy';
import { PerlinFlowField } from '../types/perlin-flow-field';

const iterationCountSlider = new SliderControl(
  'Iterations',
  1,
  10000,
  2000,
  10
);
const drawForcesCheckbox = new CheckboxControl('Draw Forces', false);
const forceColCountSlider = new SliderControl(
  'Force Column Count',
  2,
  100,
  10,
  1
);
const forceRowCountSlider = new SliderControl('Force Row Count', 2, 100, 10, 1);
const forcePerlinXFactorSlider = new SliderControl(
  'Perlin Force X Factor',
  0.001,
  1,
  0.01,
  0.001
);
const forcePerlinYFactorSlider = new SliderControl(
  'Perlin Force Y Factor',
  0.001,
  1,
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
  FlowFieldParticleDrawStrategyType.Batch
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

export const flowField2Plotter: Sketch = {
  title: 'Flow Field 2 (Plotter)',
  width: PlotterFriendlyDimensions.square.width,
  height: PlotterFriendlyDimensions.square.height,
  isSvg: true,
  controls: {
    refreshButton: true,
    downloadButton: true,
    customControls: [
      iterationCountSlider,
      drawForcesCheckbox,
      forceColCountSlider,
      forceRowCountSlider,
      forcePerlinXFactorSlider,
      forcePerlinYFactorSlider,
      forceAngleBiasSlider,
      particleCountSlider,
      minParticleSpeedSlider,
      maxParticleSpeedSlider,
      particleDrawStrategySelect,
      initialKinematicsStrategySelect,
      applyForcesStrategySelect,
      handleOutOfBoundsStrategySelect,
    ],
  },
  func: (p5: P5) => {
    const bounds: Bounds = {
      maxX: flowField2Plotter.width,
      maxY: flowField2Plotter.height,
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

    p5.setup = () => {
      console.log('setup() started');
      const setupStart = p5.millis();

      createCanvasOnParentContainer(p5, {
        width: flowField2Plotter.width,
        height: flowField2Plotter.height,
        useSvg: flowField2Plotter.isSvg,
      });
      // p5.background(DARK_MODE_BACKGROUND);
      p5.stroke(DARK_MODE_FOREGROUND, 48);
      p5.noFill();
      p5.blendMode(p5.SCREEN);

      p5.noiseSeed(p5.random(0, 10000));
      p5.randomSeed(p5.random(0, 10000));

      const flowField = new PerlinFlowField(p5, {
        drawForces: drawForcesCheckbox.value,
        pointGridOptions: {
          bounds,
          columnCount: forceColCountSlider.value,
          rowCount: forceRowCountSlider.value,
        } as PointGridOptionsByRowColCount<FlowFieldForce>,
        forcePerlinXFactor: forcePerlinXFactorSlider.value,
        forcePerlinYFactor: forcePerlinYFactorSlider.value,
        angleBias: forceAngleBiasSlider.value * Math.PI,
        particleFactory,
        particleCount: particleCountSlider.value,
      });

      for (let i = 0; i < iterationCountSlider.value; i++) {
        flowField.step();
      }
      flowField.draw();

      const setupEnd = p5.millis();

      console.log(`setup() took ${setupEnd - setupStart}ms to run`);
    };
  },
};
