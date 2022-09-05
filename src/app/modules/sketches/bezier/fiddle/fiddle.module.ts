import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { bezierFiddle } from './bezier-fiddle.sketch';
import { RouterModule } from '@angular/router';
import { RoutedSketchPageComponent } from 'src/app/modules/shared/pages/routed-sketch-page/routed-sketch-page.component';
import { SharedModule } from 'src/app/modules/shared/shared.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forRoot([
      {
        path: '',
        component: RoutedSketchPageComponent,
        data: bezierFiddle,
      },
    ]),
  ],
})
export class FiddleModule {}
