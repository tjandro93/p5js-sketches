import { SketchNavLink } from './sketch-nav-link.model';

export interface SketchNavLinkGroup {
  collectionTitle: string;
  sketchLinks: SketchNavLink[];
  linkGroups: SketchNavLinkGroup[];
}
