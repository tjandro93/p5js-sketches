import { basicTreeSketch } from './sketches/basic-tree.sketch';
import { RoutedSketchComponent } from './modules/shared/components/routed-sketch/routed-sketch.component';
import { SketchRoutes } from './core/types/sketch-routes.type';
import { randomDiagonalLines } from './sketches/random-diagonal-lines.sketch';
import { randomGuassianLines } from './sketches/random-guassian-lines.sketch';
import { randomLines } from './sketches/random-lines.sketch';
import { hito1 } from './sketches/hitomezachi-stitch/hito1.sketch';
import { hito2 } from './sketches/hitomezachi-stitch/hito2.sketch';
import { hito3 } from './sketches/hitomezachi-stitch/hito3.sketch';
import { hito4 } from './sketches/hitomezachi-stitch/hito4.sketch';

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
  {
    path: 'hitomezachi',
    children: [
      {
        path: '1',
        component: RoutedSketchComponent,
        data: hito1,
      },
      {
        path: '2',
        component: RoutedSketchComponent,
        data: hito2,
      },
      {
        path: '3',
        component: RoutedSketchComponent,
        data: hito3,
      },
      {
        path: '4',
        component: RoutedSketchComponent,
        data: hito4,
      },
    ],
  },
];
