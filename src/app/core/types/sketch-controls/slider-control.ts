import { SketchControl } from './sketch-control';
import { SketchControlType } from './sketch-control-type';

export class SliderControl extends SketchControl {
  public type: SketchControlType.Slider;

  constructor(id: string, public min = 0, public max = 100) {
    super(id);
  }
}
