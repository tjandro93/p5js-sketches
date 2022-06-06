import { strings } from '@angular-devkit/core';
import {
  apply,
  applyTemplates,
  chain,
  mergeWith,
  move,
  Rule,
  SchematicContext,
  SchematicsException,
  Tree,
  url,
} from '@angular-devkit/schematics';
import { SKETCH_DIRECTORY_PATH, SKETCH_FILE_SUFFIX } from '../core/constants';
import { Schema } from './schema';

export function interactiveSketch(options: Schema): Rule {
  return async (_tree: Tree, context: SchematicContext) => {
    if (!options.name) {
      throw new SchematicsException('Option (name) is required');
    }

    const sketchFilename = `${strings.dasherize(
      options.name
    )}${SKETCH_FILE_SUFFIX}`;
    const sketchObjectName = strings.camelize(options.name.replace('/', '_'));

    context.logger.info(
      `Creating new interactive sketch (${sketchObjectName} @ ${sketchFilename})`
    );

    const templateSource = apply(url('./files'), [
      applyTemplates({ sketchObjectName, sketchFilename }),
      move(SKETCH_DIRECTORY_PATH),
    ]);

    return chain([mergeWith(templateSource)]);
  };
}
