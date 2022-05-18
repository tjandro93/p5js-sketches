import { SketchRoutes } from '../core';
import { SidenavPageComponent } from '../modules/shared/pages/sidenav-page/sidenav-page.component';
import { SKETCH_ROUTES } from './sketch.routes';

export const APP_ROUTES: SketchRoutes = [
  {
    path: '',
    component: SidenavPageComponent,
    children: SKETCH_ROUTES,
  },
];
