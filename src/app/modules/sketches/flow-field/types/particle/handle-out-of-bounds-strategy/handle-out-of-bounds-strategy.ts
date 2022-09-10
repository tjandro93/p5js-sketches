import { OutOfBoundsPosition } from 'src/app/sketch-lib';
import { FlowFieldParticle } from '../flow-field-particle';

export interface HandleOutOfBoundsStrategy {
  type: HandleOutOfBoundsStrategyType;

  handleOutOfBounds(
    particle: FlowFieldParticle,
    outOfBoundsPositions: OutOfBoundsPosition[]
  ): void;
}

export const enum HandleOutOfBoundsStrategyType {
  Reinitiate = 'Reinitiate',
  Kill = 'Kill',
}

export const handleOutOfBoundsStrategyTypeValues = [
  HandleOutOfBoundsStrategyType.Reinitiate,
  HandleOutOfBoundsStrategyType.Kill,
];
