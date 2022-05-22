import { ButtonControl, Sketch } from '../../core';
import * as P5 from 'p5';
import {
  createCanvasOnParentContainer,
  Vector,
  BezierCurve,
  DARK_MODE_BACKGROUND,
  DARK_MODE_FOREGROUND,
} from '../../sketch-lib';

const newCurveButton = new ButtonControl('Add new curve');

export const bezierFiddle: Sketch = {
  title: 'Bezier fiddle',
  controls: {
    customControls: [newCurveButton],
  },
  func: (p5: P5) => {
    const curves: BezierCurve[] = [];
    let draggedPoint: Vector | undefined;

    p5.setup = () => {
      createCanvasOnParentContainer(p5);

      p5.background(DARK_MODE_BACKGROUND);
      p5.fill(DARK_MODE_BACKGROUND);
      p5.stroke(DARK_MODE_FOREGROUND);
      p5.strokeWeight(2);
      p5.noFill();

      newCurveButton.onPress = () => {
        curves.push(
          new BezierCurve(
            p5,
            { x: 200, y: 200 },
            { x: 250, y: 150 },
            { x: 150, y: 300 },
            { x: 500, y: 500 },
            {
              drawAnchors: true,
              drawControls: true,
            }
          )
        );
      };

      curves.push(
        new BezierCurve(
          p5,
          { x: 200, y: 200 },
          { x: 250, y: 150 },
          { x: 150, y: 300 },
          { x: 500, y: 500 },
          {
            drawAnchors: true,
            drawControls: true,
          }
        )
      );
    };

    p5.draw = () => {
      p5.background(DARK_MODE_BACKGROUND);
      curves.forEach((curve) => {
        if (p5.mouseIsPressed && draggedPoint != null) {
          draggedPoint.x = p5.mouseX;
          draggedPoint.y = p5.mouseY;
        }

        curve.draw();
      });
    };

    p5.mousePressed = () => {
      let newPointDragged = false;
      for (const curve of curves) {
        if (isMouseOverPoint(curve.anchor1)) {
          draggedPoint = curve.anchor1;
          newPointDragged = true;
          break;
        }
        if (isMouseOverPoint(curve.control1)) {
          draggedPoint = curve.control1;
          newPointDragged = true;
          break;
        }
        if (isMouseOverPoint(curve.control2)) {
          draggedPoint = curve.control2;
          newPointDragged = true;
          break;
        }
        if (isMouseOverPoint(curve.anchor2)) {
          draggedPoint = curve.anchor2;
          newPointDragged = true;
          break;
        }
      }
      if (!newPointDragged) {
        draggedPoint = undefined;
      }
    };

    function isMouseOverPoint(point: Vector, threshold: number = 10): boolean {
      return p5.dist(point.x, point.y, p5.mouseX, p5.mouseY) <= threshold;
    }
  },
};
