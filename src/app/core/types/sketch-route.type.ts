import { Route } from '@angular/router';
import { SketchRoutes } from './sketch-routes.type';
import { Sketch } from './sketch.type';

export interface SketchRoute extends Route {
  data: Sketch;
  children?: SketchRoutes;
}
