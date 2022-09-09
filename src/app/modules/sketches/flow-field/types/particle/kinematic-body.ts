import * as P5 from 'p5';

export interface KinematicBody {
  position: P5.Vector;
  velocity: P5.Vector;
  acceleration: P5.Vector;
}
