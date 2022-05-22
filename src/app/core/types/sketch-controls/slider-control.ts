import { BehaviorSubject } from 'rxjs';
import { SketchControl } from './sketch-control';
import { SketchControlType } from './sketch-control-type';

export class SliderControl extends SketchControl {
  public readonly type = SketchControlType.Slider;

  public readonly label$: BehaviorSubject<string>;
  public readonly min$: BehaviorSubject<number>;
  public readonly max$: BehaviorSubject<number>;
  public readonly value$: BehaviorSubject<number>;
  public readonly step$: BehaviorSubject<number | undefined>;

  constructor(label: string, min = 0, max = 100, value = 50, step?: number) {
    super();

    this.label$ = new BehaviorSubject<string>(label);
    this.min$ = new BehaviorSubject<number>(min);
    this.max$ = new BehaviorSubject<number>(max);
    this.value$ = new BehaviorSubject<number>(value);
    this.step$ = new BehaviorSubject<number | undefined>(step);
  }

  get value(): number {
    return this.value$.value;
  }
}
