import { SketchRoutes } from '../core';
import { RoutedSketchPageComponent } from '../modules/shared/pages/routed-sketch-page/routed-sketch-page.component';
import { basicTreeSketch } from '../sketches/basic-tree.sketch';
import { bezierFiddle } from '../sketches/bezier/bezier-fiddle.sketch';
import { bezierFlow1 } from '../sketches/bezier/bezier-flow-1.sketch';
import { bezierFlow2Interactive } from '../sketches/bezier/bezier-flow-2-interactive.sketch';
import { bezierFlow2Static } from '../sketches/bezier/bezier-flow-2-static.sketch';
import { hito1 } from '../sketches/hitomezachi-stitch/hito1.sketch';
import { hito2 } from '../sketches/hitomezachi-stitch/hito2.sketch';
import { hito3 } from '../sketches/hitomezachi-stitch/hito3.sketch';
import { hito4 } from '../sketches/hitomezachi-stitch/hito4.sketch';
import { leaf } from '../sketches/leaf.sketch';
import { randomDiagonalLines } from '../sketches/random-diagonal-lines.sketch';
import { randomGuassianLines } from '../sketches/random-guassian-lines.sketch';
import { randomLines } from '../sketches/random-lines.sketch';

export const SKETCH_ROUTES: SketchRoutes = [
  {
    path: 'basic-tree',
    component: RoutedSketchPageComponent,
    data: basicTreeSketch,
  },
  {
    path: 'random-diagonal-lines',
    component: RoutedSketchPageComponent,
    data: randomDiagonalLines,
  },
  {
    path: 'random-guassian-lines',
    component: RoutedSketchPageComponent,
    data: randomGuassianLines,
  },
  {
    path: 'random-lines',
    component: RoutedSketchPageComponent,
    data: randomLines,
  },
  {
    path: 'leaf',
    component: RoutedSketchPageComponent,
    data: leaf,
  },
  {
    path: 'bezier',
    collectionTitle: 'Bezier',
    children: [
      {
        path: 'fiddle',
        component: RoutedSketchPageComponent,
        data: bezierFiddle,
      },
      {
        path: 'flow-1',
        component: RoutedSketchPageComponent,
        data: bezierFlow1,
      },
      {
        path: 'flow-2-static',
        component: RoutedSketchPageComponent,
        data: bezierFlow2Static,
      },
      {
        path: 'flow-2-interactive',
        component: RoutedSketchPageComponent,
        data: bezierFlow2Interactive,
      },
    ],
  },
  {
    path: 'hitomezachi',
    collectionTitle: 'Hitomezachi Stitch',
    children: [
      {
        path: '1',
        component: RoutedSketchPageComponent,
        data: hito1,
      },
      {
        path: '2',
        component: RoutedSketchPageComponent,
        data: hito2,
      },
      {
        path: '3',
        component: RoutedSketchPageComponent,
        data: hito3,
      },
      {
        path: '4',
        component: RoutedSketchPageComponent,
        data: hito4,
      },
    ],
  },
];
