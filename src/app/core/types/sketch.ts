import * as P5 from 'p5';
import { SketchControlsConfig } from './sketch-controls/sketch-controls-config';

export interface Sketch {
  title: string;
  description?: string;
  controls?: SketchControlsConfig;
  // TODO consolidate this and `useSvg` param sent into sketch-lib call to create canvas
  // maybe `Sketch` should move into sketch-lib? Unfortunately SkectchControls know a bit about angular so maybe that won't work?
  isSvg?: boolean;
  width?: number;
  height?: number;
  func: (p5: P5) => void;
}
