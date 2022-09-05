import { Routes } from '@angular/router';
import { SidenavPageComponent } from './modules/shared/pages/sidenav-page/sidenav-page.component';

export const APP_ROUTES: Routes = [
  {
    path: '',
    component: SidenavPageComponent,
  },
  {
    path: 'sketches',
    component: SidenavPageComponent,
    loadChildren: () =>
      import('./modules/sketches/sketches.module').then(
        (m) => m.SketchesModule
      ),
  },
];
