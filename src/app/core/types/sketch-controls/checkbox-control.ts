import { BehaviorSubject } from 'rxjs';
import { SketchControl } from './sketch-control';
import { SketchControlType } from './sketch-control-type';

export class CheckboxControl extends SketchControl {
  public readonly type = SketchControlType.Checkbox;

  public readonly label$: BehaviorSubject<string>;
  public readonly value$: BehaviorSubject<boolean>;

  constructor(label: string, value: boolean) {
    super();
    this.label$ = new BehaviorSubject<string>(label);
    this.value$ = new BehaviorSubject<boolean>(value);
  }

  get value(): boolean {
    return this.value$.value;
  }
}
