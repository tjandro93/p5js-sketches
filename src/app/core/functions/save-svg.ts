import { CANVAS_PARENT_CONTAINER_ID } from 'src/app/sketch-lib/constants/canvas-parent-container-id';

export function saveSvg(filename: string, svg?: SVGElement): void {
  if (svg == null) {
    svg = document.querySelector(`#${CANVAS_PARENT_CONTAINER_ID} svg`);
  }

  if (svg == null) {
    throw new Error('Could not find SVG in DOM');
  }

  // based on https://stackoverflow.com/a/46403589
  svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
  const svgData = svg.outerHTML;
  const preface = '<?xml version="1.0" standalone="no"?>\r\n';
  const svgBlob = new Blob([preface, svgData], {
    type: 'image/svg+xml;charset=utf-8',
  });
  const svgUrl = URL.createObjectURL(svgBlob);
  const downloadLink = document.createElement('a');
  downloadLink.href = svgUrl;
  downloadLink.download = filename;
  downloadLink.click();
}
