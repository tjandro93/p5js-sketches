import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { RoutedSketchPageComponent } from 'src/app/modules/shared/pages/routed-sketch-page/routed-sketch-page.component';
import { SharedModule } from 'src/app/modules/shared/shared.module';

import { flowField2 } from 'src/app/modules/sketches/flow-field/flow-field-2/flow-field-2.sketch';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forRoot([
      {
        path: '',
        component: RoutedSketchPageComponent,
        data: flowField2,
      },
    ]),
  ],
})
export class FlowField2Module {}
