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

// Duck type an object to see if it's a Sketch. This is useful since sketches go as part of a the route data
// but route data is not type safe.
// This function only duck types the required properties for a sketch
export function isSketch(obj: any): obj is Sketch {
  return (
    typeof obj === 'object' &&
    typeof obj.title === 'string' &&
    typeof obj.func === 'function'
  );
}
