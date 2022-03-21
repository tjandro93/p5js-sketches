import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ActivatedSketchRouteSnapshot } from './activated-sketch-route-snapshot.type';
import { Sketch } from './sketch.type';

export class ActivatedSketchRoute extends ActivatedRoute {
  public data: Observable<Sketch>;
  public snapshot: ActivatedSketchRouteSnapshot;
}
