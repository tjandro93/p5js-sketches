import { KinematicBody } from '../particle/kinematic-body';

export interface InitialKinematicsStrategy {
  createInitialKinematics(): KinematicBody;
}
