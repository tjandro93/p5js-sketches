import { Component, OnInit } from '@angular/core';
import { SketchRoute } from 'src/app/core/types/sketch-route.type';
import { SKETCH_ROUTES } from 'src/app/routes/sketch.routes';
import { SketchNavLink } from './models/sketch-nav-link.model';
import { SketchNavLinksRoot } from './models/sketch-nav-links-root.model';

@Component({
  selector: 'app-sidenav-page',
  templateUrl: './sidenav-page.component.html',
  styleUrls: ['./sidenav-page.component.scss'],
})
export class SidenavPageComponent implements OnInit {
  public links: SketchNavLinksRoot;

  public ngOnInit(): void {
    this.links = {
      sketchLinks: [],
      linkGroups: [],
    };

    SKETCH_ROUTES.forEach((route) => {
      if (route.data != null) {
        this.links.sketchLinks.push({
          title: route.data.title,
          path: `/${route.path}`,
        });
      }
    });
  }

  private routeToLink(
    route: SketchRoute,
    parentPath: string = ''
  ): SketchNavLink {
    if (route.data == null) {
      throw new Error(
        'Cannot create SketchNavLink from SketchRoute without data'
      );
    }

    return {
      title: route.data.title,
      path: `${parentPath}/${route.path}`,
    };
  }
}
