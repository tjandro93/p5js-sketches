import * as P5 from 'p5';
import { line } from 'src/app/sketch-lib';
import { FlowFieldParticle } from '../flow-field-particle';
import {
  FlowFieldParticleDrawStrategy,
  FlowFieldParticleDrawStrategyType,
} from './particle-draw-strategy';

export class RealTimeParticleDrawStrategy
  implements FlowFieldParticleDrawStrategy
{
  constructor(private p5: P5) {}

  public type = FlowFieldParticleDrawStrategyType.RealTime;

  public draw(particle: FlowFieldParticle): void {
    if (particle.previousPosition != null) {
      line(this.p5, particle.previousPosition, particle.position);
    }
  }
}
