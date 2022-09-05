import { ButtonControl, Sketch, SliderControl } from '../../../../core';
import * as p5 from 'p5';
import {
  createCanvasOnParentContainer,
  DARK_MODE_BACKGROUND,
  DARK_MODE_FOREGROUND,
} from '../../../../sketch-lib';

const runPauseButton = new ButtonControl('Pause');
const drawOnceButton = new ButtonControl('Draw Once');
const segmentSlider = new SliderControl('Segments', 1, 500, 100, 1);
const lineSlider = new SliderControl('Lines', 1, 500, 50, 1);
const gausMeanSlider = new SliderControl('Gaus Mean', -100, 100, 0, 0.1);
const gausSdSlider = new SliderControl('Gaus SD', -100, 100, 20, 1);

export const randomGuassianLines: Sketch = {
  title: 'Random Guassian Lines',
  controls: {
    customControls: [
      runPauseButton,
      drawOnceButton,
      segmentSlider,
      lineSlider,
      gausMeanSlider,
      gausSdSlider,
    ],
  },
  func: (p: p5) => {
    let running = true;

    p.setup = () => {
      createCanvasOnParentContainer(p);

      p.frameRate(15);
      p.background(DARK_MODE_BACKGROUND);
      p.stroke(DARK_MODE_FOREGROUND);

      drawOnceButton.onPress = () => {
        drawOnce();
      };

      runPauseButton.onPress = () => {
        running = !running;
        runPauseButton.label$.next(running ? 'Pause' : 'Run');
      };
    };

    p.draw = () => {
      if (running) {
        drawOnce();
      }
    };

    function drawOnce(): void {
      p.background(DARK_MODE_BACKGROUND);

      for (let i = 0; i < lineSlider.value; i++) {
        let currentX = p.width / 2;
        let currentY = p.height / 2;

        for (let j = 0; j < segmentSlider.value; j++) {
          const nextX = p.constrain(
            currentX +
              p.randomGaussian(gausMeanSlider.value, gausSdSlider.value),
            0,
            p.width
          );
          const nextY = p.constrain(
            currentY +
              p.randomGaussian(gausMeanSlider.value, gausSdSlider.value),
            0,
            p.height
          );

          p.line(currentX, currentY, nextX, nextY);

          currentX = nextX;
          currentY = nextY;
        }
      }
    }
  },
};
