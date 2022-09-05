import { Component, Input } from '@angular/core';
import { SketchNavLinkGroup } from 'src/app/core';

@Component({
  selector: 'app-sidenav-link-group',
  templateUrl: './sidenav-link-group.component.html',
  styleUrls: ['./sidenav-link-group.component.scss'],
})
export class SidenavLinkGroupComponent {
  @Input()
  public linkGroup: SketchNavLinkGroup;
}
