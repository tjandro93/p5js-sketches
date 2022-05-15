import * as P5 from 'p5';
import { Vector } from '../../types/vector';

/**
 * Function to make a p5 line from two vectors
 */
export function line(p5: P5, start: Vector, end: Vector): void {
  p5.line(start.x, start.y, end.x, end.y);
}
