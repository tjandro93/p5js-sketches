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

@NgModule({
  declarations: [
    RoutedSketchPageComponent,
    SidenavPageComponent,
    SidenavLinkGroupComponent,
    SidenavLinkComponent,
    SidenavLinkListComponent,
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
  ],
  exports: [
    // Angular Material
    MatSidenavModule,
    MatListModule,
    MatDividerModule,
    MatButtonModule,
    MatIconModule,
    // App
    RoutedSketchPageComponent,
  ],
})
export class SharedModule {}
