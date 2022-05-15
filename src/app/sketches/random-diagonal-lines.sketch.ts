import { Sketch } from '../core/types/sketch.type';
import * as p5 from 'p5';
import { createCanvasOnParentContainer } from '../sketch-lib';

export const randomDiagonalLines: Sketch = {
  title: 'Random Diagonal Lines',
  width: 800,
  height: 800,
  isSvg: true,
  canRedraw: true,

  func: (p: p5) => {
    p.setup = () => {
      createCanvasOnParentContainer(p, {
        useSvg: true,
        width: randomDiagonalLines.width,
        height: randomDiagonalLines.height,
      });

      const xTiles = 20;
      const yTiles = 20;

      const tileWidth = p.width / xTiles;
      const tileHeight = p.height / yTiles;

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
