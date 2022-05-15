import * as P5 from 'p5';
import { Vector } from '../../types/vector';

/**
 * Function to make a p5 point from a vector
 */
export function point(p5: P5, coords: Vector): void {
  p5.point(coords.x, coords.y);
}
