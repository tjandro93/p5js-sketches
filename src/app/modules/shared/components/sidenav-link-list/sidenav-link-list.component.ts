import { Component, Input } from '@angular/core';
import { SketchNavLink } from '../../pages/sidenav-page/models/sketch-nav-link.model';

@Component({
  selector: 'app-sidenav-link-list',
  templateUrl: './sidenav-link-list.component.html',
  styleUrls: ['./sidenav-link-list.component.scss'],
})
export class SidenavLinkListComponent {
  @Input()
  public links: SketchNavLink[];
}
