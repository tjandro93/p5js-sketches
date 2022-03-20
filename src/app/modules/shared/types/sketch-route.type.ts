import { Route } from '@angular/router';
import { SketchRouteData } from './sketch-route-data.type';
import { SketchRoutes } from './sketch-routes.type';

export interface SketchRoute extends Route {
  data: SketchRouteData;
  children?: SketchRoutes;
}
