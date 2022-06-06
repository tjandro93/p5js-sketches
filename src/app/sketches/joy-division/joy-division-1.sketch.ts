import * as P5 from 'p5';
import { ButtonControl, Sketch, SliderControl } from 'src/app/core';
import {
  createCanvasOnParentContainer,
  DARK_MODE_BACKGROUND,
  DARK_MODE_FOREGROUND,
} from 'src/app/sketch-lib';

const runPauseButton = new ButtonControl('Pause');
const drawOnceButton = new ButtonControl('Draw Once');
const segmentXNoiseStepSlider = new SliderControl(
  'Segment X noise step',
  0,
  100,
  15,
  0.1
);
const segmentYNoiseStepSlider = new SliderControl(
  'Segment Y noise step',
  0,
  100,
  20,
  0.1
);
const segmentXMinLengthStepSlider = new SliderControl(
  'Segment X min length',
  0,
  100,
  25,
  0.1
);
const segmentYMinLengthStepSlider = new SliderControl(
  'Segment Y min length',
  0,
  100,
  25,
  0.1
);
const segmentCount = new SliderControl('Segment count', 0, 100, 25, 1);

export const joyDivision1: Sketch = {
  title: 'Joy Division 1',
  controls: {
    refreshButton: true,
    downloadButton: true,
    customControls: [
      runPauseButton,
      drawOnceButton,
      segmentXNoiseStepSlider,
      segmentYNoiseStepSlider,
      segmentXMinLengthStepSlider,
      segmentYMinLengthStepSlider,
      segmentCount,
    ],
  },
  func: (p5: P5) => {
    let running = true;
    let frameCount = 0;

    p5.setup = () => {
      createCanvasOnParentContainer(p5, {
        width: joyDivision1.width,
        height: joyDivision1.height,
      });
      p5.background(DARK_MODE_BACKGROUND);
      p5.stroke(DARK_MODE_FOREGROUND);

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

      let currentX = p5.width / 10;
      let currentY = (p5.height / 10) * 9;

      for (let i = 0; i < segmentCount.value; i++) {
        const nextX =
          currentX +
          segmentXMinLengthStepSlider.value *
            p5.noise(i * segmentXNoiseStepSlider.value);
        const nextY =
          currentY -
          segmentYMinLengthStepSlider.value *
            p5.noise(i * segmentYNoiseStepSlider.value);
        p5.line(currentX, currentY, nextX, nextY);
        currentX = nextX;
        currentY = nextY;
      }

      frameCount++;
    }
  },
};
