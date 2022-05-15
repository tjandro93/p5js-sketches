import * as p5 from 'p5';
import { ACTION_DRAWER_ID } from '../constants/action-drawer-id';

export function addElementToActionDrawer(
  element: p5.Element,
  drawerId?: string
): void {
  if (drawerId == null) {
    drawerId = ACTION_DRAWER_ID;
  }

  const actionDrawer = document.getElementById(drawerId);
  element.parent(actionDrawer.firstChild);
}
