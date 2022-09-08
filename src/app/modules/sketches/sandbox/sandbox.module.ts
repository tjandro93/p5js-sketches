import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: 'point-grid',
        loadChildren: () =>
          import('./point-grid/point-grid.module').then(
            (m) => m.PointGridModule
          ),
      },
    ]),
  ],
})
export class SandboxModule {}
