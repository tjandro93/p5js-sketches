import { SketchNavLinksRoot } from '..';

const miscSketchLinks = {
  collectionTitle: 'Misc',
  sketchLinks: [
    {
      title: 'Basic Tree',
      path: '/sketches/misc/basic-tree',
    },
    {
      title: 'Leaf',
      path: '/sketches/misc/leaf',
    },
    {
      title: 'Random Diagonal Lines',
      path: '/sketches/misc/random-diagonal-lines',
    },
    {
      title: 'Random Guassian Lines',
      path: '/sketches/misc/random-guassian-lines',
    },
    {
      title: 'Random Lines',
      path: '/sketches/misc/random-lines',
    },
    {
      title: 'Joy Division',
      path: '/sketches/misc/joy-division',
    },
  ],
  linkGroups: [],
};

const bezierSketchLinks = {
  collectionTitle: 'Bezier',
  sketchLinks: [
    {
      title: 'Bezier Fiddle',
      path: '/sketches/bezier/fiddle',
    },
    {
      title: 'Bezier Flow 1',
      path: '/sketches/bezier/flow-1',
    },
    {
      title: 'Bezier Flow 2 (interactive)',
      path: '/sketches/bezier/flow-2-interactive',
    },
    {
      title: 'Bezier Flow 2 (static)',
      path: '/sketches/bezier/flow-2-static',
    },
    {
      title: 'Bezier Grid 1',
      path: '/sketches/bezier/grid-1',
    },
    {
      title: 'Bezier Grid 2',
      path: '/sketches/bezier/grid-2',
    },
    {
      title: 'Bezier Grid 3 (interactive)',
      path: '/sketches/bezier/grid-3-interactive',
    },
    {
      title: 'Bezier Grid 3 (static)',
      path: '/sketches/bezier/grid-3-static',
    },
  ],
  linkGroups: [],
};

const flowFieldSketchLinks = {
  collectionTitle: 'Flow Field',
  sketchLinks: [
    {
      title: 'Flow Field 1',
      path: '/sketches/flow-field/flow-field-1',
    },
    {
      title: 'Flow Field 1 (Interactive)',
      path: '/sketches/flow-field/flow-field-1-interactive',
    },
    {
      title: 'Flow Field (Plotter)',
      path: '/sketches/flow-field/plotter-1',
    },
    {
      title: 'Flow Field 2 (Interactive)',
      path: '/sketches/flow-field/flow-field-2',
    },
    {
      title: 'Flow Field 2 (Plotter)',
      path: '/sketches/flow-field/flow-field-2-plotter',
    },
  ],
  linkGroups: [],
};

const hitoSketchLinks = {
  collectionTitle: 'Hitomezachi Stitch',
  sketchLinks: [
    {
      title: 'Hito 1',
      path: '/sketches/hitomezachi-stitch/hito-1',
    },
    {
      title: 'Hito 2',
      path: '/sketches/hitomezachi-stitch/hito-2',
    },
    {
      title: 'Hito 3',
      path: '/sketches/hitomezachi-stitch/hito-3',
    },
    {
      title: 'Hito 4',
      path: '/sketches/hitomezachi-stitch/hito-4',
    },
  ],
  linkGroups: [],
};

const sandboxLinks = {
  collectionTitle: 'Sandbox',
  sketchLinks: [
    {
      title: 'Point Grid Interactive',
      path: '/sketches/sandbox/point-grid',
    },
  ],
  linkGroups: [],
};

export const SKETCH_NAV_LINKS: SketchNavLinksRoot = {
  linkGroups: [
    miscSketchLinks,
    bezierSketchLinks,
    flowFieldSketchLinks,
    hitoSketchLinks,
    sandboxLinks,
  ],
  sketchLinks: [],
};
