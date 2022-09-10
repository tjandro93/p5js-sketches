import { BehaviorSubject } from 'rxjs';
import { SketchControl } from './sketch-control';
import { SketchControlType } from './sketch-control-type';

export class SelectControl<T = string> extends SketchControl {
  public readonly type = SketchControlType.Select;

  public readonly label$: BehaviorSubject<string>;
  public readonly options$: BehaviorSubject<T[]>;
  public readonly value$: BehaviorSubject<T>;

  constructor(label: string, options: T[], value: T) {
    super();
    this.label$ = new BehaviorSubject<string>(label);
    this.options$ = new BehaviorSubject<T[]>(options);
    this.value$ = new BehaviorSubject<T>(value);
  }

  get value(): T {
    return this.value$.value;
  }
}
