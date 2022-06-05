import {
  Rule,
  SchematicContext,
  SchematicsException,
  Tree,
} from '@angular-devkit/schematics';
import { SKETCH_DIRECTORY_PATH, SKETCH_FILE_SUFFIX } from '../core/constants';
import { Schema } from './schema';

export function forkSketch(options: Schema): Rule {
  return (tree: Tree, context: SchematicContext) => {
    if (!options.sourceSketch) {
      throw new SchematicsException('Option (sourceSketch) is required');
    }

    if (!options.targetSketch) {
      throw new SchematicsException('Option (targetSketch) is required');
    }

    if(!options.sourceSketch.endsWith(SKETCH_FILE_SUFFIX)) {
      options.sourceSketch += SKETCH_FILE_SUFFIX;
    }

    if(!options.targetSketch.endsWith(SKETCH_FILE_SUFFIX)) {
      options.targetSketch += SKETCH_FILE_SUFFIX;
    }

    const fullSourceSketchPath = `${SKETCH_DIRECTORY_PATH}/${options.sourceSketch}`;
    const fullTargetSketchPath = `${SKETCH_DIRECTORY_PATH}/${options.targetSketch}`;

    if (!tree.exists(fullSourceSketchPath)) {
      throw new SchematicsException(
        `Source sketch does not exist (${fullSourceSketchPath})`
      );
    }

    if (tree.exists(fullTargetSketchPath)) {
      throw new SchematicsException(
        `A sketch already exists with the target sketch name (${fullTargetSketchPath})`
      );
    }

    context.logger.info(
      `Forking ${options.sourceSketch} as ${options.targetSketch}`
    );

    const sourceSketchBuffer = tree.read(fullSourceSketchPath);
    if (sourceSketchBuffer == null) {
      throw new SchematicsException(
        `Error reading ${options.sourceSketch} into buffer`
      );
    }

    tree.create(fullTargetSketchPath, sourceSketchBuffer);

    return tree;
  };
}
