import * as p5 from 'p5';
import {
  createCanvasOnParentContainer,
  DARK_MODE_BACKGROUND,
  DARK_MODE_FOREGROUND,
} from '../../sketch-lib';
import { Sketch } from '../../core/types/sketch.type';

export const hito3: Sketch = {
  title: 'Hitomezashi Stitch Attempt 3',
  description:
    "Ported from Processing. This was a failed implementation of the algorithm found during pass 2 that's a bit interesting",

  width: 400,
  height: 400,

  func: (p: p5) => {
    const gridPoints: p5.Vector[][] = [];

    p.setup = () => {
      createCanvasOnParentContainer(p, {
        width: hito3.height,
        height: hito3.width,
      });
      p.background(DARK_MODE_BACKGROUND);
      p.fill(DARK_MODE_FOREGROUND);
      p.stroke(DARK_MODE_FOREGROUND);
      p.strokeWeight(5);

      p.frameRate(5);

      setupGridPoints(10, 10);

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
      for (let i = 0; i < gridPoints.length; i++) {
        const startOn = p.random() > 0.5;
        for (let j = 0; j < gridPoints.length - 1; j++) {
          const startPoint = gridPoints[i][j];
          const endPoint = gridPoints[i][j + 1];

          if (startOn && i % 2 === 0) {
            p.line(startPoint.x, startPoint.y, endPoint.x, endPoint.y);
          } else if (!startOn && i % 2 === 1) {
            p.line(startPoint.x, startPoint.y, endPoint.x, endPoint.y);
          }
        }
      }
    }

    function patternVertical() {
      for (let i = 0; i < gridPoints.length - 1; i++) {
        const startOn = p.random() > 0.5;
        for (let j = 0; j < gridPoints[i].length; j++) {
          const startPoint = gridPoints[i][j];
          const endPoint = gridPoints[i + 1][j];

          if (startOn && j % 2 === 0) {
            p.line(startPoint.x, startPoint.y, endPoint.x, endPoint.y);
          } else if (!startOn && j % 2 === 1) {
            p.line(startPoint.x, startPoint.y, endPoint.x, endPoint.y);
          }
        }
      }
    }
  },
};
