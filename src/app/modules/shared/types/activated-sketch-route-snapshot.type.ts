import { ActivatedRouteSnapshot } from '@angular/router';
import { SketchRouteData } from './sketch-route-data.type';

export class ActivatedSketchRouteSnapshot extends ActivatedRouteSnapshot {
  data: SketchRouteData;
}
