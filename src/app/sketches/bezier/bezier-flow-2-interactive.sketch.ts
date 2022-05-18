import * as P5 from 'p5';
import { Sketch } from 'src/app/core';
import {
  bezier,
  createCanvasOnParentContainer,
  Vector,
} from 'src/app/sketch-lib';

export const bezierFlow2Interactive: Sketch = {
  title: 'Bezier flow 2 (interactive)',
  func: (p5: P5) => {
    const FLOW_LINE_COUNT = 15;
    const FLOW_COUNT = 15;
    const POSITION_NOISE_STEP = 0.5;
    const TIME_NOISE_STEP = 0.001;

    p5.setup = () => {
      createCanvasOnParentContainer(p5);

      p5.background(255);
      p5.strokeWeight(1);
      p5.noFill();
      p5.angleMode(p5.DEGREES);
    };

    p5.draw = () => {
      p5.background(255);
      const flowSpacing = p5.width / FLOW_COUNT;
      for (let i = 0; i <= FLOW_COUNT; i++) {
        drawFlow({ x: flowSpacing * i, y: 0 }, i);
      }

      function drawFlow(startAnchor: Vector, anchorIndex: number) {
        const anchor2Spacing = p5.width / FLOW_LINE_COUNT;
        for (let i = 0; i <= FLOW_LINE_COUNT; i++) {
          const control1 = {
            x: p5.width * p5.noise(anchorIndex * POSITION_NOISE_STEP, p5.frameCount * TIME_NOISE_STEP),
            y: p5.height * p5.noise(i * POSITION_NOISE_STEP, p5.frameCount * TIME_NOISE_STEP),
          };
          const control2 = {
            x: p5.width * p5.noise(i * POSITION_NOISE_STEP, p5.frameCount * TIME_NOISE_STEP),
            y: p5.height * p5.noise(anchorIndex * POSITION_NOISE_STEP, p5.frameCount * TIME_NOISE_STEP),
          };

          const anchor2 = {
            x: anchor2Spacing * i,
            y: p5.height,
          };

          bezier(p5, startAnchor, control1, control2, anchor2);
        }
      }
    };
  },
};
