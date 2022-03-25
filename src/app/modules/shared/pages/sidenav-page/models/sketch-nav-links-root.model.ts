import { SketchNavLinkGroup } from './sketch-nav-link-group.model';
import { SketchNavLink } from './sketch-nav-link.model';

export interface SketchNavLinksRoot {
  sketchLinks: SketchNavLink[];
  linkGroups: SketchNavLinkGroup[];
}
