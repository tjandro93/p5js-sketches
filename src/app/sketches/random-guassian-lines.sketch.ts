import { Sketch } from '../core/types/sketch.type';
import * as p5 from 'p5';
import { createCanvasOnParentContainer } from '../sketch-lib/functions/create-canvas-on-parent-container';

// TODO sliders are broken. How are p5 inputs going to work in angular? should they become angular controls?
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
      stepButton.position(175, 5);
      stepButton.mousePressed(() => {
        drawOnce();
      });

      const runButton = p.createButton('Run / Pause');
      runButton.position(75, 5);
      runButton.mousePressed(() => {
        running = !running;
      });

      segmentDiv = p.createDiv('Segments: ' + 100);
      segmentDiv.style('font-size', '12px');
      segmentDiv.position(10, 30);
      segmentSlider = p.createSlider(1, 500, 100, 1);
      segmentSlider.position(10, 45);
      segmentSlider.style('width', '200px');

      lineDiv = p.createDiv('Lines: ' + 50);
      lineDiv.style('font-size', '12px');
      lineDiv.position(10, 65);
      lineSlider = p.createSlider(1, 500, 50, 1);
      lineSlider.position(10, 80);
      lineSlider.style('width', '200px');

      gausMeanDiv = p.createDiv('Gaus Mean: ' + 0);
      gausMeanDiv.style('font-size', '12px');
      gausMeanDiv.position(10, 100);
      gausMeanSlider = p.createSlider(-100, 100, 0, 0.1);
      gausMeanSlider.position(10, 115);
      gausMeanSlider.style('width', '200px');

      gausSdDiv = p.createDiv('Gaus SD: ' + 20);
      gausSdDiv.style('font-size', '12px');
      gausSdDiv.position(10, 135);
      gausSdSlider = p.createSlider(-100, 100, 20, 1);
      gausSdSlider.position(10, 150);
      gausSdSlider.style('width', '200px');
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
