import { BehaviorSubject } from 'rxjs';
import { SketchControl } from './sketch-control';
import { SketchControlType } from './sketch-control-type';

export class SelectControl extends SketchControl {
  public readonly type = SketchControlType.Select;

  public readonly label$: BehaviorSubject<string>;
  public readonly options$: BehaviorSubject<string[]>;
  public readonly value$: BehaviorSubject<string>;

  constructor(label: string, options: string[], value: string) {
    super();
    this.label$ = new BehaviorSubject<string>(label);
    this.options$ = new BehaviorSubject<string[]>(options);
    this.value$ = new BehaviorSubject<string>(value);
  }

  get value(): string {
    return this.value$.value;
  }
}
