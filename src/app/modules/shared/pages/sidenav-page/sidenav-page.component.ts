import { Component } from '@angular/core';
import { SketchNavLinksRoot } from 'src/app/core';
import { SKETCH_NAV_LINKS } from 'src/app/core/constants/sketch-route-sidenav-links.constants';

@Component({
  selector: 'app-sidenav-page',
  templateUrl: './sidenav-page.component.html',
  styleUrls: ['./sidenav-page.component.scss'],
})
export class SidenavPageComponent {
  // TODO look into using material tree for this instead of nav list
  public links: SketchNavLinksRoot = SKETCH_NAV_LINKS;
}
