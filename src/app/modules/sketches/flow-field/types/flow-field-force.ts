import * as P5 from 'p5';
import { PointGridPoint } from 'src/app/sketch-lib';

export class FlowFieldForce implements PointGridPoint {
  constructor(
    public p5: P5,
    public position: P5.Vector,
    public force: P5.Vector
  ) {}

  public draw(): void {
    const startX = this.position.x;
    const startY = this.position.y;
    const endX = startX + this.p5.cos(this.force.heading()) * 10;
    const endY = startY + this.p5.sin(this.force.heading()) * 10;

    this.p5.push();
    this.p5.stroke(255);
    this.p5.line(startX, startY, endX, endY);
    this.p5.circle(endX, endY, 3);
    this.p5.pop();
  }
}
