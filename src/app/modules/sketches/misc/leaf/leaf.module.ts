import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../shared/shared.module';
import { RouterModule } from '@angular/router';
import { RoutedSketchPageComponent } from '../../../shared/pages/routed-sketch-page/routed-sketch-page.component';
import { leaf } from './leaf.sketch';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forRoot([
      {
        path: '',
        component: RoutedSketchPageComponent,
        data: leaf,
      },
    ]),
  ],
})
export class LeafModule {}
