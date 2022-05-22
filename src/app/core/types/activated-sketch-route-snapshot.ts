import { ActivatedRouteSnapshot } from '@angular/router';
import { Sketch } from './sketch';

export class ActivatedSketchRouteSnapshot extends ActivatedRouteSnapshot {
  public data: Sketch;
}
