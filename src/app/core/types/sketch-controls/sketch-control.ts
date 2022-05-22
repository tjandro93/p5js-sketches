import { ButtonControl } from './button-control';
import { NumberInputControl } from './number-input-control';
import { SketchControlType } from './sketch-control-type';
import { SliderControl } from './slider-control';

export abstract class SketchControl {
  public abstract type: SketchControlType;
  private _id: string;

  constructor(id: string) {
    this._id = id;
  }

  get id(): string {
    return this._id;
  }

  public static isSliderControl(
    control: SketchControl
  ): control is SliderControl {
    return control.type === SketchControlType.Slider;
  }

  public static isNumberInputControl(
    control: SketchControl
  ): control is NumberInputControl {
    return control.type === SketchControlType.NumberInput;
  }

  public static isButtonControl(
    control: SketchControl
  ): control is ButtonControl {
    return control.type === SketchControlType.Button;
  }
}
