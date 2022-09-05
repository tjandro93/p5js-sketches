import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: 'basic-tree',
        loadChildren: () =>
          import('./basic-tree/basic-tree.module').then(
            (m) => m.BasicTreeModule
          ),
      },
      {
        path: 'leaf',
        loadChildren: () =>
          import('./leaf/leaf.module').then((m) => m.LeafModule),
      },
      {
        path: 'random-diagonal-lines',
        loadChildren: () =>
          import(
            './random-diagonal-lines/random-diagonal-lines.module'
          ).then((m) => m.RandomDiagonalLinesModule),
      },
      {
        path: 'random-guassian-lines',
        loadChildren: () =>
          import(
            './random-guassian-lines/random-guassian-lines.module'
          ).then((m) => m.RandomGuassianLinesModule),
      },
      {
        path: 'random-lines',
        loadChildren: () =>
          import(
            './random-lines/random-lines.module'
          ).then((m) => m.RandomLinesModule),
      },
      
    ])
  ]
})
export class MiscModule { }
