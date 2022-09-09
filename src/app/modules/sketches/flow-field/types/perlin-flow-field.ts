import * as P5 from 'p5';
import {
  BaseFlowField,
  BaseFlowFieldOptions,
  FlowFieldForceFactory,
} from './base-flow-field';
import { FlowFieldForce } from './flow-field-force';

export class PerlinFlowField extends BaseFlowField {
  constructor(public p5: P5, options: PerlinFlowFieldOptions) {
    super(p5, {
      ...options,
      forceFactory: new PerlinFlowFieldForceFactory(
        p5,
        options.forcePerlinXFactor,
        options.forcePerlinYFactor,
        options.angleBias
      ),
    });
  }
}

export interface PerlinFlowFieldOptions
  extends Omit<BaseFlowFieldOptions, 'forceFactory'> {
  forcePerlinXFactor: number;
  forcePerlinYFactor: number;
  angleBias: number;
}

class PerlinFlowFieldForceFactory implements FlowFieldForceFactory {
  constructor(
    private p5: P5,
    private forcePerlinXFactor: number,
    private forcePerlinYFactor: number,
    private angleBias: number
  ) {}

  public createPoint(x: number, y: number): FlowFieldForce {
    const noiseVal = this.p5.noise(
      x * this.forcePerlinXFactor,
      y * this.forcePerlinYFactor
    );
    const noiseValAngleAdjusted = noiseVal * Math.PI * 2;
    const noiseValAngleAdjustedWithBias =
      noiseValAngleAdjusted + this.angleBias;

    return new FlowFieldForce(
      this.p5,
      this.p5.createVector(x, y),
      P5.Vector.fromAngle(noiseValAngleAdjustedWithBias)
    );
  }
}
