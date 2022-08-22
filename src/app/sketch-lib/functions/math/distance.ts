import { Vector } from '../..';

export function distance(v1: Vector, v2: Vector): number {
  return Math.sqrt(Math.pow(v1.x - v2.x, 2) + Math.pow(v1.y - v2.y, 2));
}
