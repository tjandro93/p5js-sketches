import * as P5 from 'p5';
import { Sketch } from 'src/app/core';
import {
  createCanvasOnParentContainer,
  DARK_MODE_BACKGROUND,
  DARK_MODE_FOREGROUND,
} from 'src/app/sketch-lib';

export const bezierGrid: Sketch = {
  title: 'Bezier Grid',
  width: 600,
  height: 600,
  controls: {
    refreshButton: true,
  },
  func: (p5: P5) => {
    const GRID_SIZE_X = 10;
    const GRID_SIZE_Y = 10;
    const xCoords: number[] = [];
    const yCoords: number[] = [];

    p5.setup = () => {
      createCanvasOnParentContainer(p5, {
        width: bezierGrid.width,
        height: bezierGrid.height,
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

      // centered
      const xControl1 = p5.width / 2;
      const yControl1 = p5.height / 2;
      const xControl2 = p5.width / 2;
      const yControl2 = p5.height / 2;

      // semi random
      // const xControl1 = p5.random(0, p5.width / 2);
      // const yControl1 = p5.random(0, p5.height / 2);
      // const xControl2 = p5.random(p5.width / 2, p5.width);
      // const yControl2 = p5.random(p5.height / 2, p5.height);

      for (let i = 0; i <= GRID_SIZE_X; i++) {
        xCoords.push(i * gridOffsetX);
      }

      for (let i = 0; i <= GRID_SIZE_Y; i++) {
        yCoords.push(i * gridOffsetY);
      }

      xCoords.forEach((x) => {
        // p5.line(x, 0, x, p5.height);
        p5.bezier(
          x,
          0,
          xControl1,
          yControl1,
          xControl2,
          yControl2,
          x,
          p5.height
        );
      });

      yCoords.forEach((y) => {
        // p5.line(0, y, p5.width, y)
        p5.bezier(
          0,
          y,
          xControl1,
          yControl1,
          xControl2,
          yControl2,
          p5.width,
          y
        );
      });
    }
  },
};
