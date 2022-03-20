import { Sketch } from '../core/types/sketch.type';
import * as p5 from 'p5';

export const randomDiagonalLines: Sketch = {
  title: 'Random Diagonal Lines',
  func: (p: p5) => {
    const MAX_SIDE = Math.min(p.windowWidth, p.windowHeight) - 10;

    const X_TILES = 20;
    const Y_TILES = 20;

    const TILE_WIDTH = MAX_SIDE / X_TILES;
    const TILE_HEIGHT = MAX_SIDE / Y_TILES;

    p.setup = () => {
      p.createCanvas(MAX_SIDE, MAX_SIDE);

      for (let i = 0; i < X_TILES; i++) {
        for (let j = 0; j < Y_TILES; j++) {
          drawRandomDiagonalLine(
            i * TILE_WIDTH,
            j * TILE_HEIGHT,
            (i + 1) * TILE_WIDTH,
            (j + 1) * TILE_HEIGHT
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
