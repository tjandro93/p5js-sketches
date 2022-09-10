import { PointGrid } from 'src/app/sketch-lib';
import { FlowFieldForce } from '../../flow-field-force';
import { FlowFieldParticle } from '../flow-field-particle';

export interface ApplyForcesStrategy {
  type: ApplyForcesStrategyType;
  applyForces(
    particle: FlowFieldParticle,
    forces: PointGrid<FlowFieldForce>
  ): void;
}

export const enum ApplyForcesStrategyType {
  ApplyClosestForce = 'Apply closest force',
}

export const applyForcesStrategyTypeValues = [
  ApplyForcesStrategyType.ApplyClosestForce,
];
