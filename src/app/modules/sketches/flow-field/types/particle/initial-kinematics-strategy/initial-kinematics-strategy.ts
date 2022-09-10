import { KinematicBody } from '../kinematic-body';

export interface InitialKinematicsStrategy {
  type: InitialKinematicsStrategyType;
  createInitialKinematics(): KinematicBody;
}

export const enum InitialKinematicsStrategyType {
  FullyRandom = 'Fully random',
  RandomLeftEdge = 'Random left edge',
  RandomRightEdge = 'Random right edge',
  RandomTopEdge = 'Random top edge',
  RandomBottomEdge = 'Random bottom edge',
  RandomAnyEdge = 'Random any edge',
  RandomInCircle = 'Random in circle',
  // Guassian randoms ???
  // Random corners???
}

export const initialKinematicsStrategyTypeValues = [
  InitialKinematicsStrategyType.FullyRandom,
  InitialKinematicsStrategyType.RandomLeftEdge,
  InitialKinematicsStrategyType.RandomRightEdge,
  InitialKinematicsStrategyType.RandomTopEdge,
  InitialKinematicsStrategyType.RandomBottomEdge,
  InitialKinematicsStrategyType.RandomAnyEdge,
  InitialKinematicsStrategyType.RandomInCircle,
];
