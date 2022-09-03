import * as P5 from 'p5';
import { Sketch } from 'src/app/core';
import {
  bezier,
  createCanvasOnParentContainer,
  DARK_MODE_BACKGROUND,
  DARK_MODE_FOREGROUND,
  Vector,
} from 'src/app/sketch-lib';

export const bezierFlow1: Sketch = {
  title: 'Bezier Flow 1',
  width: 800,
  height: 600,
  isSvg: true,
  controls: {
    refreshButton: true,
    downloadButton: true,
  },
  func: (p5: P5) => {
    const FLOW_LINE_COUNT = 10;
    const FLOW_COUNT = 10;

    p5.setup = () => {
      createCanvasOnParentContainer(p5, {
        width: bezierFlow1.width,
        height: bezierFlow1.height,
        useSvg: bezierFlow1.isSvg,
      });

      p5.background(DARK_MODE_BACKGROUND);
      p5.stroke(DARK_MODE_FOREGROUND);
      p5.noFill();
      p5.angleMode(p5.DEGREES);

      const flowSpacing = p5.width / FLOW_COUNT;
      for (let i = 0; i <= FLOW_COUNT; i++) {
        drawFlow({ x: flowSpacing * i, y: 0 });
      }

      function drawFlow(startAnchor: Vector) {
        const control1 = {
          x: p5.width / 3,
          y: p5.height / 3,
        };
        const control2 = {
          x: (p5.width / 3) * 2,
          y: (p5.height / 3) * 2,
        };

        const anchor2Spacing = p5.width / FLOW_LINE_COUNT;
        for (let i = 0; i <= FLOW_LINE_COUNT; i++) {
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
