import * as p5 from 'p5';

/** A data-only representation of a vector. */
export interface SimpleVector {
  x: number;
  y: number;
}

/** Either a SimpleVector of a p5 Vector */
export type Vector = SimpleVector | p5.Vector;

/** Typeguard to check whether a Vector is a p5.Vector or not */
export function isP5Vector(v: Vector): v is p5.Vector {
  return typeof (v as any).mag === 'function';
}
