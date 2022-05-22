import { ThemePalette } from '@angular/material/core';
import { BehaviorSubject } from 'rxjs';
import { SketchControl } from './sketch-control';
import { SketchControlType } from './sketch-control-type';

export class ButtonControl extends SketchControl {
  public readonly type = SketchControlType.Button;

  public readonly label$: BehaviorSubject<string>;
  public readonly disabled$: BehaviorSubject<boolean>;
  public readonly color$: BehaviorSubject<ThemePalette | undefined>;

  public onPress: () => void = () => {};

  constructor(
    label: string,
    disabled = false,
    color: ThemePalette | undefined = 'primary'
  ) {
    super();
    this.label$ = new BehaviorSubject<string>(label);
    this.disabled$ = new BehaviorSubject<boolean>(disabled);
    this.color$ = new BehaviorSubject<ThemePalette | undefined>(color);
  }
}
