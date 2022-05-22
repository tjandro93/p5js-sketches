import { Route } from '@angular/router';
import { SketchRoutes } from './sketch-routes';
import { Sketch } from './sketch';

export interface SketchRoute extends Route {
  data?: Sketch;
  collectionTitle?: string;
  children?: SketchRoutes;
}
