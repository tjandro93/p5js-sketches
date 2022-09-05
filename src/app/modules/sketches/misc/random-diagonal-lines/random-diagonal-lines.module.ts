import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { randomDiagonalLines } from 'src/app/modules/sketches/misc/random-diagonal-lines/random-diagonal-lines.sketch';
import { RouterModule } from '@angular/router';
import { RoutedSketchPageComponent } from '../../../shared/pages/routed-sketch-page/routed-sketch-page.component';
import { SharedModule } from '../../../shared/shared.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forRoot([{
      path:'',
      component: RoutedSketchPageComponent,
      data: randomDiagonalLines
    }])
  ]
})
export class RandomDiagonalLinesModule { }
