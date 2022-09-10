import * as P5 from 'p5';
import { Bounds } from 'src/app/sketch-lib';
import { KinematicBody } from '../kinematic-body';
import {
  InitialKinematicsStrategy,
  InitialKinematicsStrategyType,
} from './initial-kinematics-strategy';

export class RandomInitialPositionKinematicsStrategy
  implements InitialKinematicsStrategy
{
  constructor(private p5: P5, private bounds: Bounds) {}

  public type = InitialKinematicsStrategyType.FullyRandom;

  public createInitialKinematics(): KinematicBody {
    return {
      position: this.p5.createVector(
        this.p5.random(this.bounds.minX, this.bounds.maxX),
        this.p5.random(this.bounds.minY, this.bounds.maxY)
      ),
      velocity: this.p5.createVector(0, 0),
      acceleration: this.p5.createVector(0, 0),
    };
  }
}
