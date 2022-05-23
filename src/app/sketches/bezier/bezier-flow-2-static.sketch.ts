import * as P5 from 'p5';
import { Sketch } from 'src/app/core';
import {
  bezier,
  createCanvasOnParentContainer,
  DARK_MODE_BACKGROUND,
  DARK_MODE_FOREGROUND,
  Vector,
} from 'src/app/sketch-lib';

export const bezierFlow2Static: Sketch = {
  title: 'Bezier Flow 2 (static)',
  controls: {
    refreshButton: true,
    downloadButton: true,
  },
  func: (p5: P5) => {
    const FLOW_LINE_COUNT = 10;
    const FLOW_COUNT = 10;
    const NOISE_STEP = 0.05;

    p5.setup = () => {
      createCanvasOnParentContainer(p5, {
        useSvg: true,
      });

      p5.background(DARK_MODE_BACKGROUND);
      p5.stroke(DARK_MODE_FOREGROUND);
      p5.noFill();
      p5.angleMode(p5.DEGREES);
      p5.noiseSeed(p5.random(0, 10000));

      const flowSpacing = p5.width / FLOW_COUNT;
      for (let i = 0; i <= FLOW_COUNT; i++) {
        drawFlow({ x: flowSpacing * i, y: 0 }, i);
      }

      function drawFlow(startAnchor: Vector, anchorIndex: number) {
        const anchor2Spacing = p5.width / FLOW_LINE_COUNT;
        for (let i = 0; i <= FLOW_LINE_COUNT; i++) {
          const control1 = {
            x: p5.width * p5.noise(anchorIndex * NOISE_STEP),
            y: p5.height * p5.noise(i * NOISE_STEP),
          };
          const control2 = {
            x: p5.width * p5.noise(i * NOISE_STEP),
            y: p5.height * p5.noise(anchorIndex * NOISE_STEP),
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
