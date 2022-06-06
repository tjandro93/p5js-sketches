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
    if (!options.source) {
      throw new SchematicsException('Option (sourceSketch) is required');
    }

    if (!options.target) {
      throw new SchematicsException('Option (targetSketch) is required');
    }

    if (!options.source.endsWith(SKETCH_FILE_SUFFIX)) {
      options.source += SKETCH_FILE_SUFFIX;
    }

    if (!options.target.endsWith(SKETCH_FILE_SUFFIX)) {
      options.target += SKETCH_FILE_SUFFIX;
    }

    const fullSourceSketchPath = `${SKETCH_DIRECTORY_PATH}/${options.source}`;
    const fullTargetSketchPath = `${SKETCH_DIRECTORY_PATH}/${options.target}`;

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

    context.logger.info(`Forking ${options.source} as ${options.target}`);

    const sourceSketchBuffer = tree.read(fullSourceSketchPath);
    if (sourceSketchBuffer == null) {
      throw new SchematicsException(
        `Error reading ${options.source} into buffer`
      );
    }

    tree.create(fullTargetSketchPath, sourceSketchBuffer);

    return tree;
  };
}
