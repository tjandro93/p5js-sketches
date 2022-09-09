import * as P5 from 'p5';
import {
  Bounds,
  PointGrid,
  OutOfBoundsPosition,
  clampMagnitude,
} from 'src/app/sketch-lib';
import { FlowFieldForce } from '../flow-field-force';
import { InitialKinematicsStrategy } from '../initial-kinematics-strategy/initial-kinematics-strategy';
import { KinematicBody } from './kinematic-body';

export abstract class BaseFlowFieldParticle implements KinematicBody {
  public previousPositions: (P5.Vector | null)[] = [];
  public previousPosition: P5.Vector | null = null;
  public position: P5.Vector;
  public velocity: P5.Vector;
  public acceleration: P5.Vector;

  constructor(
    public initialKinematicsStrategy: InitialKinematicsStrategy,
    public bounds: Bounds,
    public minSpeed?: number,
    public maxSpeed?: number
  ) {
    this.initiateKinematics();
  }

  public abstract applyForces(forces: PointGrid<FlowFieldForce>): void;
  public abstract draw(): void;
  public abstract handleOutOfBounds(
    outOfBoundsPositions: OutOfBoundsPosition[]
  ): void;

  public initiateKinematics(): void {
    const initialState =
      this.initialKinematicsStrategy.createInitialKinematics();
    this.position = initialState.position;
    this.velocity = initialState.velocity;
    this.acceleration = initialState.acceleration;
  }

  public step(): void {
    const minSpeed = Math.max(this.minSpeed ?? 0, 0);
    const maxSpeed = Math.min(
      this.maxSpeed ?? Number.MAX_VALUE,
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

  public checkBounds(): void {
    if (this.bounds == null) {
      return;
    }

    const outOfBoundsPositions: OutOfBoundsPosition[] = [];
    if (this.position.x < (this.bounds.minX ?? 0)) {
      outOfBoundsPositions.push(OutOfBoundsPosition.Left);
    }
    if (this.position.x > this.bounds.maxX) {
      outOfBoundsPositions.push(OutOfBoundsPosition.Right);
    }
    if (this.position.y < (this.bounds.minY ?? 0)) {
      outOfBoundsPositions.push(OutOfBoundsPosition.Top);
    }
    if (this.position.y > this.bounds.maxY) {
      outOfBoundsPositions.push(OutOfBoundsPosition.Bottom);
    }

    if (outOfBoundsPositions.length > 0) {
      this.handleOutOfBounds(outOfBoundsPositions);
      this.previousPosition = null;
      this.previousPositions.push(null);
    }
  }
}
