import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: 'flow-field-1',
        loadChildren: () =>
          import('./flow-field-1/flow-field-1.module').then(
            (m) => m.FlowField1Module
          ),
      },
      {
        path: 'flow-field-1-interactive',
        loadChildren: () =>
          import(
            './flow-field-1-interactive/flow-field-1-interactive.module'
          ).then((m) => m.FlowField1InteractiveModule),
      },
    ]),
  ],
})
export class FlowFieldModule {}
