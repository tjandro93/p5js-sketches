import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoutedSketchComponent } from './components/routed-sketch/routed-sketch.component';
import { MatSidenavModule } from '@angular/material/sidenav';

@NgModule({
  declarations: [RoutedSketchComponent],
  imports: [CommonModule, MatSidenavModule],
  exports: [RoutedSketchComponent, MatSidenavModule],
})
export class SharedModule {}
