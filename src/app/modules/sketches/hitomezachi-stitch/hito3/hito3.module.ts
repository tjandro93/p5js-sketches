import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { hito3 } from './hito3.sketch';
import { RouterModule } from '@angular/router';
import { RoutedSketchPageComponent } from 'src/app/modules/shared/pages/routed-sketch-page/routed-sketch-page.component';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: RoutedSketchPageComponent,
        data: hito3,
      },
    ]),
  ]
})
export class Hito3Module { }
