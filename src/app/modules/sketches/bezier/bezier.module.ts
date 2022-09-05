import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: 'fiddle',
        loadChildren: () =>
          import('./fiddle/fiddle.module').then(
            (m) => m.FiddleModule
          ),
      },
      {
        path: 'flow-1',
        loadChildren: () =>
          import('./flow-1/flow-1.module').then(
            (m) => m.Flow1Module
          ),
      },
      {
        path: 'flow-2-interactive',
        loadChildren: () =>
          import('./flow-2-interactive/flow-2-interactive.module').then(
            (m) => m.Flow2InteractiveModule
          ),
      },
      {
        path: 'flow-2-static',
        loadChildren: () =>
          import('./flow-2-static/flow-2-static.module').then(
            (m) => m.Flow2StaticModule
          ),
      },
      {
        path: 'grid-1',
        loadChildren: () =>
          import('./grid-1/grid-1.module').then(
            (m) => m.Grid1Module
          ),
      },
      {
        path: 'grid-2',
        loadChildren: () =>
          import('./grid-2/grid-2.module').then(
            (m) => m.Grid2Module
          ),
      },
      {
        path: 'grid-3-interactive',
        loadChildren: () =>
          import('./grid-3-interactive/grid-3-interactive.module').then(
            (m) => m.Grid3InteractiveModule
          ),
      },
      {
        path: 'grid-3-static',
        loadChildren: () =>
          import('./grid-3-static/grid-3-static.module').then(
            (m) => m.Grid3StaticModule
          ),
      },
    ]),
  ],
})
export class BezierModule {}
