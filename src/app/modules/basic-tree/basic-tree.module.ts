import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasicTreeComponent } from './basic-tree.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [BasicTreeComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: BasicTreeComponent,
      },
    ]),
  ],
})
export class BasicTreeModule {}
