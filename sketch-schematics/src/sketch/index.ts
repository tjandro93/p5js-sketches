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
import { importSketch } from '../core/import-sketch';
import { Schema } from './schema';

export function sketch(options: Schema): Rule {
  return async (_tree: Tree, _context: SchematicContext) => {
    if (!options.name) {
      throw new SchematicsException('Option (name) is required');
    }

    const sketchFilename = `${strings.dasherize(options.name)}.sketch.ts`;
    const sketchPath = `src/app/sketches/${sketchFilename}`;
    const sketchObjectName = strings.camelize(options.name);

    _context.logger.info(
      `Creating new sketch (${sketchObjectName} @ ${sketchFilename})`
    );

    const templateSource = apply(url('./files'), [
      applyTemplates({ ...strings, ...options }),
      move('src/app/sketches'),
    ]);

    return chain([
      mergeWith(templateSource),
      importSketch(sketchObjectName, sketchPath),
    ]);
  };
}
