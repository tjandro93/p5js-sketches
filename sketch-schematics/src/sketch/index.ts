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

// You don't have to export the function as default. You can also have more than one rule factory
// per file.
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
