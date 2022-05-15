import * as p5 from 'p5';
import { CANVAS_PARENT_CONTAINER_ID } from '../../constants/canvas-parent-container-id';
import { getParentContainer } from './get-parent-container';

/**
 * Create a canvas as a child of the element with the specified id.
 * If width and / or height are omitted then the dimensions of the parent
 * element are used
 */
export function createCanvasOnParentContainer(
  p: p5,
  options?: {
    width?: number;
    height?: number;
    containerId?: string;
    useSvg?: boolean;
  }
): p5.Renderer {
  const containerId =
    options?.containerId == null
      ? CANVAS_PARENT_CONTAINER_ID
      : options.containerId;

  const canvasParent = getParentContainer(containerId);
  const canvas = p.createCanvas(
    options?.width ?? canvasParent.clientWidth,
    options?.height ?? canvasParent.clientHeight,
    options?.useSvg ? (p as any).SVG : undefined
  );
  canvas.parent(canvasParent.id);

  return canvas;
}
