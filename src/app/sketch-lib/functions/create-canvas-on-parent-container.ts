import * as p5 from 'p5';
import { CANVAS_PARENT_CONTAINER_ID } from '../constants/canvas-parent-container-id';
import { getParentContainer } from './get-parent-container';

/**
 * Create a canvas as a child of the element with the specified id.
 * If width and / or height are omitted then the dimensions of the parent
 * element are used
 */
export function createCanvasOnParentContainer(
  p: p5,
  width?: number,
  height?: number,
  containerId?: string
): p5.Renderer {
  if (containerId == null) {
    containerId = CANVAS_PARENT_CONTAINER_ID;
  }
  const canvasParent = getParentContainer(containerId);
  const canvas = p.createCanvas(
    width ?? canvasParent.clientWidth,
    height ?? canvasParent.clientHeight
  );
  canvas.parent(canvasParent.id);

  return canvas;
}
