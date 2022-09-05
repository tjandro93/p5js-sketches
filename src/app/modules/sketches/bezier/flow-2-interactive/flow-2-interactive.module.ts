import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RoutedSketchPageComponent } from 'src/app/modules/shared/pages/routed-sketch-page/routed-sketch-page.component';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { bezierFlow2Interactive } from './bezier-flow-2-interactive.sketch';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forRoot([
      {
        path: '',
        component: RoutedSketchPageComponent,
        data: bezierFlow2Interactive,
      },
    ]),
  ],
})
export class Flow2InteractiveModule {}
