import { Routes } from '@angular/router';

export const APP_ROUTES: Routes = [
  {
    path: 'basic-tree',
    loadChildren: () =>
      import('./modules/basic-tree/basic-tree.module').then(
        (m) => m.BasicTreeModule
      ),
  },
];
