import * as P5 from 'p5';
import { SketchControlsConfig } from './sketch-controls/sketch-controls-config';

export interface Sketch {
  title: string;
  description?: string;
  controls?: SketchControlsConfig;
  isSvg?: boolean;
  width?: number;
  height?: number;
  func: (p5: P5) => void;
}
