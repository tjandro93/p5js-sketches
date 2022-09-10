import * as P5 from 'p5';
import {
  PointGrid,
  PointGridOptions,
  PointGridPointFactory,
} from 'src/app/sketch-lib';
import { FlowFieldForce } from './flow-field-force';
import { FlowFieldParticle } from './particle/flow-field-particle';
import { FlowFieldParticleFactory } from './particle/flow-field-particle-factory';

export abstract class BaseFlowField {
  public pointGrid: PointGrid<FlowFieldForce>;
  public particles: FlowFieldParticle[] = [];

  constructor(public p5: P5, public options: BaseFlowFieldOptions) {
    this.pointGrid = new PointGrid(this.p5, {
      ...options.pointGridOptions,
      pointGridPointFactory: options.forceFactory,
    });

    for (let i = 0; i < options.particleCount; i++) {
      this.particles.push(options.particleFactory.createParticle());
    }
  }

  public draw(): void {
    if (this.options.drawForces) {
      this.pointGrid.points.forEach((point) => point.draw());
    }

    this.particles.forEach((particle) => particle.draw());
  }

  public step(): void {
    this.particles.forEach((particle) => {
      particle.applyForces(this.pointGrid);
      particle.step();
    });
  }
}

export interface BaseFlowFieldOptions {
  pointGridOptions: Omit<
    PointGridOptions<FlowFieldForce>,
    'pointGridPointFactory'
  >;
  drawForces: boolean;
  forceFactory: FlowFieldForceFactory;
  particleFactory: FlowFieldParticleFactory;
  particleCount: number;
}

export type FlowFieldForceFactory = PointGridPointFactory<FlowFieldForce>;
