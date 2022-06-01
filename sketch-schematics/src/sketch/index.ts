import { strings } from '@angular-devkit/core';
import {
  apply,
  applyTemplates,
  branchAndMerge,
  mergeWith,
  move,
  Rule,
  SchematicContext,
  SchematicsException,
  Tree,
  url,
} from '@angular-devkit/schematics';
import { Schema } from './schema';

export function sketch(options: Schema): Rule {
  return async (_tree: Tree, _context: SchematicContext) => {
    if (!options.name) {
      throw new SchematicsException('Option (name) is required');
    }

    const templateSource = apply(url('./files'), [
      applyTemplates({ ...strings, ...options }),
      move('src/app/sketches')
    ]);

    return branchAndMerge(mergeWith(templateSource));
  };
}
