import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RoutedSketchPageComponent } from '../../../shared/pages/routed-sketch-page/routed-sketch-page.component';
import { SharedModule } from '../../../shared/shared.module';
import { randomLines } from './random-lines.sketch';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forRoot([
      {
        path: '',
        component: RoutedSketchPageComponent,
        data: randomLines,
      },
    ]),
  ],
})
export class RandomLinesModule {}
