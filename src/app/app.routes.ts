import { basicTreeSketch } from './sketches/basic-tree.sketch';
import { RoutedSketchComponent } from './modules/shared/components/routed-sketch/routed-sketch.component';
import { SketchRoutes } from './core/types/sketch-routes.type';
import { randomDiagonalLines } from './sketches/random-diagonal-lines.sketch';

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
];
