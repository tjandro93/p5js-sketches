import { logging } from '@angular-devkit/core';
import {
  Rule,
  SchematicContext,
  SchematicsException,
  Tree,
} from '@angular-devkit/schematics';
import { InsertChange } from '@schematics/angular/utility/change';
import {
  createSourceFile,
  ScriptTarget,
  SourceFile,
  isVariableStatement,
  VariableStatement,
  isIdentifier,
  isVariableDeclaration,
  isImportDeclaration,
} from 'typescript';

const SKETCH_ROUTES_PATH = 'src/app/routes/sketch.routes.ts';
const SKETCH_ROUTES_OBJECT_NAME = 'SKETCH_ROUTES';

export function importSketch(
  sketchObjectName: string,
  sketchPath: string
): Rule {
  return (tree: Tree, context: SchematicContext) => {
    const logger = context.logger;

    context.logger.info(
      `Importing new sketch (${sketchObjectName} @ ${sketchPath}) in ${SKETCH_ROUTES_PATH}`
    );

    if (!tree.exists(sketchPath)) {
      throw new SchematicsException(
        `New sketch does not exist at ${sketchPath}`
      );
    }

    if (!tree.exists(SKETCH_ROUTES_PATH)) {
      throw new SchematicsException(
        `Sketch routes file not found at ${SKETCH_ROUTES_PATH}`
      );
    }

    importSketchObject(tree, logger, sketchObjectName, sketchPath);

    addSketchRouteDefinition(tree, logger, sketchObjectName);

    return tree;
  };
}

/**
 * Add `import { <sketchObjectName> } from <sketchPath>;` to routes file
 */
function importSketchObject(
  tree: Tree,
  logger: logging.LoggerApi,
  sketchObjectName: string,
  sketchPath: string
): void {
  logger.info(`Adding import for ${sketchObjectName} in ${SKETCH_ROUTES_PATH}`);

  // get SourceFile
  const sketchRoutesSource = getSketchRoutesSource(tree, logger);

  // find position for new import statement
  const importDeclarations = sketchRoutesSource
    .getChildAt(0)
    .getChildren()
    .filter(isImportDeclaration);

  // if there are no imports yet the we import at the beginning of the file. Otherwise it goes after the last existing import
  const insertLocation =
    importDeclarations.length === 0
      ? 0
      : importDeclarations[importDeclarations.length - 1].end + 1;

  // update the tree with the import declaration
  const updateRecorder = tree.beginUpdate(SKETCH_ROUTES_PATH);

  const insertChange = new InsertChange(
    SKETCH_ROUTES_PATH,
    insertLocation,
    `import { ${sketchObjectName} } from '${sketchPath.replace(/\.ts/, '')}';\n`
  );
  updateRecorder.insertLeft(insertChange.pos, insertChange.toAdd);

  tree.commitUpdate(updateRecorder);
}

/**
 * Parse the file at SKETCH_ROUTES_PATH into a SourceFile for analysis
 */
function getSketchRoutesSource(
  tree: Tree,
  logger: logging.LoggerApi
): SourceFile {
  logger.info(
    `Parsing ${SKETCH_ROUTES_PATH} into TypeScript SourceFile object`
  );

  const sketchRoutesBuffer = tree.read(SKETCH_ROUTES_PATH);
  if (!sketchRoutesBuffer) {
    throw new SchematicsException(
      `Sketch routes file not found at ${SKETCH_ROUTES_PATH}`
    );
  }

  return createSourceFile(
    SKETCH_ROUTES_PATH,
    sketchRoutesBuffer.toString(),
    ScriptTarget.Latest
  );
}

/**
 * Add a route definition for the new sketch to the SKETCH_ROUTES constant
 */
function addSketchRouteDefinition(
  tree: Tree,
  logger: logging.LoggerApi,
  sketchObjectName: string
): void {
  logger.info(
    `Adding route definition for ${sketchObjectName} in ${SKETCH_ROUTES_PATH}`
  );

  // get SourceFile
  const sketchRoutesSource = getSketchRoutesSource(tree, logger);

  const sketchRoutesVariableStatement = findSketchRoutesConstant(
    logger,
    sketchRoutesSource
  );

  if (sketchRoutesVariableStatement) {
    logger.info(`Found ${SKETCH_ROUTES_OBJECT_NAME} in ${SKETCH_ROUTES_PATH}`);
  }
}

/**
 * Find the VariableStatement for the SKETCH_ROUTES constant
 */
function findSketchRoutesConstant(
  logger: logging.LoggerApi,
  sketchRoutesSource: SourceFile
): VariableStatement {
  logger.info(`Finding ${SKETCH_ROUTES_OBJECT_NAME} in ${SKETCH_ROUTES_PATH}`);

  // find variable statements in the file
  const variableStatements = sketchRoutesSource
    .getChildAt(0)
    .getChildren()
    .filter(isVariableStatement);

  if (variableStatements.length === 0) {
    throw new Error(
      `Could not find any variable statements in ${SKETCH_ROUTES_PATH}`
    );
  }

  // find the variable statement defining the SKETCH_ROUTES_OBJECT_NAME variable
  const sketchRoutesVariableStatement = variableStatements.find((statement) =>
    statement.declarationList.declarations
      .filter(isVariableDeclaration)
      .find((variableDeclaration) =>
        isIdentifier(variableDeclaration.name)
          ? variableDeclaration.name.escapedText === SKETCH_ROUTES_OBJECT_NAME
          : undefined
      )
  );

  if (sketchRoutesVariableStatement == null) {
    throw new Error(
      `Could not find ${SKETCH_ROUTES_OBJECT_NAME} in ${SKETCH_ROUTES_PATH}`
    );
  }

  return sketchRoutesVariableStatement;
}
