import * as P5 from 'p5';
import { polyline, Vector, partition } from '../..';

/**
 * Draws a polyline after partitioning based on null / undefined points
 * @param p5
 * @param points
 */
export function partitionedPolyline(
  p5: P5,
  points: (Vector | null | undefined)[]
): void {
  const partitions = partition(points, (p) => p == null);
  partitions.forEach((part) => polyline(p5, part));
}
