import * as P5 from 'p5';

export interface Sketch {
  title: string;
  func: (p5: P5) => void;
}
