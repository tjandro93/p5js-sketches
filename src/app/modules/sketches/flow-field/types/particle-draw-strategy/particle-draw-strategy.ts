import { BaseFlowFieldParticle } from '../particle/base-flow-field-particle';

export interface FlowFieldParticleDrawStrategy {
  draw(particles: BaseFlowFieldParticle[]): void;
}
