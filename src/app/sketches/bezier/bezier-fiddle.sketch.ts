import { Sketch } from '../../core/types/sketch.type';
import * as P5 from 'p5';
import {
  addElementToActionDrawer,
  createCanvasOnParentContainer,
  Vector,
  BezierCurve,
} from '../../sketch-lib';

export const bezierFiddle: Sketch = {
  title: 'Bezier fiddle',
  hasCustomControls: true,
  func: (p5: P5) => {
    const curves: BezierCurve[] = [];
    let draggedPoint: Vector | undefined;

    p5.setup = () => {
      createCanvasOnParentContainer(p5);

      p5.background(255);
      p5.stroke(0);
      p5.strokeWeight(2);
      p5.noFill();

      const newCurveButton = p5.createButton('Add new curve');
      addElementToActionDrawer(newCurveButton);
      newCurveButton.mousePressed(() => {
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
      });

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
      p5.background(255);
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
