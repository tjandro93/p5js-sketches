import { SketchControl } from './sketch-control';

export interface SketchControlsConfig {
  refreshButton?: boolean;
  downloadButton?: boolean;
  customControls?: SketchControl[];
}
