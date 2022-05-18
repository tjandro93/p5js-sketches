import * as p5 from 'p5';
import { Sketch } from '../core/types/sketch.type';
import {
  addElementToActionDrawer,
  createCanvasOnParentContainer,
} from '../sketch-lib';

export const randomLines: Sketch = {
  title: 'Random Lines',
  hasCustomControls: true,
  func: (p: p5) => {
    let running = true;

    let segmentSlider: p5.Element;
    let segmentDiv: p5.Element;

    let lineSlider: p5.Element;
    let lineDiv: p5.Element;

    let randomMinSlider: p5.Element;
    let randomMinDiv: p5.Element;

    let randomMaxSlider: p5.Element;
    let randomMaxDiv: p5.Element;

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

      randomMinDiv = p.createDiv('Random Min: ' + 0);
      addElementToActionDrawer(randomMinDiv);

      randomMinSlider = p.createSlider(-100, 100, -20, 0.1);
      addElementToActionDrawer(randomMinSlider);

      randomMaxDiv = p.createDiv('Random Max: ' + 20);
      addElementToActionDrawer(randomMaxDiv);

      randomMaxSlider = p.createSlider(-100, 100, 20, 1);
      addElementToActionDrawer(randomMaxSlider);
    };

    p.draw = () => {
      segmentDiv.elt.innerHTML = 'Segments: ' + segmentSlider.value();
      lineDiv.elt.innerHTML = 'Lines: ' + lineSlider.value();
      randomMinDiv.elt.innerHTML = 'Random Min: ' + randomMinSlider.value();
      randomMaxDiv.elt.innerHTML = 'Random Max: ' + randomMaxSlider.value();

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
              p.random(
                randomMinSlider.value() as number,
                randomMaxSlider.value() as number
              ),
            0,
            p.width
          );
          const nextY = p.constrain(
            currentY +
              p.random(
                randomMinSlider.value() as number,
                randomMaxSlider.value() as number
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
