import * as P5 from 'p5';
import { Sketch } from 'src/app/core';
import {
  circle,
  createCanvasOnParentContainer,
  DARK_MODE_BACKGROUND,
  DARK_MODE_FOREGROUND,
  Vector,
} from 'src/app/sketch-lib';

export const bezierGrid2: Sketch = {
  title: 'Bezier Grid 2',
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
        width: bezierGrid2.width,
        height: bezierGrid2.height,
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

      const topLeftControl = { x: p5.width / 4, y: p5.height / 4}
      const topRightControl = { x: p5.width / 4 * 3, y: p5.height / 4}
      const bottomLeftControl = { x: p5.width / 4, y: p5.height / 4 * 3}
      const bottomRightControl = { x: p5.width / 4 * 3, y: p5.height / 4 * 3}
      
      // circle(p5, topLeftControl, 10);
      // circle(p5, topRightControl, 10);
      // circle(p5, bottomLeftControl, 10);
      // circle(p5, bottomRightControl, 10);

      for (let i = 0; i <= GRID_SIZE_X; i++) {
        xCoords.push(i * gridOffsetX);
      }

      for (let i = 0; i <= GRID_SIZE_Y; i++) {
        yCoords.push(i * gridOffsetY);
      }

      let control1: Vector;
      let control2: Vector;

      xCoords.forEach((x, index) => {
        if (index < xCoords.length / 2) {
          control1 = topLeftControl
          control2 = topLeftControl
        } else {
          control1 = bottomLeftControl;
          control2 = bottomLeftControl
        }

        p5.bezier(
          x,
          0,
          control1.x,
          control1.y,
          control2.x,
          control2.y,
          x,
          p5.height
        );
      });

      yCoords.forEach((y, index) => {
        if (index < yCoords.length / 2) {
          control1 = topRightControl
          control2 = topRightControl
        } else {
          control1 = bottomRightControl;
          control2 = bottomRightControl
        }

        p5.bezier(
          0,
          y,
          control1.x,
          control1.y,
          control2.x,
          control2.y,
          p5.width,
          y
        );
      });
    }
  },
};
