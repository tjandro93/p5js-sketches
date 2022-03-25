import { Component, OnInit } from '@angular/core';
import { SketchRoute } from 'src/app/core/types/sketch-route.type';
import { SKETCH_ROUTES } from 'src/app/routes/sketch.routes';
import { SketchNavLinkGroup } from './models/sketch-nav-link-group.model';
import { SketchNavLink } from './models/sketch-nav-link.model';
import { SketchNavLinksRoot } from './models/sketch-nav-links-root.model';

@Component({
  selector: 'app-sidenav-page',
  templateUrl: './sidenav-page.component.html',
  styleUrls: ['./sidenav-page.component.scss'],
})
export class SidenavPageComponent implements OnInit {
  //  TODO  look into using material tree for this instead of nav list
  public links: SketchNavLinksRoot;

  public ngOnInit(): void {
    this.links = {
      sketchLinks: [],
      linkGroups: [],
    };

    SKETCH_ROUTES.forEach((route) => {
      if (route.data != null) {
        this.links.sketchLinks.push(this.routeToLink(route));
      } else if (route.collectionTitle != null && route.children != null) {
        this.links.linkGroups.push(this.routeWithChildrenToLinkGroup(route));
      } else {
        throw new Error(
          'Unable to map route to either a SketchNavLinkGroup or SketchNavLink'
        );
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

  private routeWithChildrenToLinkGroup(
    route: SketchRoute,
    parentPath: string = ''
  ): SketchNavLinkGroup {
    if (route.children == null || route.collectionTitle == null) {
      throw new Error(
        'Cannot craete SketchNavLinkGroup from SketchRoute without children or collectionTitle'
      );
    }

    const group: SketchNavLinkGroup = {
      collectionTitle: route.collectionTitle,
      sketchLinks: [],
      linkGroups: [],
    };

    route.children.forEach((childRoute) => {
      if (childRoute.data != null) {
        group.sketchLinks.push(
          this.routeToLink(childRoute, `${parentPath}/${route.path}`)
        );
      } else if (
        childRoute.collectionTitle != null &&
        childRoute.children != null
      ) {
        group.linkGroups.push(
          this.routeWithChildrenToLinkGroup(
            childRoute,
            `${parentPath}/${route.path}`
          )
        );
      } else {
        throw new Error(
          'Unable to map childRoute to either a SketchNavLinkGroup or SketchNavLink'
        );
      }
    });

    return group;
  }
}
