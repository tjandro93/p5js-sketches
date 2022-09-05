import * as P5 from 'p5';
import { Sketch } from 'src/app/core';
import {
  bezier,
  createCanvasOnParentContainer,
  DARK_MODE_BACKGROUND,
  DARK_MODE_FOREGROUND,
  SimpleVector,
  Vector,
} from 'src/app/sketch-lib';

export const bezierGrid3Static: Sketch = {
  title: 'Bezier Grid 3 (static)',
  width: 800,
  height: 800,
  controls: {
    refreshButton: true,
  },
  func: (p5: P5) => {
    const GRID_SIZE_X = 25;
    const GRID_SIZE_Y = 25;
    const RANDOM_FUDGE = 3;
    const verticalCoords: SimpleVector[] = [];
    const horizontalCoords: SimpleVector[] = [];

    p5.setup = () => {
      createCanvasOnParentContainer(p5, {
        width: bezierGrid3Static.width,
        height: bezierGrid3Static.height,
      });
      p5.background(DARK_MODE_BACKGROUND);
      p5.stroke(DARK_MODE_FOREGROUND);
      p5.noFill();

      drawOnce();
    };

    function drawOnce() {
      p5.background(DARK_MODE_BACKGROUND);

      const gridOffsetX = p5.width / GRID_SIZE_X;
      const gridOffsetY = p5.height / GRID_SIZE_Y;

      for (
        let i = 0 - (RANDOM_FUDGE + 1);
        i <= GRID_SIZE_X + RANDOM_FUDGE + 1;
        i++
      ) {
        verticalCoords.push({ x: i * gridOffsetX, y: 0 });
      }

      for (
        let i = 0 - (RANDOM_FUDGE + 1);
        i <= GRID_SIZE_Y + RANDOM_FUDGE + 1;
        i++
      ) {
        horizontalCoords.push({ x: 0, y: i * gridOffsetY });
      }

      let control1: Vector;
      let control2: Vector;

      verticalCoords.forEach((coord, index) => {
        if (
          index < RANDOM_FUDGE ||
          index > verticalCoords.length - 1 - RANDOM_FUDGE
        ) {
          return;
        }

        control1 = {
          x: p5.random(
            verticalCoords[index - RANDOM_FUDGE].x,
            verticalCoords[index + RANDOM_FUDGE].x
          ),
          y: p5.random(0, p5.height / 2),
        };
        control2 = {
          x: p5.random(
            verticalCoords[index - RANDOM_FUDGE].x,
            verticalCoords[index + RANDOM_FUDGE].x
          ),
          y: p5.random(p5.height / 2, p5.height),
        };

        bezier(p5, coord, control1, control2, { ...coord, y: p5.height });
      });

      horizontalCoords.forEach((coord, index) => {
        if (
          index < RANDOM_FUDGE ||
          index > horizontalCoords.length - 1 - RANDOM_FUDGE
        ) {
          return;
        }

        control1 = {
          x: p5.random(0, p5.width / 2),
          y: p5.random(
            horizontalCoords[index - RANDOM_FUDGE].y,
            horizontalCoords[index + RANDOM_FUDGE].y
          ),
        };
        control2 = {
          x: p5.random(p5.width / 2, p5.width),
          y: p5.random(
            horizontalCoords[index - RANDOM_FUDGE].y,
            horizontalCoords[index + RANDOM_FUDGE].y
          ),
        };

        bezier(p5, coord, control1, control2, { ...coord, x: p5.width });
      });
    }
  },
};
