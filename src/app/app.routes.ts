import { basicTreeSketch } from './sketches/basic-tree.sketch';
import { RoutedSketchComponent } from './modules/shared/components/routed-sketch/routed-sketch.component';
import { SketchRoutes } from './core/types/sketch-routes.type';
import { randomDiagonalLines } from './sketches/random-diagonal-lines.sketch';
import { randomGuassianLines } from './sketches/random-guassian-lines.sketch';
import { randomLines } from './sketches/random-lines.sketch';

export const APP_ROUTES: SketchRoutes = [
  {
    path: 'basic-tree',
    component: RoutedSketchComponent,
    data: basicTreeSketch,
  },
  {
    path: 'random-diagonal-lines',
    component: RoutedSketchComponent,
    data: randomDiagonalLines,
  },
  {
    path: 'random-guassian-lines',
    component: RoutedSketchComponent,
    data: randomGuassianLines,
  },
  {
    path: 'random-lines',
    component: RoutedSketchComponent,
    data: randomLines,
  },
];
