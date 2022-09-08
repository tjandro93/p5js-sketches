import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { RoutedSketchPageComponent } from 'src/app/modules/shared/pages/routed-sketch-page/routed-sketch-page.component';
import { SharedModule } from 'src/app/modules/shared/shared.module';

import { pointGrid } from 'src/app/modules/sketches/sandbox/point-grid/point-grid.sketch';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forRoot([
      {
        path: '',
        component: RoutedSketchPageComponent,
        data: pointGrid,
      },
    ]),
  ],
})
export class PointGridModule {}
