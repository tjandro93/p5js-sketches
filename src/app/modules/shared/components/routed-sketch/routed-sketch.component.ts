import { Component, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BaseSketchDirective } from '../../directives/base-sketch.directive';
import { ActivatedSketchRoute } from '../../../../core/types/activated-sketch-route.type';

@Component({
  selector: 'app-routed-sketch',
  templateUrl: './routed-sketch.component.html',
  styleUrls: ['./routed-sketch.component.scss'],
})
export class RoutedSketchComponent extends BaseSketchDirective {

  constructor(@Inject(ActivatedRoute) route: ActivatedSketchRoute) {
    super(route.snapshot.data.sketch);
  }
}
