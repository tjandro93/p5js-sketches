import * as P5 from 'p5';
import { Sketch } from 'src/app/core';
import {
  createCanvasOnParentContainer,
  DARK_MODE_BACKGROUND,
  DARK_MODE_FOREGROUND,
} from 'src/app/sketch-lib';

export const schematicTestStatic: Sketch = {
  title: 'schematicTestStatic',
  width: undefined,
  height: undefined,
  isSvg: false,
  controls: {
    refreshButton: true,
    downloadButton: true,
  },
  func: (p5: P5) => {
    p5.setup = () => {
      createCanvasOnParentContainer(p5, {
        width: schematicTestStatic.width,
        height: schematicTestStatic.height,
        useSvg: schematicTestStatic.isSvg,
      });
      p5.background(DARK_MODE_BACKGROUND);
      p5.stroke(DARK_MODE_FOREGROUND);

      p5.circle(p5.width / 2, p5.height / 2, 100);
    };
  },
};
