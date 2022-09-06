import * as P5 from 'p5';
import { Vector, vertex } from '../..';

/**
 * Draw a series of lines connecting the specified position vectors.
 * The position vectors should be in order of how you expect them to be drawn.
 * This implement uses beginShape(), vertex(), and pop() to render the polyline as a shape.
 * This makes it must easier for Axidraw to understand as the SVG renderer will put each polyline
 * into a single <path> rather than a <path> per segment.
 *
 * Hopefuly this usage is non-destructive of styling as it calls push() and pop() before mutating
 * things but we will see.
 * @param p5
 * @param points
 */
export function polyline(p5: P5, points: Vector[]): void {
  p5.push();
  // noFill() is necessary to avoid the implicit closing lines of the shape from being renderered
  p5.noFill();

  p5.beginShape();
  points.forEach((point) => vertex(p5, point));
  p5.endShape();

  p5.pop();
}
