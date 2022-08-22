import * as P5 from 'p5';
import { limitMagnitudeCeiling } from './limit-magnitude-ceiling';
import { limitMagnitudeFloor } from './limit-magnitude-floor';

/** 
 * Clamp the vector's magnitude to be between minMagnitude and maxMagnitude. 
 * TODO this should really be implemented to work for either P5.Vector or
 * SimpleVector
 */
export function clampMagnitude(v: P5.Vector, minMagnitude: number, maxMagnitude: number): void {
    limitMagnitudeCeiling(v, maxMagnitude);
    limitMagnitudeFloor(v, minMagnitude);
}
