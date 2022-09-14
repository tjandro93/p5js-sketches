import * as P5 from 'p5';
import { Bounds } from 'src/app/sketch-lib';
import { KinematicBody } from '../kinematic-body';
import {
  InitialKinematicsStrategy,
  InitialKinematicsStrategyType,
} from './initial-kinematics-strategy';

export class RandomBottomEdgeInitialPositionStrategy
  implements InitialKinematicsStrategy
{
  public type = InitialKinematicsStrategyType.RandomBottomEdge;

  constructor(private p5: P5, private bounds: Bounds) {}

  public createInitialKinematics(): KinematicBody {
    return {
      position: this.p5.createVector(
        this.p5.random(this.bounds.minX, this.bounds.maxX),
        this.bounds.maxY
      ),
      velocity: this.p5.createVector(0, 0),
      acceleration: this.p5.createVector(0, 0),
    };
  }
}