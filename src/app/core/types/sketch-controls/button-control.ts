import { SketchControl } from './sketch-control';
import { SketchControlType } from './sketch-control-type';

export class ButtonControl extends SketchControl {
  public type = SketchControlType.Button;

  constructor(id: string) {
    super(id);
  }
}
