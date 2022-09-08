import { Component } from '@angular/core';
import { SKETCH_NAV_LINKS, SketchNavLinksRoot } from 'src/app/core';

@Component({
  selector: 'app-sidenav-page',
  templateUrl: './sidenav-page.component.html',
  styleUrls: ['./sidenav-page.component.scss'],
})
export class SidenavPageComponent {
  // TODO look into using material tree for this instead of nav list
  public links: SketchNavLinksRoot = SKETCH_NAV_LINKS;
}
