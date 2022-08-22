import * as P5 from 'p5';
import { ButtonControl, Sketch } from 'src/app/core';
import {
  circle,
  clampMagnitude,
  createCanvasOnParentContainer,
  DARK_MODE_BACKGROUND,
  DARK_MODE_FOREGROUND,
  distance,
  point,
} from 'src/app/sketch-lib';

const runPauseButton = new ButtonControl('Pause');
const drawOnceButton = new ButtonControl('Draw Once');

export const flowFieldSketch1: Sketch = {
  title: 'Flow Field 1',
  width: undefined,
  height: undefined,
  controls: {
    refreshButton: true,
    downloadButton: true,
    customControls: [runPauseButton, drawOnceButton],
  },
  func: (p5: P5) => {
    let running = true;
    let frameCount = 0;
    let flowField: FlowField;

    p5.setup = () => {
      createCanvasOnParentContainer(p5, {
        width: flowFieldSketch1.width,
        height: flowFieldSketch1.height,
      });
      p5.background(DARK_MODE_BACKGROUND);
      p5.stroke(DARK_MODE_FOREGROUND, 35);  
      p5.noFill();
      p5.blendMode(p5.DIFFERENCE)

      drawOnceButton.onPress = () => {
        drawOnce();
      };

      runPauseButton.onPress = () => {
        running = !running;
        runPauseButton.label$.next(running ? 'Pause' : 'Run');
      };

      flowField = new FlowField(p5);
    };

    p5.draw = () => {
      if (running) {
        drawOnce();
      }
    };

    function drawOnce(): void {
      // p5.background(DARK_MODE_BACKGROUND);

      flowField.step();
      flowField.draw();

      frameCount++;
    }
  },
};

class FlowField {
  private forceXGridSize = 50;
  private forceYGridSize = 50;
  private forcePerlinXFactor = 5;
  private forcePerlinYFactor = 5;
  private drawForces = false;

  private particleCount = 500;

  private forces: FieldForce[] = [];
  private particles: Particle[] = [];

  private get forceXFactor(): number {
    return this.p5.width / this.forceXGridSize;
  }

  private get forceYFactor(): number {
    return this.p5.height / this.forceYGridSize;
  }

  constructor(private p5: P5) {
    this.initializeForces();
    this.initializeParticles();
  }

  public initializeForces(): void {
    for (let i = 0; i <= this.forceXGridSize; i++) {
      for (let j = 0; j <= this.forceYGridSize; j++) {
        const forceXPos = i * this.forceXFactor;
        const forceYPos = j * this.forceYFactor;

        this.forces.push(
          new FieldForce(
            this.p5,
            forceXPos,
            forceYPos,
            this.p5.noise(
              forceXPos * this.forcePerlinXFactor,
              forceYPos * this.forcePerlinYFactor
            ) * this.p5.TWO_PI
          )
        );
      }
    }
  }

  public initializeParticles(): void {
    for (let i = 0; i < this.particleCount; i++) {
      this.particles.push(new Particle(this.p5));
    }
  }

  public draw(): void {
    if (this.drawForces) {
      this.forces.forEach((forceCol) => forceCol.draw());
    }
    this.particles.forEach((particle) => particle.draw());
  }

  public step(): void {
    this.particles.forEach((particle) => {
      this.forces.forEach((force) => {
        particle.applyForce(
          force.force,
          distance(force.position, particle.position)
        );
      });
    });

    this.particles.forEach((particle) => particle.step());
  }
}

class FieldForce {
  public position: P5.Vector;
  public force: P5.Vector;

  constructor(private p5: P5, xPos: number, yPos: number, angle: number) {
    this.force = P5.Vector.fromAngle(angle);
    this.position = this.p5.createVector(xPos, yPos);
  }

  public draw(): void {
    this.p5.push();
    this.p5.translate(this.position.x, this.position.y);
    this.p5.rotate(this.force.heading());
    this.p5.line(0, 0, 10, 0);
    this.p5.translate(-5, 0);
    this.p5.circle(0, 0, 3);
    this.p5.pop();
  }
}

class Particle {
  public position: P5.Vector;
  public velocity: P5.Vector;
  public acceleration: P5.Vector;

  constructor(private p5: P5) {
    this.position = this.p5.createVector(
      this.p5.random(0, this.p5.width),
      this.p5.random(0, this.p5.height)
    );
    this.velocity = this.p5.createVector(0, 0);
    this.acceleration = this.p5.createVector(0, 0);
  }

  public draw(): void {
    // this.p5.push();
    // this.p5.color();
    point(this.p5, this.position);
  }

  public step(): void {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
    clampMagnitude(this.velocity, 1);

    this.checkBounds();
  }

  public applyForce(force: P5.Vector, distance: number): void {
    if (distance <= 0) {
      distance = 1;
    }

    this.acceleration.add(force.copy().div(distance * distance));
  }

  public checkBounds(): void {
    if (this.position.x < 0) {
      this.position.x = this.p5.width;
    }
    if (this.position.x > this.p5.width) {
      this.position.x = 0;
    }
    if (this.position.y < 0) {
      this.position.y = this.p5.height;
    }
    if (this.position.y > this.p5.height) {
      this.position.y = 0;
    }
  }
}
