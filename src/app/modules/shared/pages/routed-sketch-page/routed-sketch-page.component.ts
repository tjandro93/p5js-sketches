import { ChangeDetectorRef, Component, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BaseSketchDirective } from '../../directives/base-sketch.directive';
import { ActivatedSketchRoute } from '../../../../core/types/activated-sketch-route.type';

@Component({
  selector: 'app-routed-sketch-page',
  templateUrl: './routed-sketch-page.component.html',
  styleUrls: ['./routed-sketch-page.component.scss'],
})
export class RoutedSketchPageComponent extends BaseSketchDirective {
  public static readonly CANVAS_PARENT_CONTAINER_ID = 'p5js-parent';

  constructor(
    @Inject(ActivatedRoute) route: ActivatedSketchRoute,
    cdRef: ChangeDetectorRef
  ) {
    super(route.data, cdRef);
  }
}
