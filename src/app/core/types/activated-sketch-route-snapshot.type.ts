import { ActivatedRouteSnapshot } from '@angular/router';
import { Sketch } from './sketch.type';

export class ActivatedSketchRouteSnapshot extends ActivatedRouteSnapshot {
  data: Sketch;
}
