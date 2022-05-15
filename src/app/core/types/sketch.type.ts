import * as P5 from 'p5';

export interface Sketch {
  title: string;
  description?: string;
  isSvg?: boolean;
  width?: number;
  height?: number;
  func: (p5: P5) => void;
}
