import * as p5 from 'p5';
import { createCanvasOnParentContainer } from 'src/app/sketch-lib/functions/create-canvas-on-parent-container';
import { Sketch } from '../../core/types/sketch.type';

export const hito4: Sketch = {
  title: 'Hitomezashi Stitch Attempt ',
  description:
    "Ported from Processing. Trying perlin noise for random function. Pretty sure this isn't working like the Processing onemptied...",
  width: 600,
  height: 600,

  func: (p: p5) => {
    let gridPoints: p5.Vector[][];

    let colNoiseVals: number[];
    let rowNoiseVals: number[];

    let colNoiseValDirection: boolean[];
    let rowNoiseValDirection: boolean[];

    let rowNoiseValScale = 0.05;
    let colNoiseValScale = 0.05;

    let rowNoiseValUpdate: number;
    let colNoiseValUpdate: number;

    const rowNoiseValMin = 0;
    const colNoiseValMin = 0;

    const rowNoiseValMax = 0;
    const colNoiseValMax = 0;

    p.setup = () => {
      createCanvasOnParentContainer(p, {
        width: hito4.width,
        height: hito4.height,
      });

      p.background(255);
      p.fill(0);
      // p.frameRate(5);
      p.stroke(0);
      p.strokeCap(p.ROUND);
      p.strokeWeight(5);

      setupGridPoints(30, 30);
    };

    p.draw = () => {
      p.background(255);
      p.strokeWeight(2);

      rowNoiseValScale = 0.5;
      colNoiseValScale = 0.5;

      rowNoiseValUpdate = 0.05;
      colNoiseValUpdate = 0.05;

      patternHorizontal();
      patternVertical();
    };

    function setupGridPoints(gridSizeX: number, gridSizeY: number): void {
      gridPoints = [];
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

      colNoiseVals = Array.from({ length: gridSizeX + 1 }, () =>
        p.random(colNoiseValMin, colNoiseValMax)
      );
      rowNoiseVals = Array.from({ length: gridSizeY + 1 }, () =>
        p.random(rowNoiseValMin, rowNoiseValMax)
      );

      colNoiseValDirection = Array.from({ length: gridSizeX + 1 }, () => true);
      rowNoiseValDirection = Array.from({ length: gridSizeY + 1 }, () => true);
    }

    function showGridPoints() {
      for (const column of gridPoints) {
        for (const point of column) {
          p.circle(point.x, point.y, 8);
        }
      }
    }

    function patternHorizontal() {
      for (let j = 1; j < gridPoints[0].length - 1; j++) {
        const startOn = p.noise(j * rowNoiseValScale, rowNoiseVals[j]) < 0.5;

        for (let i = 1; i < gridPoints.length - 2; i++) {
          const startPoint = gridPoints[i][j];
          const endPoint = gridPoints[i + 1][j];

          if (startOn && i % 2 === 0) {
            line(
              p,
              startPoint,
              endPoint,
              rowNoiseVals[j] * rowNoiseValScale,
              rowNoiseValMin,
              rowNoiseValMax
            );
          } else if (!startOn && i % 2 === 1) {
            line(
              p,
              startPoint,
              endPoint,
              rowNoiseVals[j] * rowNoiseValScale,
              rowNoiseValMin,
              rowNoiseValMax
            );
          }
        }

        if (rowNoiseVals[j] >= rowNoiseValMax) {
          rowNoiseValDirection[j] = false;
        }

        if (rowNoiseVals[j] <= rowNoiseValMin) {
          rowNoiseValDirection[j] = true;
        }

        rowNoiseVals[j] = rowNoiseValDirection[j]
          ? rowNoiseVals[j] + rowNoiseValUpdate
          : rowNoiseVals[j] - rowNoiseValUpdate;
      }
    }

    function patternVertical() {
      for (let i = 1; i < gridPoints.length - 1; i++) {
        const startOn = p.noise(i * colNoiseValScale, colNoiseVals[i]) < 0.5;

        for (let j = 1; j < gridPoints[i].length - 2; j++) {
          const startPoint = gridPoints[i][j];
          const endPoint = gridPoints[i][j + 1];

          if (startOn && j % 2 === 0) {
            line(
              p,
              startPoint,
              endPoint,
              colNoiseVals[i] * colNoiseValScale,
              colNoiseValMin,
              colNoiseValMax
            );
          } else if (!startOn && j % 2 === 1) {
            line(
              p,
              startPoint,
              endPoint,
              colNoiseVals[i] * colNoiseValScale,
              colNoiseValMin,
              colNoiseValMax
            );
          }
        }

        if (colNoiseVals[i] >= colNoiseValMax) {
          colNoiseValDirection[i] = false;
        }

        if (colNoiseVals[i] <= colNoiseValMin) {
          colNoiseValDirection[i] = true;
        }

        colNoiseVals[i] = colNoiseValDirection[i]
          ? colNoiseVals[i] + colNoiseValUpdate
          : colNoiseVals[i] - colNoiseValUpdate;
      }
    }

    function line(
      pInst: p5,
      start: p5.Vector,
      end: p5.Vector,
      noiseVal: number,
      noiseValMin: number,
      noiseValMax: number
    ): void {
      const alpha = pInst.map(noiseVal, noiseValMin, noiseValMax, 50, 255);
      pInst.stroke(0, alpha);
      pInst.line(start.x, start.y, end.x, end.y);
    }
  },
};
