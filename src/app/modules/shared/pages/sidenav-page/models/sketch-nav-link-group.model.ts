import { SketchNavLink } from "./sketch-nav-link.model";

export interface SketchNavLinkGroup {
  categoryTitle: string;
  sketchLinks: SketchNavLink[];
  linkGroups: SketchNavLinkGroup[];
}
