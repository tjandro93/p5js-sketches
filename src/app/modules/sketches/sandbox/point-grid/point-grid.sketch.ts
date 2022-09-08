import * as P5 from 'p5';
import { ButtonControl, Sketch, SliderControl } from 'src/app/core';
import { SelectControl } from 'src/app/core/types/sketch-controls/select-control';
import {
  createCanvasOnParentContainer,
  DARK_MODE_BACKGROUND,
  DARK_MODE_FOREGROUND,
  PointGrid,
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

    function drawOnce(): void {
      p5.background(DARK_MODE_BACKGROUND);

      try {
        if (optionsTypeSelect.value === OptionTypes.ByCount) {
          const grid = new PointGrid({
            minX: minXSlider.value,
            maxX: maxXSlider.value,
            minY: minYSlider.value,
            maxY: maxYSlider.value,
            columnCount: columnCountSlider.value,
            rowCount: rowCountSlider.value,
            evenSpacing:
              evenSpacingSelect.value === 'undefined'
                ? undefined
                : (evenSpacingSelect.value as 'min' | 'max'),
          });

          grid.draw(p5);
        } else if (optionsTypeSelect.value === OptionTypes.BySize) {
          const grid = new PointGrid({
            minX: minXSlider.value,
            maxX: maxXSlider.value,
            minY: minYSlider.value,
            maxY: maxYSlider.value,
            columnSize: columnSizeSlider.value,
            rowSize: rowSizeSlider.value,
          });

          grid.draw(p5);
        }
      } catch (e) {
        console.error('Error thrown while draw PointGrid', e);
      }

      frameCount++;
    }
  },
};
