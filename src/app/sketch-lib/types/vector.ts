import * as p5 from 'p5';

/** A data-only representation of a vector. */
export interface SimpleVector {
  x: number;
  y: number;
}

/** Either as SimpleVector of a p5 Vector */
export type Vector = SimpleVector | p5.Vector;
