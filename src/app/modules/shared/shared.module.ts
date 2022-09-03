import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoutedSketchPageComponent } from './pages/routed-sketch-page/routed-sketch-page.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SidenavPageComponent } from './pages/sidenav-page/sidenav-page.component';
import { RouterModule } from '@angular/router';
import { SidenavLinkGroupComponent } from './pages/sidenav-page/components/sidenav-link-group/sidenav-link-group.component';
import { SidenavLinkComponent } from './pages/sidenav-page/components/sidenav-link/sidenav-link.component';
import { SidenavLinkListComponent } from './pages/sidenav-page/components/sidenav-link-list/sidenav-link-list.component';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSliderModule } from '@angular/material/slider';
import { SketchControlsComponent } from './components/sketch-controls/sketch-controls.component';
import { MatCheckboxModule } from '@angular/material/checkbox';

@NgModule({
  declarations: [
    RoutedSketchPageComponent,
    SidenavPageComponent,
    SidenavLinkGroupComponent,
    SidenavLinkComponent,
    SidenavLinkListComponent,
    SketchControlsComponent,
  ],
  imports: [
    // Angular
    CommonModule,
    RouterModule,
    // Angular Material
    MatSidenavModule,
    MatListModule,
    MatDividerModule,
    MatButtonModule,
    MatIconModule,
    MatSliderModule,
    MatCheckboxModule,
  ],
  exports: [
    // Angular Material
    MatSidenavModule,
    MatListModule,
    MatDividerModule,
    MatButtonModule,
    MatIconModule,
    MatSliderModule,
    MatCheckboxModule,
    // App
    RoutedSketchPageComponent,
  ],
})
export class SharedModule {}
