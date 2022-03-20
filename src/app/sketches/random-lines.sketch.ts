import * as p5 from 'p5';
import { Sketch } from '../core/types/sketch.type';

export const randomLines: Sketch = {
  title: 'Random Lines',
  func: (p: p5) => {
    const MAX_WIDTH = p.windowWidth - 5;
    const MIN_WIDTH = 0;

    const MAX_HEIGHT = p.windowHeight - 5;
    const MIN_HEIGHT = 0;

    const INITIAL_X = MAX_WIDTH / 2;
    const INITIAL_Y = MAX_HEIGHT / 2;

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
      p.frameRate(15);
      p.createCanvas(MAX_WIDTH, MAX_HEIGHT);

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

      randomMinDiv = p.createDiv('Random Min: ' + 0);
      randomMinDiv.style('font-size', '12px');
      randomMinDiv.position(10, 100);
      randomMinSlider = p.createSlider(-100, 100, -20, 0.1);
      randomMinSlider.position(10, 115);
      randomMinSlider.style('width', '200px');

      randomMaxDiv = p.createDiv('Random Max: ' + 20);
      randomMaxDiv.style('font-size', '12px');
      randomMaxDiv.position(10, 135);
      randomMaxSlider = p.createSlider(-100, 100, 20, 1);
      randomMaxSlider.position(10, 150);
      randomMaxSlider.style('width', '200px');
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
        let currentX = INITIAL_X;
        let currentY = INITIAL_Y;

        for (let j = 0; j < segmentSlider.value(); j++) {
          const nextX = p.constrain(
            currentX +
              p.random(
                randomMinSlider.value() as number,
                randomMaxSlider.value() as number
              ),
            MIN_WIDTH,
            MAX_WIDTH
          );
          const nextY = p.constrain(
            currentY +
              p.random(
                randomMinSlider.value() as number,
                randomMaxSlider.value() as number
              ),
            MIN_HEIGHT,
            MAX_HEIGHT
          );

          p.line(currentX, currentY, nextX, nextY);

          currentX = nextX;
          currentY = nextY;
        }
      }
    }
  },
};
