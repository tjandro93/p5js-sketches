import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: 'hito-1',
        loadChildren: () =>
          import('./hito1/hito1.module').then(
            (m) => m.Hito1Module
          ),
      },
      {
        path: 'hito-2',
        loadChildren: () =>
          import('./hito2/hito2.module').then(
            (m) => m.Hito2Module
          ),
      },
      {
        path: 'hito-3',
        loadChildren: () =>
          import('./hito3/hito3.module').then(
            (m) => m.Hito3Module
          ),
      },
      {
        path: 'hito-4',
        loadChildren: () =>
          import('./hito4/hito4.module').then(
            (m) => m.Hito4Module
          ),
      },
    ]),
  ],
})
export class HitomezachiStitchModule { }
