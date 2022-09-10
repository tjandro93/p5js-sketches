import * as P5 from 'p5';
import { partitionedPolyline } from 'src/app/sketch-lib';
import { FlowFieldParticle } from '../flow-field-particle';
import {
  FlowFieldParticleDrawStrategy,
  FlowFieldParticleDrawStrategyType,
} from './particle-draw-strategy';

export class BatchParticleDrawStrategy
  implements FlowFieldParticleDrawStrategy
{
  constructor(private p5: P5) {}

  public type = FlowFieldParticleDrawStrategyType.Batch;

  public draw(particle: FlowFieldParticle): void {
    partitionedPolyline(this.p5, particle.previousPositions);
  }
}
