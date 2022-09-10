import { OutOfBoundsPosition } from 'src/app/sketch-lib';
import { FlowFieldParticle } from '../flow-field-particle';
import {
  HandleOutOfBoundsStrategy,
  HandleOutOfBoundsStrategyType,
} from './handle-out-of-bounds-strategy';

export class KillParticleOutOfBoundsStrategy
  implements HandleOutOfBoundsStrategy
{
  public type = HandleOutOfBoundsStrategyType.Kill;

  public handleOutOfBounds(
    particle: FlowFieldParticle,
    _outOfBoundsPositions: OutOfBoundsPosition[]
  ): void {
    particle.isDead = true;
  }
}
