import { CANVAS_PARENT_CONTAINER_ID } from '../..';

export function getParentContainer(containerId?: string): Element {
  if (containerId == null) {
    containerId = CANVAS_PARENT_CONTAINER_ID;
  }
  return document.getElementById(containerId);
}
