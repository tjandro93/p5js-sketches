import { BaseFlowFieldParticle } from './base-flow-field-particle';

export interface FlowFieldParticleFactory {
  createParticle(index: number, totalParticles: number): BaseFlowFieldParticle;
}
