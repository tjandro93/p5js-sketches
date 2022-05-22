import { SketchControl } from './sketch-control';
import { SketchControlType } from './sketch-control-type';

export class NumberInputControl extends SketchControl {
  public type = SketchControlType.NumberInput;

  constructor(
    id: string,
    public min?: number,
    public max?: number,
    public step?: number
  ) {
    super(id);
  }
}
