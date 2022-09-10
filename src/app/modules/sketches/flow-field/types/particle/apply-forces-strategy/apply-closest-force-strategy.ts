import { PointGrid } from 'src/app/sketch-lib';
import { FlowFieldForce } from '../../flow-field-force';
import { FlowFieldParticle } from '../flow-field-particle';
import {
  ApplyForcesStrategy,
  ApplyForcesStrategyType,
} from './apply-forces-strategy';

export class ApplyClosestForceStrategy implements ApplyForcesStrategy {
  public type = ApplyForcesStrategyType.ApplyClosestForce;

  public applyForces(
    particle: FlowFieldParticle,
    forces: PointGrid<FlowFieldForce>
  ): void {
    const [closestForce] = forces.getNearestPointToVector(particle.position);
    particle.acceleration.add(closestForce.force);
  }
}
