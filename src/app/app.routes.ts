import { basicTreeSketch } from './sketches/basic-tree.sketch';
import { RoutedSketchComponent } from './modules/shared/components/routed-sketch/routed-sketch.component';
import { SketchRoutes } from './modules/shared/types/sketch-routes.type';

export const APP_ROUTES: SketchRoutes = [
  {
    path: 'routed-basic-tree',
    component: RoutedSketchComponent,
    data: {
      title: 'Basic Tree',
      sketch: basicTreeSketch,
    },
  },
];
