import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: 'misc',
        loadChildren: () =>
          import('./misc/misc.module').then((m) => m.MiscModule),
      },
      {
        path: 'bezier',
        loadChildren: () =>
          import('./bezier/bezier.module').then((m) => m.BezierModule),
      },
      {
        path: 'hitomezachi-stitch',
        loadChildren: () =>
          import('./hitomezachi-stitch/hitomezachi-stitch.module').then(
            (m) => m.HitomezachiStitchModule
          ),
      },
      {
        path: 'flow-field',
        loadChildren: () =>
          import('./flow-field/flow-field.module').then(
            (m) => m.FlowFieldModule
          ),
      },
    ]),
  ],
})
export class SketchesModule {}
