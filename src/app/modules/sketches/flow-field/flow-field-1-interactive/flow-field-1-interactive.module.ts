import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { flowField1Interactive } from './flow-field-1-interactive.sketch';
import { RouterModule } from '@angular/router';
import { RoutedSketchPageComponent } from 'src/app/modules/shared/pages/routed-sketch-page/routed-sketch-page.component';
import { SharedModule } from 'src/app/modules/shared/shared.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: RoutedSketchPageComponent,
        data: flowField1Interactive,
      },
    ]),
  ],
})
export class FlowField1InteractiveModule {}
