import { Component, Input } from '@angular/core';
import { SketchNavLink } from 'src/app/core';

@Component({
  selector: 'app-sidenav-link-list',
  templateUrl: './sidenav-link-list.component.html',
  styleUrls: ['./sidenav-link-list.component.scss'],
})
export class SidenavLinkListComponent {
  @Input()
  public links: SketchNavLink[];
}
