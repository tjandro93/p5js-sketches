import * as p5 from 'p5';
import { ButtonControl, Sketch, SliderControl } from '../core';
import {
  createCanvasOnParentContainer,
  DARK_MODE_BACKGROUND,
  DARK_MODE_FOREGROUND,
} from '../sketch-lib';

const segmentsSlider = new SliderControl('Segments', 1, 500, 100, 1);
const linesSlider = new SliderControl('Lines', 1, 500, 50, 1);
const randomMinSlider = new SliderControl('Random Min', -100, 100, -20, 0.1);
const randomMaxSlider = new SliderControl('Random Max', -100, 100, 20, 1);
const runPauseButton = new ButtonControl('Pause');
const drawOnceButton = new ButtonControl('Draw Once');

export const randomLines: Sketch = {
  title: 'Random Lines',
  controls: {
    customControls: [
      runPauseButton,
      drawOnceButton,
      segmentsSlider,
      linesSlider,
      randomMinSlider,
      randomMaxSlider,
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

      for (let i = 0; i < linesSlider.value; i++) {
        let currentX = p.width / 2;
        let currentY = p.height / 2;

        for (let j = 0; j < segmentsSlider.value; j++) {
          const nextX = p.constrain(
            currentX + p.random(randomMinSlider.value, randomMaxSlider.value),
            0,
            p.width
          );
          const nextY = p.constrain(
            currentY + p.random(randomMinSlider.value, randomMaxSlider.value),
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
