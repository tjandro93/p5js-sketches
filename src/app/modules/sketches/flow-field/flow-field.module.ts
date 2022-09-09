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
      {
        path: 'plotter-1',
        loadChildren: () =>
          import('./plotter-1/plotter-1.module').then((m) => m.Plotter1Module),
      },
      {
        path: 'flow-field-2',
        loadChildren: () =>
          import('./flow-field-2/flow-field-2.module').then(
            (m) => m.FlowField2Module
          ),
      },
    ]),
  ],
})
export class FlowFieldModule {}
