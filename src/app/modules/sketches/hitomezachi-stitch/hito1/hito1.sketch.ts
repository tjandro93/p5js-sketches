import * as p5 from 'p5';
import {
  createCanvasOnParentContainer,
  DARK_MODE_BACKGROUND,
  DARK_MODE_FOREGROUND,
} from '../../../../sketch-lib';
import { Sketch } from '../../../../core';

export const hito1: Sketch = {
  title: 'Hitomezashi Stitch Attempt 1',
  description:
    'Ported from Processing. This was a failed implementation but I saved it because it was interesting.',
  width: 400,
  height: 400,

  func: (p: p5) => {
    const gridPoints: p5.Vector[][] = [];

    p.setup = () => {
      createCanvasOnParentContainer(p, {
        width: hito1.width,
        height: hito1.height,
      });
      p.frameRate(5);
      p.background(DARK_MODE_BACKGROUND);
      p.fill(DARK_MODE_FOREGROUND);
      p.stroke(DARK_MODE_FOREGROUND);
      p.strokeWeight(5);

      setupGridPoints(10, 10);
    };

    p.draw = () => {
      p.background(DARK_MODE_BACKGROUND);
      // showGridPoints();
      patternHorizontal();
      patternVertical();
    };

    function setupGridPoints(gridSizeX: number, gridSizeY: number): void {
      const gridOffsetX = p.width / gridSizeX;
      const gridOffsetY = p.height / gridSizeY;

      for (let i = 0; i < gridSizeX; i++) {
        gridPoints.push([]);
        for (let j = 0; j < gridSizeY; j++) {
          gridPoints[i][j] = p.createVector(
            i * gridOffsetX,
            j * gridOffsetY,
            p.random()
          );
        }
      }
    }

    function showGridPoints() {
      for (const column of gridPoints) {
        for (const point of column) {
          p.circle(point.x, point.y, 8);
        }
      }
    }

    function patternHorizontal() {
      for (let i = 0; i < gridPoints.length - 1; i++) {
        for (let j = 0; j < gridPoints[i].length; j++) {
          const startPoint = gridPoints[i][j];
          const endPoint = gridPoints[i + 1][j];

          if (p.random(1) > 0.5) {
            p.line(startPoint.x, startPoint.y, endPoint.x, endPoint.y);
          }
        }
      }
    }

    function patternVertical() {
      for (let i = 0; i < gridPoints.length; i++) {
        for (let j = 0; j < gridPoints[i].length - 1; j++) {
          const startPoint = gridPoints[i][j];
          const endPoint = gridPoints[i][j + 1];

          if (p.random(1) > 0.5) {
            p.line(startPoint.x, startPoint.y, endPoint.x, endPoint.y);
          }
        }
      }
    }
  },
};
