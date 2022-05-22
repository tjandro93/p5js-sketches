import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  Inject,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BaseSketchDirective } from '../../directives/base-sketch.directive';
import { saveSvg, ActivatedSketchRoute } from '../../../../core';
import { map, take } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

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
    @Inject(ActivatedRoute) public route: ActivatedSketchRoute,
    cdRef: ChangeDetectorRef
  ) {
    super(route.data, cdRef);
  }

  public downloadSvg(): void {
    this.sketch$.pipe(take(1)).subscribe((sketch) => saveSvg(sketch.title));
  }

  public drawerOpenedChange(opened: boolean): void {
    this.actionDrawerButtonRightPosition.next(
      opened ? this.actionDrawerElement?.nativeElement?.clientWidth ?? 0 : 0
    );
  }
}
