import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ActivatedSketchRouteSnapshot } from './activated-sketch-route-snapshot.type';
import { SketchRouteData } from './sketch-route-data.type';

export class ActivatedSketchRoute extends ActivatedRoute {
  data: Observable<SketchRouteData>;
  snapshot: ActivatedSketchRouteSnapshot;
}
