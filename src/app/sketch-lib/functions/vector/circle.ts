import * as P5 from 'p5';
import { Vector } from '../../types/vector';

/**
 * Function to make a p5 circle from a vector
 */
export function circle(p5: P5, coords: Vector, diameter: number): void {
  p5.circle(coords.x, coords.y, diameter);
}
