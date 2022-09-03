import { Sketch } from '../core';
import * as p5 from 'p5';
import {
  createCanvasOnParentContainer,
  DARK_MODE_BACKGROUND,
  DARK_MODE_FOREGROUND,
} from '../sketch-lib';

export const randomDiagonalLines: Sketch = {
  title: 'Random Diagonal Lines',
  width: 800,
  height: 800,
  isSvg: true,
  controls: {
    refreshButton: true,
    downloadButton: true,
  },

  func: (p: p5) => {
    p.setup = () => {
      createCanvasOnParentContainer(p, {
        useSvg: randomDiagonalLines.isSvg,
        width: randomDiagonalLines.width,
        height: randomDiagonalLines.height,
      });

      p.background(DARK_MODE_BACKGROUND);
      p.stroke(DARK_MODE_FOREGROUND);

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
