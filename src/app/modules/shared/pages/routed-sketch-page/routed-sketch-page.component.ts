import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  Inject,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BaseSketchDirective } from '../../directives/base-sketch.directive';
import { saveSvg, saveCanvasPng, Sketch } from '../../../../core';
import { map, take } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-routed-sketch-page',
  templateUrl: './routed-sketch-page.component.html',
  styleUrls: ['./routed-sketch-page.component.scss'],
})
export class RoutedSketchPageComponent extends BaseSketchDirective {
  public static readonly CANVAS_PARENT_CONTAINER_ID = 'p5js-parent';

  public readonly DEFAULT_CANVAS_WIDTH = '80%';
  public readonly DEFAULT_CANVAS_HEIGHT = '80%';

  private readonly actionDrawerButtonRightPosition =
    new BehaviorSubject<number>(0);

  public actionDrawerButtonRightPosition$ =
    this.actionDrawerButtonRightPosition.asObservable();

  public showActionDrawerButton$ = this.sketch$.pipe(
    map(
      (sketch) =>
        sketch.controls?.refreshButton ||
        sketch.controls?.downloadButton ||
        sketch.controls?.customControls
    )
  );

  @ViewChild('actionDrawer', { read: ElementRef })
  public actionDrawerElement?: ElementRef;

  constructor(
    @Inject(ActivatedRoute) public route: ActivatedRoute,
    cdRef: ChangeDetectorRef
  ) {
    super(
      // Unfortunately Angular's route.data can't be type safe. I used to
      // have a subclass of ActivatedRoute for Sketches that added safety but even it was
      // just syntactic sugar.
      // Really we should manually checking type here, but it's observable so we can't yet
      route.data as Observable<Sketch>,
      cdRef
    );
  }

  public download(): void {
    this.sketch$.pipe(take(1)).subscribe((sketch) => {
      if (sketch.isSvg) {
        saveSvg(sketch.title);
      } else {
        saveCanvasPng(sketch.title);
      }
    });
  }

  public drawerOpenedChange(opened: boolean): void {
    this.actionDrawerButtonRightPosition.next(
      opened ? this.actionDrawerElement?.nativeElement?.clientWidth ?? 0 : 0
    );
  }

  get frameRate(): number | undefined {
    return this.p?.frameRate();
  }
}
