import { KinematicBody } from '../kinematic-body';

export interface InitialKinematicsStrategy {
  type: InitialKinematicsStrategyType;
  createInitialKinematics(): KinematicBody;
}

export const enum InitialKinematicsStrategyType {
  FullyRandom = 'Fully random',
}

export const initialKinematicsStrategyTypeValues = [
  InitialKinematicsStrategyType.FullyRandom,
];
