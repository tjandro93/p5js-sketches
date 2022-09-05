import { SketchRoutes } from '../core';
import { SidenavPageComponent } from '../modules/shared/pages/sidenav-page/sidenav-page.component';

export const APP_ROUTES: SketchRoutes = [
  {
    path: 'sketches',
    component: SidenavPageComponent,
    loadChildren: () =>
      import('../modules/sketches/sketches.module').then(
        (m) => m.SketchesModule
      ),
  },
];
