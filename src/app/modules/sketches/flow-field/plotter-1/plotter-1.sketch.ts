import * as P5 from 'p5';
import { PlotterFriendlyDimensions, Sketch, SliderControl } from 'src/app/core';
import { CheckboxControl } from 'src/app/core/types/sketch-controls/checkbox-control';
import { SelectControl } from 'src/app/core/types/sketch-controls/select-control';
import {
  clampMagnitude,
  createCanvasOnParentContainer,
  DARK_MODE_BACKGROUND,
  DARK_MODE_FOREGROUND,
  distance,
  partitionedPolyline,
} from 'src/app/sketch-lib';

const drawForcesCheckbox = new CheckboxControl('Draw Forces', false);
const iterationCountSlider = new SliderControl(
  'Iteration Count',
  1,
  10000,
  3000,
  1
);
const forceGridSizeSlider = new SliderControl('Force grid size', 1, 100, 50, 1);
const forcePerlinFactor = new SliderControl(
  'Force Perlin Factor*',
  0.001,
  0.1,
  0.005,
  0.001
);
const particleCountSlider = new SliderControl('Particle Count', 1, 250, 20, 1);
const particleMaxSpeedSlider = new SliderControl(
  'Particle Max Speed',
  0,
  5,
  1,
  0.01
);

const particleMinSpeedSlider = new SliderControl(
  'Particle Min Speed',
  0,
  5,
  0.5,
  0.01
);
const loopParticlesCheckbox = new CheckboxControl('Loop Particles', false);
const particleStartingPositionSelect = new SelectControl(
  'Particle starting location',
  [
    'Top Left Guassian',
    'Left Guassian',
    'Top Guassian',
    'Fully Random',
    'Top Random',
    'Left Random',
    'Top Left Random',
    'Center Rect',
    'Top or Left Random',
  ],
  'Top or Left Random'
);

const guassianMeanSlider = new SliderControl(
  'Guassian Mean Divisor',
  1,
  10,
  8,
  0.1
);

const guassianSDSlider = new SliderControl(
  'Guassian SD Divisor',
  0.01,
  10,
  2,
  0.01
);

let flowField: FlowField;

export const plotter1: Sketch = {
  title: 'Flow Field (Plotter)',
  width: PlotterFriendlyDimensions.letter.width,
  height: PlotterFriendlyDimensions.letter.height,
  isSvg: true,
  controls: {
    refreshButton: true,
    downloadButton: true,
    customControls: [
      iterationCountSlider,
      drawForcesCheckbox,
      forceGridSizeSlider,
      forcePerlinFactor,
      particleCountSlider,
      particleMaxSpeedSlider,
      particleMinSpeedSlider,
      loopParticlesCheckbox,
      particleStartingPositionSelect,
      guassianMeanSlider,
      guassianSDSlider,
    ],
  },
  func: (p5: P5) => {
    p5.setup = () => {
      console.log('setup() started');
      const setupStart = p5.millis();

      createCanvasOnParentContainer(p5, {
        width: plotter1.width,
        height: plotter1.height,
        useSvg: plotter1.isSvg,
      });

      p5.background(DARK_MODE_BACKGROUND);
      p5.stroke(DARK_MODE_FOREGROUND);
      p5.blendMode(p5.SCREEN);

      p5.noiseSeed(p5.random(0, 10000));
      // p5.noiseSeed(0);
      // p5.randomSeed(0);

      flowField = new FlowField(p5);

      for (let i = 0; i < iterationCountSlider.value; i++) {
        flowField.step();
      }
      flowField.draw();

      const setupEnd = p5.millis();

      console.log(`setup() took ${setupEnd - setupStart}ms to run`);
    };
  },
};

class FlowField {
  private readonly forceXGridSize: number;
  private readonly forceYGridSize: number;
  private readonly forcePerlinXFactor: number;
  private readonly forcePerlinYFactor: number;

  private particleCount: number;

  private forces: FieldForce[] = [];
  private particles: Particle[] = [];

  private get forceColCount(): number {
    return this.p5.width / this.forceXGridSize;
  }

  private get forceRowCount(): number {
    return this.p5.height / this.forceYGridSize;
  }

  constructor(private p5: P5) {
    this.forceXGridSize = forceGridSizeSlider.value;
    this.forceYGridSize = forceGridSizeSlider.value;
    this.forcePerlinXFactor = forcePerlinFactor.value;
    this.forcePerlinYFactor = forcePerlinFactor.value;

    this.particleCount = particleCountSlider.value;

    this.initializeForces();
    this.initializeParticles(this.particleCount);
  }

  public initializeForces(): void {
    for (let i = -2; i <= this.forceColCount + 2; i++) {
      for (let j = -2; j <= this.forceRowCount + 2; j++) {
        const xPos = i * this.forceXGridSize;
        const yPos = j * this.forceYGridSize;

        this.forces.push(
          new FieldForce(
            this.p5,
            xPos,
            yPos,
            this.p5.noise(
              xPos * this.forcePerlinXFactor,
              yPos * this.forcePerlinYFactor
            ) * this.p5.HALF_PI
          )
        );
      }
    }
  }

  public initializeParticles(particleCount: number): void {
    for (let i = 0; i < particleCount; i++) {
      this.particles.push(new Particle(this.p5));
    }
  }

  public draw(): void {
    if (drawForcesCheckbox.value) {
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
    const startX = this.position.x;
    const startY = this.position.y;
    const endX = startX + this.p5.cos(this.force.heading()) * 10;
    const endY = startY + this.p5.sin(this.force.heading()) * 10;

    this.p5.stroke(255);
    this.p5.line(startX, startY, endX, endY);
    this.p5.circle(endX, endY, 3);
  }
}

class Particle {
  public position: P5.Vector;
  public velocity: P5.Vector;
  public acceleration: P5.Vector;
  public previousPositions: (P5.Vector | null)[] = [];

