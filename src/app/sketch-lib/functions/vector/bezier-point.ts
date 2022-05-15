import * as P5 from 'p5';
import { Vector } from '../../types/vector';

/**
 * Function to make a p5 bezier curve from vectors
 */
export function bezierPoint(
  p5: P5,
  anchor1: Vector,
  control1: Vector,
  control2: Vector,
  anchor2: Vector,
  t: number
): P5.Vector {
  return p5.createVector(
    p5.bezierPoint(anchor1.x, control1.x, control2.x, anchor2.x, t),
    p5.bezierPoint(anchor1.y, control1.y, control2.y, anchor2.y, t)
  );
}
