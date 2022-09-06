import * as P5 from 'p5';
import { line, Vector, pairwise } from '../..';

/**
 * Draw a series of lines connecting the specified position vectors.
 * The position vectors should be in order of how you expect them to be drawn
 * @param p5
 * @param points
 */
export function polyline(p5: P5, points: Vector[]): void {
  pairwise(points, (point1, point2) => {
    line(p5, point1, point2);
  });
}
