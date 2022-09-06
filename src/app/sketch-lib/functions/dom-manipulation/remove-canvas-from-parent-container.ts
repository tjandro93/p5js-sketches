import { getParentContainer } from '../..';

export function removeCanvasFromParentContainer(containerId?: string): void {
  const canvasParent = getParentContainer(containerId);

  canvasParent.innerHTML = '';
}
