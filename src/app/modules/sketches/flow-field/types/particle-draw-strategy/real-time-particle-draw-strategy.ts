import * as P5 from 'p5';
import { line } from 'src/app/sketch-lib';
import { BaseFlowFieldParticle } from '../particle/base-flow-field-particle';
import { FlowFieldParticleDrawStrategy } from './particle-draw-strategy';

export class RealTimeParticleDrawStrategy
  implements FlowFieldParticleDrawStrategy
{
  constructor(private p5: P5) {}

  public draw(particles: BaseFlowFieldParticle[]): void {
    particles.forEach((particle) => {
      if (particle.previousPosition != null) {
        line(this.p5, particle.previousPosition, particle.position);
      }
    });
  }
}
