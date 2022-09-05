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
          import(
            './misc/misc.module'
          ).then((m) => m.MiscModule),
      },
      {
        path: 'bezier',
        loadChildren: () =>
          import(
            './bezier/bezier.module'
          ).then((m) => m.BezierModule),
      },
    ])
  ]
})
export class SketchesModule { }
