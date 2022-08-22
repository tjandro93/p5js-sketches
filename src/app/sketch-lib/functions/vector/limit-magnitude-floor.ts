import * as P5 from 'p5';

/** 
 * Limit the vector's magnitude to be no less than minMagnitude. 
 * TODO this should really be implemented to work for either P5.Vector or
 * SimpleVector
 */
export function limitMagnitudeFloor(v: P5.Vector, minMagnitude: number): void {
    if (v.mag() < minMagnitude) {
      v.setMag(minMagnitude);
    }
}
