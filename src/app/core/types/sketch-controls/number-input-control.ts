import { SketchControl } from './sketch-control';
import { SketchControlType } from './sketch-control-type';

export class NumberInputControl extends SketchControl {
  public readonly type = SketchControlType.NumberInput;

  constructor(public min?: number, public max?: number, public step?: number) {
    super();
  }
}
