import {
  FlowFieldParticle,
  FlowFieldParticleOptions,
} from './flow-field-particle';

export class FlowFieldParticleFactory {
  constructor(private options: FlowFieldParticleOptions) {}

  public createParticle(): FlowFieldParticle {
    return new FlowFieldParticle(this.options);
  }
}
