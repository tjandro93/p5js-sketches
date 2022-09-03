import * as P5 from 'p5';

import { Sketch } from '../core';
import {
  bezier,
  createCanvasOnParentContainer,
  line,
  Vector,
  bezierPoint,
  DARK_MODE_BACKGROUND,
  DARK_MODE_FOREGROUND,
} from '../sketch-lib';

export const leaf: Sketch = {
  title: 'Leaf',
  width: 600,
  height: 400,
  isSvg: true,
  controls: {
    refreshButton: true,
    downloadButton: true,
  },
  func: (p5: P5) => {
    let stemStart: Vector;
    let stemEnd: Vector;
    let sideStartAnchor: Vector;
    let sideEndAnchor: Vector;
    let topSideControl: Vector;
    let bottomSideControl: Vector;

    p5.setup = () => {
      createCanvasOnParentContainer(p5, {
        useSvg: leaf.isSvg,
        width: leaf.width,
        height: leaf.height,
      });

      p5.background(DARK_MODE_BACKGROUND);
      p5.stroke(DARK_MODE_FOREGROUND);
      p5.strokeWeight(1);
      p5.noFill();

      stemStart = { x: 25, y: p5.height / 2 };
      stemEnd = { x: p5.width - 25, y: p5.height / 2 };
      line(p5, stemStart, stemEnd);

      sideStartAnchor = { x: stemStart.x + 50, y: stemStart.y };
      sideEndAnchor = { x: stemEnd.x, y: stemEnd.y };
      topSideControl = { x: stemStart.x + 150, y: stemStart.y - 100 };
      bottomSideControl = { x: stemStart.x + 150, y: stemStart.y + 100 };

      bezier(
        p5,
        sideStartAnchor,
        topSideControl,
        topSideControl,
        sideEndAnchor
      );

      bezier(
        p5,
        sideStartAnchor,
        bottomSideControl,
        bottomSideControl,
        sideEndAnchor
      );

      const branchSteps = 10;
      for (let i = 1; i < branchSteps; i++) {
        const branchStartAnchor = {
          x: p5.map(i, 0, branchSteps * 3, sideStartAnchor.x, sideEndAnchor.x),
          y: p5.map(i, 0, branchSteps * 3, sideStartAnchor.y, sideEndAnchor.y),
        };

        const t = i / branchSteps;
        const topBranchEndAnchor = bezierPoint(
          p5,
          sideStartAnchor,
          topSideControl,
          topSideControl,
          sideEndAnchor,
          t
        );
        const bottomBranchEndAnchor = bezierPoint(
          p5,
          sideStartAnchor,
          bottomSideControl,
          bottomSideControl,
          sideEndAnchor,
          t
        );

        const topBranchControl = {
          x: p5.lerp(branchStartAnchor.x, topBranchEndAnchor.x, t),
          y: p5.lerp(branchStartAnchor.y, topBranchEndAnchor.y, t),
        };
        const bottomBranchControl = {
          x: p5.lerp(branchStartAnchor.x, bottomBranchEndAnchor.x, t),
          y: p5.lerp(branchStartAnchor.y, bottomBranchEndAnchor.y, t),
        };

        // p5.stroke('purple')
        // circle(p5, topBranchControl, 10)
        // p5.stroke('blue')
        // circle(p5, bottomBranchControl, 10)
        // p5.stroke(0);

        bezier(
          p5,
          branchStartAnchor,
          topBranchControl,
          topBranchControl,
          topBranchEndAnchor
        );
        bezier(
          p5,
          branchStartAnchor,
          bottomBranchControl,
          bottomBranchControl,
          bottomBranchEndAnchor
        );

        // p5.stroke('purple');
        // circle(p5, branchStartAnchor, 10);
        // p5.stroke('green');
        // circle(p5, topBranchEndAnchor, 10);
        // p5.stroke('red');
        // circle(p5, bottomBranchEndAnchor, 10);
        // p5.stroke(0);
      }
    };
  },
};
