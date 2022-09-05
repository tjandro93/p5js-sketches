import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RoutedSketchPageComponent } from '../../../shared/pages/routed-sketch-page/routed-sketch-page.component';
import { basicTreeSketch } from 'src/app/modules/sketches/misc/basic-tree/basic-tree.sketch';
import { SharedModule } from '../../../shared/shared.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forRoot([
      {
        path: '',
        component: RoutedSketchPageComponent,
        data: basicTreeSketch,
      },
    ]),
  ],
})
export class BasicTreeModule {}
