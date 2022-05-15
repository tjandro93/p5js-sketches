import * as P5 from 'p5';
import { Vector } from '../../types/vector';

/**
 * Function to make a p5 bezier curve from vectors
 */
export function bezier(
  p5: P5,
  anchor1: Vector,
  control1: Vector,
  control2: Vector,
  anchor2: Vector
): void {
  p5.bezier(
    anchor1.x,
    anchor1.y,
    control1.x,
    control1.y,
    control2.x,
    control2.y,
    anchor2.x,
    anchor2.y
  );
}
