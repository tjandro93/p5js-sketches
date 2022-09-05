import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RoutedSketchPageComponent } from 'src/app/modules/shared/pages/routed-sketch-page/routed-sketch-page.component';
import { hito2 } from './hito2.sketch';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: RoutedSketchPageComponent,
        data: hito2,
      },
    ]),
  ]
})
export class Hito2Module { }
