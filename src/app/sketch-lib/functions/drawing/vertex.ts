import * as P5 from 'p5';
import { Vector } from '../..';

export function vertex(p5: P5, point: Vector): void {
  p5.vertex(point.x, point.y);
}
