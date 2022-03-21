import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoutedSketchPageComponent } from './pages/routed-sketch-page/routed-sketch-page.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SidenavPageComponent } from './pages/sidenav-page/sidenav-page.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [RoutedSketchPageComponent, SidenavPageComponent],
  imports: [CommonModule, RouterModule, MatSidenavModule],
  exports: [RoutedSketchPageComponent, MatSidenavModule],
})
export class SharedModule {}
