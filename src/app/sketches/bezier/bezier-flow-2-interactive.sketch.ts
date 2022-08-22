import * as P5 from 'p5';
import { ButtonControl, Sketch, SliderControl } from 'src/app/core';
import {
  bezier,
  createCanvasOnParentContainer,
  DARK_MODE_BACKGROUND,
  DARK_MODE_FOREGROUND,
  Vector,
} from 'src/app/sketch-lib';

const runPauseButton = new ButtonControl('Pause');
const drawOnceButton = new ButtonControl('Draw Once');
const flowLineCountSlider = new SliderControl('Flow line count', 1, 50, 15, 1);
const flowCountSlider = new SliderControl('Flow count', 1, 50, 15, 1);
const positionNoiseStepSlider = new SliderControl(
  'Position noise step',
  0,
  5,
  0.01,
  0.001
);
const timeNoiseStepSlider = new SliderControl(
  'Time noise step',
  0,
  0.05,
  0.001,
  0.0001
);

export const bezierFlow2Interactive: Sketch = {
  title: 'Bezier Flow 2 (interactive)',
  controls: {
    customControls: [
      runPauseButton,
      drawOnceButton,
      flowLineCountSlider,
      flowCountSlider,
      positionNoiseStepSlider,
      timeNoiseStepSlider,
    ],
  },
  func: (p5: P5) => {
    let running = true;
    let frameCount = 0;

    p5.setup = () => {
      createCanvasOnParentContainer(p5);

      p5.background(DARK_MODE_BACKGROUND);
      p5.stroke(DARK_MODE_FOREGROUND, 100);
      p5.strokeWeight(1);
      p5.noFill();
      p5.angleMode(p5.DEGREES);

      drawOnceButton.onPress = () => {
        drawOnce();
      };

      runPauseButton.onPress = () => {
        running = !running;
        runPauseButton.label$.next(running ? 'Pause' : 'Run');
      };
    };

    p5.draw = () => {
      if (running) {
        drawOnce();
      }
    };

    function drawOnce(): void {
      p5.background(DARK_MODE_BACKGROUND);
      const flowSpacing = p5.width / flowCountSlider.value;
      for (let i = 0; i <= flowCountSlider.value; i++) {
        drawFlow({ x: flowSpacing * i, y: 0 }, i);
      }

      function drawFlow(startAnchor: Vector, anchorIndex: number) {
        const anchor2Spacing = p5.width / flowLineCountSlider.value;
        for (let i = 0; i <= flowLineCountSlider.value; i++) {
          const control1 = {
            x:
              p5.width *
              p5.noise(
                anchorIndex * positionNoiseStepSlider.value,
                frameCount * timeNoiseStepSlider.value
              ),
            y:
              p5.height *
              p5.noise(
                i * positionNoiseStepSlider.value,
                frameCount * timeNoiseStepSlider.value
              ),
          };
          const control2 = {
            x:
              p5.width *
              p5.noise(
                i * positionNoiseStepSlider.value,
                frameCount * timeNoiseStepSlider.value
              ),
            y:
              p5.height *
              p5.noise(
                anchorIndex * positionNoiseStepSlider.value,
                frameCount * timeNoiseStepSlider.value
              ),
          };

          const anchor2 = {
            x: anchor2Spacing * i,
            y: p5.height,
          };

          bezier(p5, startAnchor, control1, control2, anchor2);
        }
      }
      frameCount++;
    }
  },
};
