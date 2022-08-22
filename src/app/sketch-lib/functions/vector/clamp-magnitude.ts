import * as P5 from 'p5';

/** 
 * Limit the vector's magnitude to maxMagnitude. 
 * TODO this should really be implement to work for either P5.Vector or
 * SimpleVector
 */
export function clampMagnitude(v: P5.Vector, maxMagnitude: number): void {
    if (v.mag() > maxMagnitude) {
      v.setMag(maxMagnitude);
    }
}
