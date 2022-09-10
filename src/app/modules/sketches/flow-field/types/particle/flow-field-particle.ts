import * as P5 from 'p5';
import {
  Bounds,
  PointGrid,
  OutOfBoundsPosition,
  clampMagnitude,
} from 'src/app/sketch-lib';
import { FlowFieldForce } from '../flow-field-force';
import { ApplyForcesStrategy } from './apply-forces-strategy/apply-forces-strategy';
import { HandleOutOfBoundsStrategy } from './handle-out-of-bounds-strategy/handle-out-of-bounds-strategy';
import { InitialKinematicsStrategy } from './initial-kinematics-strategy/initial-kinematics-strategy';
import { KinematicBody } from './kinematic-body';
import { FlowFieldParticleDrawStrategy } from './particle-draw-strategy/particle-draw-strategy';

export class FlowFieldParticle implements KinematicBody {
  public previousPositions: (P5.Vector | null)[] = [];
  public previousPosition: P5.Vector | null = null;
  public position: P5.Vector;
  public velocity: P5.Vector;
  public acceleration: P5.Vector;
  public isDead = false;

  constructor(public options: FlowFieldParticleOptions) {
    this.initiateKinematics();
  }

  public applyForces(forces: PointGrid<FlowFieldForce>): void {
    this.options.applyForcesStrategy.applyForces(this, forces);
  }

  public initiateKinematics(): void {
    const initialState =
      this.options.initialKinematicsStrategy.createInitialKinematics();
    this.position = initialState.position;
    this.velocity = initialState.velocity;
    this.acceleration = initialState.acceleration;
  }

  public step(): void {
    if (!this.isDead) {
      const minSpeed = Math.max(this.options.minSpeed ?? 0, 0);
      const maxSpeed = Math.min(
        this.options.maxSpeed ?? Number.MAX_VALUE,
        Number.MAX_VALUE
      );

      this.previousPositions.push(this.position.copy());
      this.previousPosition = this.position.copy();

      this.velocity.add(this.acceleration);
      clampMagnitude(this.velocity, minSpeed, maxSpeed);
      this.position.add(this.velocity);
      this.acceleration.mult(0);

      this.checkBounds();
    }
  }

  public checkBounds(): void {
    if (this.options.bounds == null) {
      return;
    }

    const outOfBoundsPositions: OutOfBoundsPosition[] = [];
    if (this.position.x < this.options.bounds.minX) {
      outOfBoundsPositions.push(OutOfBoundsPosition.Left);
    }
    if (this.position.x > this.options.bounds.maxX) {
      outOfBoundsPositions.push(OutOfBoundsPosition.Right);
    }
    if (this.position.y < this.options.bounds.minY) {
      outOfBoundsPositions.push(OutOfBoundsPosition.Top);
    }
    if (this.position.y > this.options.bounds.maxY) {
      outOfBoundsPositions.push(OutOfBoundsPosition.Bottom);
    }

    if (outOfBoundsPositions.length > 0) {
      this.options.handleOutOfBoundsStrategy.handleOutOfBounds(
        this,
        outOfBoundsPositions
      );

      this.previousPosition = null;
      this.previousPositions.push(null);
    }
  }

  public draw() {
    this.options.particleDrawStrategy.draw(this);
  }
}

export interface FlowFieldParticleOptions {
  particleDrawStrategy: FlowFieldParticleDrawStrategy;
  initialKinematicsStrategy: InitialKinematicsStrategy;
  applyForcesStrategy: ApplyForcesStrategy;
  handleOutOfBoundsStrategy: HandleOutOfBoundsStrategy;
  bounds: Bounds;
  minSpeed?: number;
  maxSpeed?: number;
}
