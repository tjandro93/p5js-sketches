import * as P5 from 'p5';
import { ButtonControl, Sketch, SliderControl } from 'src/app/core';
import { CheckboxControl } from 'src/app/core/types/sketch-controls/checkbox-control';
import {
  createCanvasOnParentContainer,
  DARK_MODE_BACKGROUND,
  DARK_MODE_FOREGROUND,
  Bounds,
  PointGridOptionsByRowColCount,
} from 'src/app/sketch-lib';
import { FlowFieldForce } from '../types/flow-field-force';
import { RandomInitialPositionKinematicsStrategy } from '../types/initial-kinematics-strategy/random-initial-position-kinematics-strategy';
import { RealTimeParticleDrawStrategy } from '../types/particle-draw-strategy/real-time-particle-draw-strategy';
import { SimpleFlowFieldParticleFactory } from '../types/particle/simple-flow-field-particle';
import { PerlinFlowField } from '../types/perlin-flow-field';

const runPauseButton = new ButtonControl('Pause');
const drawOnceButton = new ButtonControl('Draw Once');
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

export const flowField2: Sketch = {
  title: 'Flow Field 2',
  width: 1000,
  height: 800,
  isSvg: false,
  controls: {
    refreshButton: true,
    downloadButton: true,
    customControls: [
      runPauseButton,
      drawOnceButton,
      drawForcesCheckbox,
      forceColCountSlider,
      forceRowCountSlider,
      forcePerlinXFactorSlider,
      forcePerlinYFactorSlider,
      forceAngleBiasSlider,
      particleCountSlider,
      minParticleSpeedSlider,
      maxParticleSpeedSlider,
    ],
  },
  func: (p5: P5) => {
    let running = true;
    let frameCount = 0;

    const bounds: Bounds = {
      maxX: 1000,
      maxY: 800,
    };

    // TODO this should come from a select control once more are implemented
    const initialKinematicsStrategy =
      new RandomInitialPositionKinematicsStrategy(p5, bounds);

    // TODO this should come from a select control once more are implemented
    const particleFactory = new SimpleFlowFieldParticleFactory(
      p5,
      initialKinematicsStrategy,
      bounds,
      minParticleSpeedSlider.value,
      maxParticleSpeedSlider.value
    );
    const particleDrawStrategy = new RealTimeParticleDrawStrategy(p5);

    let flowField: PerlinFlowField;

    p5.setup = () => {
      createCanvasOnParentContainer(p5, {
        width: flowField2.width,
        height: flowField2.height,
        useSvg: flowField2.isSvg,
      });
      p5.background(DARK_MODE_BACKGROUND);
      p5.stroke(DARK_MODE_FOREGROUND, 48);
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
          columnCount: forceColCountSlider.value,
          rowCount: forceRowCountSlider.value,
        } as PointGridOptionsByRowColCount<FlowFieldForce>,
        forcePerlinXFactor: forcePerlinXFactorSlider.value,
        forcePerlinYFactor: forcePerlinYFactorSlider.value,
        angleBias: forceAngleBiasSlider.value * Math.PI,
        particleFactory,
        particleCount: particleCountSlider.value,
        particleDrawStrategy,
      });
    };

    p5.draw = () => {
      if (running) {
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
