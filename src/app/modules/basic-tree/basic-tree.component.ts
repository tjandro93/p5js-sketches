import { Component, OnInit } from '@angular/core';
import { BaseSketchDirective } from '../shared/directives/base-sketch.directive';
import { basicTreeSketch } from './basic-tree.sketch';

@Component({
  selector: 'app-basic-tree',
  templateUrl: './basic-tree.component.html',
  styleUrls: ['./basic-tree.component.scss'],
})
export class BasicTreeComponent extends BaseSketchDirective {
  constructor() {
    super(basicTreeSketch);
  }
}
