import { Sketch } from '../core/types/sketch.type';
import * as p5 from 'p5';
import { createCanvasOnParentContainer } from '../sketch-lib/functions/create-canvas-on-parent-container';

export const basicTreeSketch: Sketch = {
  title: 'Basic Tree',
  isSvg: true,
  func: (p: p5) => {
    const SHRINK_MEAN = 0.65;
    const SHRINK_SD = 0.25;
    const MIN_BRANCH_LENGTH = 10;
    const ANGLE_LOWER = 30;
    const ANGLE_UPPER = 60;

    p.setup = () => {
      createCanvasOnParentContainer(p, { useSvg: true });

      tree(p.width / 2, p.height, p.height / 4);
    };

    function tree(startX: number, startY: number, trunkLength: number): void {
      p.translate(startX, startY);
      p.line(0, 0, 0, -trunkLength);
      p.translate(0, -trunkLength);
      branch(trunkLength);
    }

    function branch(parentBranchLength: number): void {
      if (parentBranchLength > MIN_BRANCH_LENGTH) {
        // draw right branch and subbranches
        let theta = p.radians(p.random(ANGLE_LOWER, ANGLE_UPPER));
        const rightBranchLength = randomBranchLength(parentBranchLength);
        p.push();
        p.rotate(theta);
        p.line(0, 0, 0, -rightBranchLength);
        p.translate(0, -rightBranchLength);
        branch(rightBranchLength);
        p.pop();

        // draw left branch and subbranches
        const leftBranchLength = randomBranchLength(parentBranchLength);
        p.push();
        theta = p.radians(p.random(ANGLE_LOWER, ANGLE_UPPER));
        p.rotate(-theta);
        p.line(0, 0, 0, -leftBranchLength);
        p.translate(0, -leftBranchLength);
        branch(leftBranchLength);
        p.pop();
      }
    }

    function randomBranchLength(parentBranchLength: number): number {
      return p.randomGaussian(SHRINK_MEAN, SHRINK_SD) * parentBranchLength;
    }
  },
};
