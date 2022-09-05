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
import {
  MODULE_CLASS_SUFFIX,
  MODULE_FILE_SUFFIX,
  SKETCH_DIRECTORY_PATH,
  SKETCH_FILE_SUFFIX,
} from '../core/constants';
import { Schema } from './schema';

export function interactiveSketch(options: Schema): Rule {
  return async (_tree: Tree, context: SchematicContext) => {
    if (!options.name) {
      throw new SchematicsException('Option (name) is required');
    }

    const sketchNamePieces = options.name.split(/\/|\\/);
    const sketchNameEnd = sketchNamePieces[sketchNamePieces.length - 1];
    const fullSketchName = [...sketchNamePieces, sketchNameEnd].join('/');

    const sketchFilename = `${strings.dasherize(
      fullSketchName
    )}${SKETCH_FILE_SUFFIX}`;
    const sketchObjectName = strings.camelize(sketchNameEnd);
    const sketchModuleFilename = `${strings.dasherize(
      fullSketchName
    )}${MODULE_FILE_SUFFIX}`;
    const sketchModuleClassname = `${strings.classify(
      sketchNameEnd
    )}${MODULE_CLASS_SUFFIX}`;

    const sketchObjectImport = `import { ${sketchObjectName} } from '${SKETCH_DIRECTORY_PATH}/${fullSketchName}.sketch';`;

    context.logger.info(
      `Creating new interactive sketch (${sketchObjectName} @ ${sketchFilename})`
    );

    const templateSource = apply(url('./files'), [
      applyTemplates({
        sketchObjectName,
        sketchFilename,
        sketchModuleFilename,
        sketchModuleClassname,
        sketchObjectImport,
      }),
      move(SKETCH_DIRECTORY_PATH),
    ]);

    return chain([mergeWith(templateSource)]);
  };
}
