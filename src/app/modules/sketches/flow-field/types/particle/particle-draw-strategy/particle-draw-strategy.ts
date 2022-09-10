import { FlowFieldParticle } from '../flow-field-particle';

export interface FlowFieldParticleDrawStrategy {
  type: FlowFieldParticleDrawStrategyType;
  draw(particle: FlowFieldParticle): void;
}

export const enum FlowFieldParticleDrawStrategyType {
  Batch = 'Batch',
  RealTime = 'Real Time',
}

export const flowFieldParticleDrawStrategyTypeValues = [
  FlowFieldParticleDrawStrategyType.Batch,
  FlowFieldParticleDrawStrategyType.RealTime,
];
