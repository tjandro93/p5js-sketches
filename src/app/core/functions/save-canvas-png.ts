import { CANVAS_PARENT_CONTAINER_ID } from 'src/app/sketch-lib';

export function saveCanvasPng(
  filename: string,
  canvasParentId = CANVAS_PARENT_CONTAINER_ID
): void {
  const canvas = document.querySelector(`#${canvasParentId} canvas`);

  if (canvas == null || !(canvas instanceof HTMLCanvasElement)) {
    throw new Error('Could not find canvas in DOM');
  }

  const downloadLink = document.createElement('a');
  downloadLink.setAttribute('download', `${filename}.png`);
  canvas.toBlob((blob) => {
    const url = URL.createObjectURL(blob);
    downloadLink.setAttribute('href', url);
    downloadLink.click();
  });
}
