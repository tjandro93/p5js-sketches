import { getParentContainer } from './get-parent-container';

export function removeCanvasFromParentContainer(containerId?: string): void {
  const canvasParent = getParentContainer(containerId);

  canvasParent.innerHTML = '';
}
