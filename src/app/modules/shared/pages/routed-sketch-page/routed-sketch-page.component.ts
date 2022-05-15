import {
  ChangeDetectorRef,
  Component,
  HostBinding,
  Inject,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BaseSketchDirective } from '../../directives/base-sketch.directive';
import { ActivatedSketchRoute } from '../../../../core/types/activated-sketch-route.type';
import { saveSvg } from 'src/app/core/functions/save-svg';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-routed-sketch-page',
  templateUrl: './routed-sketch-page.component.html',
  styleUrls: ['./routed-sketch-page.component.scss'],
})
export class RoutedSketchPageComponent extends BaseSketchDirective {
  public static readonly CANVAS_PARENT_CONTAINER_ID = 'p5js-parent';

  public readonly DEFAULT_CANVAS_WIDTH = '80%';
  public readonly DEFAULT_CANVAS_HEIGHT = '80%';

  @HostBinding('style.grid-template-columns')
  get gridTemplateColumns() {
    return `1fr ${
      this.route.snapshot.data.width ? 'auto' : this.DEFAULT_CANVAS_WIDTH
    } 1fr`;
  }

  @HostBinding('style.grid-template-rows')
  get gridTemplateRows() {
    return `1fr ${
      this.route.snapshot.data.height ? 'auto' : this.DEFAULT_CANVAS_HEIGHT
    } 1fr`;
  }

  constructor(
    @Inject(ActivatedRoute) public route: ActivatedSketchRoute,
    cdRef: ChangeDetectorRef
  ) {
    super(route.data, cdRef);
  }

  public downloadSvg(): void {
    this.sketch$.pipe(take(1)).subscribe((sketch) => saveSvg(sketch.title));
  }
}
