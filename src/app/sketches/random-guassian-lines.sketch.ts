import { Sketch } from '../core/types/sketch.type';
import * as p5 from 'p5';
import {
  createCanvasOnParentContainer,
  addElementToActionDrawer,
} from '../sketch-lib';

export const randomGuassianLines: Sketch = {
  title: 'Random Guassian Lines',
  func: (p: p5) => {
    let running = true;

    let segmentSlider: p5.Element;
    let segmentDiv: p5.Element;

    let lineSlider: p5.Element;
    let lineDiv: p5.Element;

    let gausMeanSlider: p5.Element;
    let gausMeanDiv: p5.Element;

    let gausSdSlider: p5.Element;
    let gausSdDiv: p5.Element;

    p.setup = () => {
      createCanvasOnParentContainer(p);

      p.frameRate(15);

      const stepButton = p.createButton('Draw once');
      addElementToActionDrawer(stepButton);
      stepButton.mousePressed(() => {
        drawOnce();
      });

      const runButton = p.createButton('Run / Pause');
      addElementToActionDrawer(runButton);
      runButton.mousePressed(() => {
        running = !running;
      });

      segmentDiv = p.createDiv('Segments: ' + 100);
      addElementToActionDrawer(segmentDiv);

      segmentSlider = p.createSlider(1, 500, 100, 1);
      addElementToActionDrawer(segmentSlider);

      lineDiv = p.createDiv('Lines: ' + 50);
      addElementToActionDrawer(lineDiv);

      lineSlider = p.createSlider(1, 500, 50, 1);
      addElementToActionDrawer(lineSlider);

      gausMeanDiv = p.createDiv('Gaus Mean: ' + 0);
      addElementToActionDrawer(gausMeanDiv);

      gausMeanSlider = p.createSlider(-100, 100, 0, 0.1);
      addElementToActionDrawer(gausMeanSlider);

      gausSdDiv = p.createDiv('Gaus SD: ' + 20);
      addElementToActionDrawer(gausSdDiv);

      gausSdSlider = p.createSlider(-100, 100, 20, 1);
      addElementToActionDrawer(gausSdSlider);
    };

    p.draw = () => {
      segmentDiv.elt.innerHTML = 'Segments: ' + segmentSlider.value();
      lineDiv.elt.innerHTML = 'Lines: ' + lineSlider.value();
      gausMeanDiv.elt.innerHTML = 'Gaus Mean: ' + gausMeanSlider.value();
      gausSdDiv.elt.innerHTML = 'Gaus SD: ' + gausSdSlider.value();

      if (running) {
        drawOnce();
      }
    };

    function drawOnce(): void {
      p.background('white');

      for (let i = 0; i < lineSlider.value(); i++) {
        let currentX = p.width / 2;
        let currentY = p.height / 2;

        for (let j = 0; j < segmentSlider.value(); j++) {
          const nextX = p.constrain(
            currentX +
              p.randomGaussian(
                gausMeanSlider.value() as number,
                gausSdSlider.value() as number
              ),
            0,
            p.width
          );
          const nextY = p.constrain(
            currentY +
              p.randomGaussian(
                gausMeanSlider.value() as number,
                gausSdSlider.value() as number
              ),
            0,
            p.height
          );

          p.line(currentX, currentY, nextX, nextY);

          currentX = nextX;
          currentY = nextY;
        }
      }
    }
  },
};
