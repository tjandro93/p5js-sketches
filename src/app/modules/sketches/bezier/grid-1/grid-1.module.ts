import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RoutedSketchPageComponent } from 'src/app/modules/shared/pages/routed-sketch-page/routed-sketch-page.component';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { bezierGrid1 } from './bezier-grid-1.sketch';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forRoot([{
      path:'',
      component: RoutedSketchPageComponent,
      data: bezierGrid1
    }])
  ]
})
export class Grid1Module { }
