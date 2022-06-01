import {
  Rule,
  SchematicContext,
  SchematicsException,
  Tree,
} from '@angular-devkit/schematics';
import { InsertChange } from '@schematics/angular/utility/change';

export function importSketch(
  sketchObjectName: string,
  sketchPath: string
): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    const sketchRoutesPath = 'src/app/routes/sketch.routes.ts';

    _context.logger.info(
      `Importing new sketch (${sketchObjectName} @ ${sketchPath}) in ${sketchRoutesPath}`
    );

    if (!tree.exists(sketchPath)) {
      throw new SchematicsException(
        `New sketch does not exist at ${sketchPath}`
      );
    }

    if (!tree.exists(sketchRoutesPath)) {
      throw new SchematicsException(
        `Sketch routes file not found at ${sketchRoutesPath}`
      );
    }

    const updateRecorder = tree.beginUpdate(sketchRoutesPath);
    const insertChange = new InsertChange(
      sketchRoutesPath,
      0,
      `import { ${sketchObjectName} } from '${sketchPath.replace(
        /\.ts/,
        ''
      )}';\n`
    );
    updateRecorder.insertLeft(insertChange.pos, insertChange.toAdd);
    tree.commitUpdate(updateRecorder);

    return tree;
  };
}
