import * as P5 from 'p5';

import { KinematicBody } from '../kinematic-body';
import {
  InitialKinematicsStrategy,
  InitialKinematicsStrategyType,
} from './initial-kinematics-strategy';

export class RandomInCircleInitialPositionStrategy
  implements InitialKinematicsStrategy
{
  public type = InitialKinematicsStrategyType.RandomInCircle;

  constructor(
    private p5: P5,
    private circleRadius: number,
    private circlePosition: P5.Vector
  ) {}

  public createInitialKinematics(): KinematicBody {
    const angle = this.p5.random(0, this.p5.TWO_PI);
    const position = P5.Vector.fromAngle(angle);
    position.setMag(this.p5.random(this.circleRadius));
    position.add(this.circlePosition);

    return {
      position,
      velocity: this.p5.createVector(),
      acceleration: this.p5.createVector(),
    };
  }
}
