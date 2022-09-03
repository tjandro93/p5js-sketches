import * as P5 from 'p5';

/**
 * Limit the vector's magnitude to be more than maxMagnitude.
 * TODO this should really be implemented to work for either P5.Vector or
 * SimpleVector
 */
export function limitMagnitudeCeiling(
  v: P5.Vector,
  maxMagnitude: number
): void {
  if (v.mag() > maxMagnitude) {
    v.setMag(maxMagnitude);
  }
}
