import * as P5 from 'p5';
import {
  Bounds,
  PointGrid,
  line,
  OutOfBoundsPosition,
} from 'src/app/sketch-lib';
import { FlowFieldForce } from '../flow-field-force';
import { InitialKinematicsStrategy } from '../initial-kinematics-strategy/initial-kinematics-strategy';
import { BaseFlowFieldParticle } from './base-flow-field-particle';
import { FlowFieldParticleFactory } from './flow-field-particle-factory';

export class SimpleFlowFieldParticle extends BaseFlowFieldParticle {
  constructor(
    private p5: P5,
    initialKinematicsStrategy: InitialKinematicsStrategy,
    bounds: Bounds,
    minSpeed?: number,
    maxSpeed?: number
  ) {
    super(initialKinematicsStrategy, bounds, minSpeed, maxSpeed);
  }

  public applyForces(forces: PointGrid<FlowFieldForce>): void {
    // just apply the force of the closest FlowFieldForce
    const [closestForce] = forces.getNearestPointToVector(this.position);
    this.acceleration.add(closestForce.force);
  }
  public draw(): void {
    if (this.previousPosition != null) {
      line(this.p5, this.previousPosition, this.position);
    }
  }
  public handleOutOfBounds(outOfBoundsPositions: OutOfBoundsPosition[]): void {
    // when we go out of bounds just reset the kinematics based on the strategy
    this.initiateKinematics();
  }
}

export class SimpleFlowFieldParticleFactory
  implements FlowFieldParticleFactory
{
  constructor(
    private p5: P5,
    private initialKinematicsStrategy: InitialKinematicsStrategy,
    private bounds: Bounds,
    private minSpeed?: number,
    private maxSpeed?: number
  ) {}

  public createParticle(
    index: number,
    totalParticles: number
  ): BaseFlowFieldParticle {
    return new SimpleFlowFieldParticle(
      this.p5,
      this.initialKinematicsStrategy,
      this.bounds,
      this.minSpeed,
      this.maxSpeed
    );
  }
}
