import * as P5 from 'p5';

/**
 * Function to make a p5 line from two vectors
 */
export function line(p5: P5, start: P5.Vector, end: P5.Vector): void {
  p5.line(start.x, start.y, end.x, end.y);
}
