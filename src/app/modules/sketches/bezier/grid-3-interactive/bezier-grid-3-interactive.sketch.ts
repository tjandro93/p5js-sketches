import * as P5 from 'p5';
import { ButtonControl, Sketch, SliderControl } from 'src/app/core';
import {
  bezier,
  createCanvasOnParentContainer,
  DARK_MODE_BACKGROUND,
  DARK_MODE_FOREGROUND,
  SimpleVector,
} from 'src/app/sketch-lib';

const runPauseButton = new ButtonControl('Pause');
const drawOnceButton = new ButtonControl('Draw Once');
const gridSizeXSlider = new SliderControl('Grid Size X', 5, 100, 25, 1);
const gridSizeYSlider = new SliderControl('Grid Size Y', 5, 100, 25, 1);
const randomFudgeSlider = new SliderControl('Random Fudge', 1, 20, 3, 1);

export const bezierGrid3Interactive: Sketch = {
  title: 'Bezier Grid 3 (interactive)',
  width: 800,
  height: 800,
  controls: {
    refreshButton: true,
    downloadButton: true,
    customControls: [
      runPauseButton,
      drawOnceButton,
      gridSizeXSlider,
      gridSizeYSlider,
      randomFudgeSlider,
    ],
  },
  func: (p5: P5) => {
    let running = true;

    p5.setup = () => {
      createCanvasOnParentContainer(p5, {
        width: bezierGrid3Interactive.width,
        height: bezierGrid3Interactive.height,
      });
      p5.background(DARK_MODE_BACKGROUND);
      p5.stroke(DARK_MODE_FOREGROUND);
      p5.noFill();
      p5.frameRate(5);

      drawOnceButton.onPress = () => {
        drawOnce();
      };

      runPauseButton.onPress = () => {
        running = !running;
        runPauseButton.label$.next(running ? 'Pause' : 'Run');
      };

      drawOnce();
    };

    p5.draw = () => {
      if (running) {
        drawOnce();
      }
    };

    function drawOnce() {
      const verticalCoords: SimpleVector[] = [];
      const horizontalCoords: SimpleVector[] = [];

      p5.background(DARK_MODE_BACKGROUND);

      const gridOffsetX = p5.width / gridSizeXSlider.value;
      const gridOffsetY = p5.height / gridSizeYSlider.value;

      for (
        let i = 0 - (randomFudgeSlider.value + 1);
        i <= gridSizeXSlider.value + randomFudgeSlider.value + 1;
        i++
      ) {
        verticalCoords.push({ x: i * gridOffsetX, y: 0 });
      }

      for (
        let i = 0 - (randomFudgeSlider.value + 1);
        i <= gridSizeYSlider.value + randomFudgeSlider.value + 1;
        i++
      ) {
        horizontalCoords.push({ x: 0, y: i * gridOffsetY });
      }

      let control1: SimpleVector;
      let control2: SimpleVector;

      verticalCoords.forEach((coord, index) => {
        if (
          index < randomFudgeSlider.value ||
          index > verticalCoords.length - 1 - randomFudgeSlider.value
        ) {
          return;
        }

        control1 = {
          x: p5.random(
            verticalCoords[index - randomFudgeSlider.value].x,
            verticalCoords[index + randomFudgeSlider.value].x
          ),
          y: p5.random(0, p5.height / 2),
        };
        control2 = {
          x: p5.random(
            verticalCoords[index - randomFudgeSlider.value].x,
            verticalCoords[index + randomFudgeSlider.value].x
          ),
          y: p5.random(p5.height / 2, p5.height),
        };

        bezier(p5, coord, control1, control2, { ...coord, y: p5.height });
      });

      horizontalCoords.forEach((coord, index) => {
        if (
          index < randomFudgeSlider.value ||
          index > horizontalCoords.length - 1 - randomFudgeSlider.value
        ) {
          return;
        }

        control1 = {
          x: p5.random(0, p5.width / 2),
          y: p5.random(
            horizontalCoords[index - randomFudgeSlider.value].y,
            horizontalCoords[index + randomFudgeSlider.value].y
          ),
        };
        control2 = {
          x: p5.random(p5.width / 2, p5.width),
          y: p5.random(
            horizontalCoords[index - randomFudgeSlider.value].y,
            horizontalCoords[index + randomFudgeSlider.value].y
          ),
        };

        bezier(p5, coord, control1, control2, { ...coord, x: p5.width });
      });
    }
  },
};
