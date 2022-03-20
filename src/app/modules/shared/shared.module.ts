import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoutedSketchComponent } from './components/routed-sketch/routed-sketch.component';

@NgModule({
  declarations: [RoutedSketchComponent],
  imports: [CommonModule],
  exports: [RoutedSketchComponent],
})
export class SharedModule {}
