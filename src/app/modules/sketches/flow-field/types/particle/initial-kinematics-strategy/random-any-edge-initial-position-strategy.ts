import * as P5 from 'p5';
import { Bounds } from 'src/app/sketch-lib';
import { KinematicBody } from '../kinematic-body';
import {
  InitialKinematicsStrategy,
  InitialKinematicsStrategyType,
} from './initial-kinematics-strategy';

export class RandomAnyEdgeInitialPositionStrategy
  implements InitialKinematicsStrategy
{
  public type = InitialKinematicsStrategyType.RandomAnyEdge;

  constructor(private p5: P5, private bounds: Bounds) {}

  public createInitialKinematics(): KinematicBody {
    return {
      position: this.getEdgePosition(),
      velocity: this.p5.createVector(0, 0),
      acceleration: this.p5.createVector(0, 0),
    };
  }

  private getEdgePosition(): P5.Vector {
    const edgeRoll = Math.floor(this.p5.random(4));

    switch (edgeRoll) {
      // Left
      case 0:
        return this.p5.createVector(this.bounds.minX, this.randomYInBounds());
      // Right
      case 1:
        return this.p5.createVector(this.bounds.maxX, this.randomYInBounds());
      // Top
      case 2:
        return this.p5.createVector(this.randomXInBounds(), this.bounds.minY);
      // Bottom
      case 3:
        return this.p5.createVector(this.randomXInBounds(), this.bounds.maxY);
      default:
        throw new Error(
          `Cannot determine which edge to place initial kinematics on. edgeRoll is expected to be 0, 1, 2, or 3 but it was ${edgeRoll}`
        );
    }
  }

  private randomXInBounds(): number {
    return this.p5.random(this.bounds.minX, this.bounds.minY);
  }

  private randomYInBounds(): number {
    return this.p5.random(this.bounds.minY, this.bounds.maxY);
  }
}
