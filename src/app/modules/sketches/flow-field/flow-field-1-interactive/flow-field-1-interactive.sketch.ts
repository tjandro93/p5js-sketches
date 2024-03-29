import * as P5 from 'p5';
import { ButtonControl, Sketch, SliderControl } from 'src/app/core';
import { CheckboxControl } from 'src/app/core/types/sketch-controls/checkbox-control';
import {
  clampMagnitude,
  createCanvasOnParentContainer,
  DARK_MODE_BACKGROUND,
  DARK_MODE_FOREGROUND,
  distance,
  line,
} from 'src/app/sketch-lib';

const runPauseButton = new ButtonControl('Pause');
const drawOnceButton = new ButtonControl('Draw Once');
const drawForcesCheckbox = new CheckboxControl('Draw Forces', false);
const forceGridSizeSlider = new SliderControl(
  'Force grid size*',
  1,
  100,
  50,
  1
);
const forcePerlinFactorSlider = new SliderControl(
  'Force Perlin Factor*',
  0.001,
  0.01,
  0.005,
  0.001
);
const initialParticleCountSlider = new SliderControl(
  'Initial Particle Count*',
  1,
  100,
  5,
  1
);

const maxParticleCountSlider = new SliderControl(
  'Max Particle Count',
  10,
  200,
  100,
  1
);

const particleIncrementAmountSlider = new SliderControl(
  'Particle Increment Amount',
  1,
  20,
  1,
  1
);

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

export const flowField1Interactive: Sketch = {
  title: 'Flow Field 1 (Interactive)',
  width: 1000,
  height: 1000,
  isSvg: false,
  controls: {
    refreshButton: true,
    downloadButton: true,
    customControls: [
      runPauseButton,
      drawOnceButton,
      drawForcesCheckbox,
      forceGridSizeSlider,
      forcePerlinFactorSlider,
      initialParticleCountSlider,
      maxParticleCountSlider,
      particleIncrementAmountSlider,
      particleMaxSpeedSlider,
      particleMinSpeedSlider,
      loopParticlesCheckbox,
    ],
  },
  func: (p5: P5) => {
    let running = true;
    let frameCount = 0;
    let flowField: FlowField;

    p5.setup = () => {
      createCanvasOnParentContainer(p5, {
        width: flowField1Interactive.width,
        height: flowField1Interactive.height,
        useSvg: flowField1Interactive.isSvg,
      });
      p5.background(DARK_MODE_BACKGROUND);
      p5.stroke(DARK_MODE_FOREGROUND, 48);
      p5.noFill();
      p5.blendMode(p5.SCREEN);

      p5.noiseSeed(p5.random(0, 10000));

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
      flowField.step();
      flowField.draw();

      frameCount++;
      // console.log('Frame rate: ' + p5.frameRate());
    }
  },
};

class FlowField {
  private readonly forceXGridSize: number;
  private readonly forceYGridSize: number;
  private readonly forcePerlinXFactor: number;
  private readonly forcePerlinYFactor: number;

  private initialParticleCount: number;
  private particleIncreaseTimeout = 250;

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
    this.forcePerlinXFactor = forcePerlinFactorSlider.value;
    this.forcePerlinYFactor = forcePerlinFactorSlider.value;

    this.initialParticleCount = initialParticleCountSlider.value;

    this.initializeForces();
    this.initializeParticles(this.initialParticleCount);

    const interval = setInterval(() => {
      if (this.particles.length < maxParticleCountSlider.value) {
        this.initializeParticles(particleIncrementAmountSlider.value);
      } else {
        console.log('ending interval');
        clearInterval(interval);
      }
    }, this.particleIncreaseTimeout);
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
            ) *
              this.p5.TWO_PI -
              this.p5.HALF_PI
          )
        );
      }
    }
  }

  public initializeParticles(particleCount: number): void {
    console.log(`Adding ${particleCount} particles`);
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
    this.p5.push();
    this.p5.stroke(DARK_MODE_FOREGROUND);
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
  public previousPosition: P5.Vector;

  private get xBoundFudgeFactor() {
    return this.p5.width / 8;
  }

  private get yBoundFudgeFactor() {
    return this.p5.height / 8;
  }

  constructor(private p5: P5) {
    this.initKinematics();
  }

  public initKinematics(): void {
    this.initPosRandom();
    this.velocity = this.p5.createVector(0, 0);
    this.acceleration = this.p5.createVector(0, 0);

    this.previousPosition = this.position.copy();
  }

  public initPosRandom(): void {
    this.position = this.p5.createVector(
      this.p5.random(0, this.p5.width),
      this.p5.random(0, this.p5.height)
    );
  }

  public initPosRightEdge(): void {
    this.position = this.p5.createVector(
      this.p5.width,
      this.p5.random(0, this.p5.height)
    );
  }

  public initPosRandomTopEdge(): void {
    this.position = this.p5.createVector(this.p5.random(0, this.p5.width), 0);
  }

  public initPosGuassianTopEdge(): void {
    const guassMean = this.p5.width / 2;
    const guassSd = guassMean / 2;
    this.position = this.p5.createVector(
      this.p5.randomGaussian(guassMean, guassSd),
      -1
    );
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
    line(this.p5, this.previousPosition, this.position);
  }

  public step(): void {
    this.previousPosition = this.position.copy();

    this.velocity.add(this.acceleration);
    clampMagnitude(
      this.velocity,
      particleMinSpeedSlider.value,
      particleMaxSpeedSlider.value
    );
    this.position.add(this.velocity);
    this.acceleration.mult(0);

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
      this.position.x < -this.xBoundFudgeFactor ||
      this.position.x > this.p5.width + this.xBoundFudgeFactor ||
      this.position.y < -this.yBoundFudgeFactor ||
      this.position.y > this.p5.height + this.yBoundFudgeFactor
    ) {
      this.initKinematics();
    }
  }

  public checkBoundsLoop(): void {
    if (this.position.x < -this.xBoundFudgeFactor) {
      this.position.x = this.p5.width;
      this.previousPosition = this.position.copy();
    }
    if (this.position.x > this.p5.width + this.xBoundFudgeFactor) {
      this.position.x = 0;
      this.previousPosition = this.position.copy();
    }
    if (this.position.y < -this.yBoundFudgeFactor) {
      this.position.y = this.p5.height;
      this.previousPosition = this.position.copy();
    }
    if (this.position.y > this.p5.height + this.yBoundFudgeFactor) {
      this.position.y = 0;
      this.previousPosition = this.position.copy();
    }
  }
}
