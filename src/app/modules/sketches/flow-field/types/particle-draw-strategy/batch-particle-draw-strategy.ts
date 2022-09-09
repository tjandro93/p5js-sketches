import * as P5 from 'p5';
import { partitionedPolyline } from 'src/app/sketch-lib';
import { BaseFlowFieldParticle } from '../particle/base-flow-field-particle';
import { FlowFieldParticleDrawStrategy } from './particle-draw-strategy';

export class BatchParticleDrawStrategy
  implements FlowFieldParticleDrawStrategy
{
  constructor(private p5: P5) {}

  public draw(particles: BaseFlowFieldParticle[]): void {
    particles.forEach((particle) => {
      partitionedPolyline(this.p5, particle.previousPositions);
    });
  }
}
