import * as p5 from 'p5';
import { CANVAS_PARENT_CONTAINER_ID } from '../constants/canvas-parent-container-id';
import { getParentContainer } from './get-parent-container';

/**
 * Attach the provided canvas as a child of the element with the specified id.
 */
export function attachCanvasToParentContainer(
  canvas: p5.Renderer,
  containerId?: string
): p5.Renderer {
  if (containerId == null) {
    containerId = CANVAS_PARENT_CONTAINER_ID;
  }
  const canvasParent = getParentContainer(containerId);
  canvas.parent(canvasParent.id);

  return canvas;
}
