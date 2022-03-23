import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoutedSketchPageComponent } from './pages/routed-sketch-page/routed-sketch-page.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SidenavPageComponent } from './pages/sidenav-page/sidenav-page.component';
import { RouterModule } from '@angular/router';
import { SidenavLinkGroupComponent } from './components/sidenav-link-group/sidenav-link-group.component';
import { SidenavLinkComponent } from './components/sidenav-link/sidenav-link.component';
import { SidenavLinkListComponent } from './components/sidenav-link-list/sidenav-link-list.component';

@NgModule({
  declarations: [
    RoutedSketchPageComponent,
    SidenavPageComponent,
    SidenavLinkGroupComponent,
    SidenavLinkComponent,
    SidenavLinkListComponent,
  ],
  imports: [CommonModule, RouterModule, MatSidenavModule],
  exports: [RoutedSketchPageComponent, MatSidenavModule],
})
export class SharedModule {}
