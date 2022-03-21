import * as p5 from 'p5';
import { createCanvasOnParentContainer } from 'src/app/sketch-lib/functions/create-canvas-on-parent-container';
import { Sketch } from '../../core/types/sketch.type';

export const hito1: Sketch = {
  title: 'Hitomezashi Stitch Attempt 1',
  description:
    'Ported from Processing. This was a failed implementation but I saved it because it was interesting.',
  func: (p: p5) => {
    const gridPoints: p5.Vector[][] = [];

    p.setup = () => {
      createCanvasOnParentContainer(p, 400, 400);
      p.frameRate(5);

      setupGridPoints(10, 10);
    };

    p.draw = () => {
      p.background(255);
      p.fill(0);
      showGridPoints();
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

          p.stroke(0);
          p.strokeWeight(5);
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

          p.stroke(0);
          p.strokeWeight(5);
          if (p.random(1) > 0.5) {
            p.line(startPoint.x, startPoint.y, endPoint.x, endPoint.y);
          }
        }
      }
    }
  },
};