  constructor(private p5: P5) {
    this.initKinematics();
  }

  public initKinematics(): void {
    this.initPosition();
    this.velocity = this.p5.createVector(0, 0);
    this.acceleration = this.p5.createVector(0, 0);
  }

  public initPosition(): void {
    const selectValue = particleStartingPositionSelect.value;
    switch (selectValue) {
      case 'Fully Random':
        this.initPosRandom();
        break;
      case 'Top Random':
        this.initPosRandomTopEdge();
        break;
      case 'Left Random':
        this.initPosRandomLeftEdge();
        break;
      case 'Top Left Guassian':
        this.initPosGuassianTopLeftEdge();
        break;
      case 'Top Guassian':
        this.initPosGuassianTopEdge();
        break;
      case 'Left Guassian':
        this.initPosGuassianLeftEdge();
        break;
      case 'Center Rect':
        this.initPosCenterRect();
        break;
      case 'Top Left Random':
        this.initPosRandomTopLeft();
        break;
      case 'Top or Left Random':
        this.initPosRandomTopOrLeft();
        break;
    }
  }

  public initPosRandom(): void {
    this.position = this.p5.createVector(
      this.p5.random(0, this.p5.width),
      this.p5.random(0, this.p5.height)
    );
  }

  public initPosRandomLeftEdge(): void {
    this.position = this.p5.createVector(0, this.p5.random(0, this.p5.height));
  }

  public initPosRandomTopEdge(): void {
    this.position = this.p5.createVector(this.p5.random(0, this.p5.width), 0);
  }

  public initPosRandomTopLeft(): void {
    const isLeft = this.p5.random() < 0.5;
    if (isLeft) {
      this.position = this.p5.createVector(
        0,
        this.p5.random(0, this.p5.height / 4)
      );
    } else {
      this.position = this.p5.createVector(
        this.p5.random(0, this.p5.width / 4),
        0
      );
    }
  }

  public initPosRandomTopOrLeft(): void {
    const isLeft = this.p5.random() < 0.5;
    if (isLeft) {
      this.initPosRandomLeftEdge();
    } else {
      this.initPosRandomTopEdge();
    }
  }

  public initPosGuassianTopEdge(): void {
    const guassMean = this.p5.width / guassianMeanSlider.value;
    const guassSd = guassMean / guassianSDSlider.value;
    this.position = this.p5.createVector(
      this.p5.randomGaussian(guassMean, guassSd),
      0
    );
  }

  public initPosGuassianLeftEdge(): void {
    const guassMean = this.p5.height / guassianMeanSlider.value;
    const guassSd = guassMean / guassianSDSlider.value;
    this.position = this.p5.createVector(
      0,
      this.p5.randomGaussian(guassMean, guassSd)
    );
  }

  public initPosGuassianTopLeftEdge(): void {
    const isLeft = this.p5.random() < 0.5;

    if (isLeft) {
      const guassMean = this.p5.height / guassianMeanSlider.value;
      const guassSd = guassMean / guassianSDSlider.value;

      this.position = this.p5.createVector(
        0,
        this.p5.randomGaussian(guassMean, guassSd)
      );
    } else {
      const guassMean = this.p5.height / guassianMeanSlider.value;
      const guassSd = guassMean / guassianSDSlider.value;
      this.position = this.p5.createVector(
        this.p5.randomGaussian(guassMean, guassSd),
        0
      );
    }
  }

  public initPosCenterRect(): void {
    const xCenter = this.p5.width / 2;
    const yCenter = this.p5.height / 2;
    const xBoundDelta = 100;
    const yBoundDelta = 100;

    this.position = this.p5.createVector(
      this.p5.random(xCenter - xBoundDelta, xCenter + xBoundDelta),
      this.p5.random(yCenter - yBoundDelta, yCenter + yBoundDelta)
    );
  }

  public draw(): void {
    partitionedPolyline(this.p5, this.previousPositions);
  }

  public step(): void {
    this.previousPositions.push(this.position.copy());

    this.velocity.add(this.acceleration);
    clampMagnitude(
      this.velocity,
      particleMinSpeedSlider.value,
      particleMaxSpeedSlider.value
    );
    this.position.add(this.velocity);
    this.acceleration.mult(0);
    this.velocity.mult(0);

    if (loopParticlesCheckbox.value) {
      this.checkBoundsLoop();
    } else {
      this.checkBoundsRandom();
    }
  }

  public applyForce(force: P5.Vector, forceDistance: number): void {
    if (forceDistance <= 5) {
      forceDistance = 1;
    }

    this.acceleration.add(force.copy().div(forceDistance * forceDistance));
  }

  public checkBoundsRandom(): void {
    if (
      this.position.x < 0 ||
      this.position.x > this.p5.width ||
      this.position.y < 0 ||
      this.position.y > this.p5.height
    ) {
      this.initKinematics();
      this.previousPositions.push(null);
    }
  }

  public checkBoundsLoop(): void {
    let outOfBounds = false;
    if (this.position.x < 0) {
      this.position.x = this.p5.width;
      outOfBounds = true;
    }
    if (this.position.x > this.p5.width) {
      this.position.x = 0;
      outOfBounds = true;
    }
    if (this.position.y < 0) {
      this.position.y = this.p5.height;
      outOfBounds = true;
    }
    if (this.position.y > this.p5.height) {
      this.position.y = 0;
      outOfBounds = true;
    }

    if (outOfBounds) {
      this.previousPositions.push(null);
    }
  }
}
