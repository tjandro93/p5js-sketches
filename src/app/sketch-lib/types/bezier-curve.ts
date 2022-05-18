import * as P5 from 'p5';
import { bezier } from '../functions/vector/bezier';
import { bezierPoint } from '../functions/vector/bezier-point';
import { circle } from '../functions/vector/circle';
import { SimpleVector } from './vector';

/**
 * Class to represent a full bezier curve
 */
export class BezierCurve {
  private readonly defaultDebugDiameter = 5;

  constructor(
    public p5: P5,
    public anchor1: SimpleVector,
    public control1: SimpleVector,
    public control2: SimpleVector,
    public anchor2: SimpleVector,
    public debugConfig?: {
      drawAnchors?: boolean;
      anchorDiameter?: number;
      drawControls?: boolean;
      controlDiameter?: number;
    }
  ) {}

  /**
   * Draw the curve based on it's current state
   */
  public draw() {
    bezier(this.p5, this.anchor1, this.control1, this.control2, this.anchor2);

    if (this.debugConfig?.drawAnchors) {
      const diameter =
        this.debugConfig.anchorDiameter ?? this.defaultDebugDiameter;
      circle(this.p5, this.anchor1, diameter);
      circle(this.p5, this.anchor2, diameter);
    }

    if (this.debugConfig?.drawControls) {
      const diameter =
        this.debugConfig.controlDiameter ?? this.defaultDebugDiameter;
      circle(this.p5, this.control1, diameter);
      circle(this.p5, this.control2, diameter);
    }
  }

  /**
   * Gets the coordinates (as a `SimpleVector`) of a point along the bezier curve.
   * @param t a number between 0 and 1 that represents the progress along the curve from `anchor1` to `anchor2`
   */
  public getBezierPoint(t: number): SimpleVector {
    // TODO contrains on t??
    return bezierPoint(
      this.p5,
      this.anchor1,
      this.control1,
      this.control2,
      this.anchor2,
      t
    );
  }
}
