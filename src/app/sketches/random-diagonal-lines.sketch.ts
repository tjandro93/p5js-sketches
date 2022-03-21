import { Sketch } from '../core/types/sketch.type';
import * as p5 from 'p5';
import { getParentContainer } from '../sketch-lib/functions/get-parent-container';
import { attachCanvasToParentContainer } from '../sketch-lib/functions/attach-canvas-to-parent-container';

export const randomDiagonalLines: Sketch = {
  title: 'Random Diagonal Lines',
  func: (p: p5) => {
    p.setup = () => {
      const parent = getParentContainer();

      const minSide = Math.min(parent.clientHeight, parent.clientWidth) - 10;

      const xTiles = 20;
      const yTiles = 20;

      const tileWidth = minSide / xTiles;
      const tileHeight = minSide / yTiles;

      const canvas = p.createCanvas(minSide, minSide);
      attachCanvasToParentContainer(canvas);

      for (let i = 0; i < xTiles; i++) {
        for (let j = 0; j < yTiles; j++) {
          drawRandomDiagonalLine(
            i * tileWidth,
            j * tileHeight,
            (i + 1) * tileWidth,
            (j + 1) * tileHeight
          );
        }
      }
    };

    function drawRandomDiagonalLine(
      minX: number,
      minY: number,
      maxX: number,
      maxY: number
    ): void {
      if (p.random() > 0.5) {
        p.line(minX, minY, maxX, maxY);
      } else {
        p.line(maxX, minY, minX, maxY);
      }
    }
  },
};
