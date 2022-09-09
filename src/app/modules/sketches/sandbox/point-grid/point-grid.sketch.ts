import * as P5 from 'p5';
import { ButtonControl, Sketch, SliderControl } from 'src/app/core';
import { SelectControl } from 'src/app/core/types/sketch-controls/select-control';
import {
  circle,
  createCanvasOnParentContainer,
  DARK_MODE_BACKGROUND,
  DARK_MODE_FOREGROUND,
  DefaultPointGridPointFactory,
  PointGrid,
  PointGridOptionsByRowColCount,
  PointGridOptionsByRowColSize,
  PointGridPoint,
  Vector,
} from 'src/app/sketch-lib';

enum OptionTypes {
  ByCount = 'By Count',
  BySize = 'By Size',
}

const width = 800;
const height = 600;

const runPauseButton = new ButtonControl('Pause');
const drawOnceButton = new ButtonControl('Draw Once');
const minXSlider = new SliderControl('Min X', 0, width, 0, 1);
const maxXSlider = new SliderControl('Max X', 0, width, width, 1);
const minYSlider = new SliderControl('Min Y', 0, height, 0, 1);
const maxYSlider = new SliderControl('Max Y', 0, height, height, 1);
const optionsTypeSelect = new SelectControl(
  'Point Grid Type',
  [OptionTypes.ByCount, OptionTypes.BySize],
  OptionTypes.ByCount
);
const columnCountSlider = new SliderControl(
  'Column Count (for By Count)',
  2,
  100,
  10,
  1
);
const rowCountSlider = new SliderControl(
  'Row Count (for By Count)',
  2,
  100,
  10,
  1
);
const evenSpacingSelect = new SelectControl(
  'Even spacing (for By Count)',
  ['undefined', 'min', 'max'],
  'undefined'
);
const columnSizeSlider = new SliderControl(
  'Column Size (for By Size)',
  10,
  width,
  50,
  1
);
const rowSizeSlider = new SliderControl(
  'Row Size (for By Size)',
  10,
  height,
  50,
  1
);

let nearestGridPointToClicked: PointGridPoint | null = null;
let grid: PointGrid | null = null;

export const pointGrid: Sketch = {
  title: 'pointGrid',
  width,
  height,
  isSvg: false,
  controls: {
    refreshButton: true,
    downloadButton: true,
    customControls: [
      runPauseButton,
      drawOnceButton,
      minXSlider,
      maxXSlider,
      minYSlider,
      maxYSlider,
      optionsTypeSelect,
      columnCountSlider,
      rowCountSlider,
      evenSpacingSelect,
      columnSizeSlider,
      rowSizeSlider,
    ],
  },
  func: (p5: P5) => {
    let running = true;
    let frameCount = 0;

    p5.setup = () => {
      createCanvasOnParentContainer(p5, {
        width: pointGrid.width,
        height: pointGrid.height,
        useSvg: pointGrid.isSvg,
      });
      p5.background(DARK_MODE_BACKGROUND);
      p5.stroke(DARK_MODE_FOREGROUND);
      p5.noFill();

      drawOnceButton.onPress = () => {
        drawOnce();
      };

      runPauseButton.onPress = () => {
        running = !running;
        runPauseButton.label$.next(running ? 'Pause' : 'Run');
      };

      drawOnce();
    };

    p5.draw = () => {
      if (running) {
        drawOnce();
      }
    };

    p5.mousePressed = () => {
      const clickLocation = { x: p5.mouseX, y: p5.mouseY };
      if (grid != null) {
        const [point, distance] = grid.getNearestPointToVector(clickLocation);
        nearestGridPointToClicked = point;
        console.log(
          `Clicked location was distance ${distance} from grid point`
        );
      } else {
        nearestGridPointToClicked = null;
      }
    };

    function drawOnce(): void {
      p5.background(DARK_MODE_BACKGROUND);

      try {
        if (optionsTypeSelect.value === OptionTypes.ByCount) {
          grid = new PointGrid(p5, {
            bounds: {
              minX: minXSlider.value,
              maxX: maxXSlider.value,
              minY: minYSlider.value,
              maxY: maxYSlider.value,
            },
            columnCount: columnCountSlider.value,
            rowCount: rowCountSlider.value,
            evenSpacing:
              evenSpacingSelect.value === 'undefined'
                ? undefined
                : (evenSpacingSelect.value as 'min' | 'max'),
            pointGridPointFactory: new DefaultPointGridPointFactory(p5),
          } as PointGridOptionsByRowColCount);
        } else if (optionsTypeSelect.value === OptionTypes.BySize) {
          grid = new PointGrid(p5, {
            bounds: {
              minX: minXSlider.value,
              maxX: maxXSlider.value,
              minY: minYSlider.value,
              maxY: maxYSlider.value,
            },
            columnSize: columnSizeSlider.value,
            rowSize: rowSizeSlider.value,
            pointGridPointFactory: new DefaultPointGridPointFactory(p5),
          } as PointGridOptionsByRowColSize);
        }
      } catch (e) {
        console.error('Error thrown while draw PointGrid', e);
      }

      if (grid != null) {
        grid.draw();
      }

      if (nearestGridPointToClicked != null) {
        p5.push();
        p5.stroke(200, 0, 0, 255);
        p5.strokeWeight(3);
        circle(p5, nearestGridPointToClicked.position, 30);
        p5.pop();
      }

      frameCount++;
    }
  },
};
