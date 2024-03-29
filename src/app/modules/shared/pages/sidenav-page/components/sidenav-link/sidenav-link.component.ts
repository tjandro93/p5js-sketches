import { Component, Input } from '@angular/core';
import { SketchNavLink } from 'src/app/core';

@Component({
  selector: 'app-sidenav-link',
  templateUrl: './sidenav-link.component.html',
  styleUrls: ['./sidenav-link.component.scss'],
})
export class SidenavLinkComponent {
  @Input()
  public link: SketchNavLink;
}
