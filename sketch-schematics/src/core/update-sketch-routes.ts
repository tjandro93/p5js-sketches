import { logging, strings } from '@angular-devkit/core';
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
  isArrayLiteralExpression,
  isObjectLiteralExpression,
  ArrayLiteralExpression,
  Expression,
  ObjectLiteralExpression,
  isStringLiteral,
  isPropertyAssignment,
} from 'typescript';
import {
  ROUTED_SKETCH_COMPONENT_CLASS_NAME,
  SKETCH_DIRECTORY_PATH,
  SKETCH_FILE_SUFFIX,
  SKETCH_ROUTES_OBJECT_NAME,
  SKETCH_ROUTES_PATH,
} from './constants';

export function updateSketchRoutes(
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

    addSketchRouteDefinition(tree, logger, sketchObjectName, sketchPath);

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
  sketchObjectName: string,
  sketchPath: string
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

  // parse sketch path into array for hierarchal sketches.
  // E.g. "src/app/sketches/foo/bar/baz.sketch.ts" becomes ['foo', 'bar', 'baz']
  const sketchPathParts = sketchPath
    .slice(SKETCH_DIRECTORY_PATH.length + 1)
    .replace(SKETCH_FILE_SUFFIX, '')
    .split('/');

  if (sketchPathParts.length === 0) {
    throw new Error(`Failed to split '${sketchPathParts}' into path parts`);
  }

  // if this sketch isn't nested at all add it to the root routes
  if (sketchPathParts.length === 1) {
    addSketchToRootRoute(
      tree,
      logger,
      sketchRoutesVariableStatement,
      sketchObjectName,
      sketchPathParts
    );
  } else {
    addSketchToNestedRoute(
      tree,
      logger,
      sketchRoutesVariableStatement,
      sketchObjectName,
      sketchPathParts
    );
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

function addSketchToRootRoute(
  tree: Tree,
  logger: logging.LoggerApi,
  sketchRoutesVariableStatement: VariableStatement,
  sketchObjectName: string,
  sketchPathParts: string[]
): void {
  logger.info(`Adding ${sketchObjectName} route to as root route.`);

  const routesInitializer = getRoutesInitializer(
    logger,
    sketchRoutesVariableStatement
  );

  // find all non-nested routes
  const rootRoutes = routesInitializer.elements.filter(isLeafRoute);

  if (rootRoutes.length === 0) {
    throw new Error(
      `No existing root routes in ${SKETCH_ROUTES_OBJECT_NAME}. Cannot find location for new sketch`
    );
  }

  const insertLocation = rootRoutes[rootRoutes.length - 1].end + 1;

  const insertChange = new InsertChange(
    SKETCH_ROUTES_PATH,
    insertLocation,
    `
  {
    path: '${strings.dasherize(sketchPathParts[0])}',
    component: ${ROUTED_SKETCH_COMPONENT_CLASS_NAME},
    data: ${sketchObjectName}
  },`
  );

  const updateRecorder = tree.beginUpdate(SKETCH_ROUTES_PATH);
  updateRecorder.insertRight(insertChange.pos, insertChange.toAdd);
  tree.commitUpdate(updateRecorder);
}

/** Get the ArrayLiteralExpression defining all the routes */
function getRoutesInitializer(
  logger: logging.LoggerApi,
  sketchRoutesVariableStatement: VariableStatement
): ArrayLiteralExpression {
  logger.info(`Getting ${SKETCH_ROUTES_OBJECT_NAME} array initializer.`);

  const sketchRoutesDeclaration =
    sketchRoutesVariableStatement.declarationList.declarations[0];

  if (
    sketchRoutesDeclaration == null ||
    sketchRoutesDeclaration.initializer == null ||
    !isArrayLiteralExpression(sketchRoutesDeclaration.initializer)
  ) {
    throw new Error(
      `${SKETCH_ROUTES_OBJECT_NAME} is not defined with an array initializer`
    );
  }

  return sketchRoutesDeclaration.initializer;
}

/**
 * Determine if a route is a parent route
 */
function isParentRoute(
  routeElement: Expression
): routeElement is ObjectLiteralExpression {
  return (
    isObjectLiteralExpression(routeElement) &&
    routeElement.properties.some(
      (property) =>
        property.name != null &&
        isIdentifier(property.name) &&
        property.name.escapedText === 'children'
    )
  );
}

/**
 * Determine if a route is a leaf route
 */
function isLeafRoute(
  routeElement: Expression
): routeElement is ObjectLiteralExpression {
  return (
    isObjectLiteralExpression(routeElement) &&
    !routeElement.properties.some(
      (property) =>
        property.name != null &&
        isIdentifier(property.name) &&
        property.name.escapedText === 'children'
    )
  );
}

function addSketchToNestedRoute(
  tree: Tree,
  logger: logging.LoggerApi,
  sketchRoutesVariableStatement: VariableStatement,
  sketchObjectName: string,
  sketchPathParts: string[]
): void {
  logger.info(`Adding ${sketchObjectName} as child of nested route`);

  const routesInitializer = getRoutesInitializer(
    logger,
    sketchRoutesVariableStatement
  );

  // find all parent routes
  const parentRoutes = routesInitializer.elements.filter(isParentRoute);

  for (let i = 0; i < sketchPathParts.length; i++) {
    const currentPathPart = sketchPathParts[i];
    // find a parent route whose path matches the currentPathPart
    const parentRoute = findMatchingParentRoute(parentRoutes, currentPathPart);

    if (parentRoute) {
      // TODO look at it's children for future routes
    } else {
      // TODO create a route here. Needs to be as nested as possible
    }
  }
}

function findMatchingParentRoute(
  parentRoutes: ObjectLiteralExpression[],
  targetPath: string
): ObjectLiteralExpression | undefined {
  return parentRoutes.find((route) =>
    route.properties.some(
      (property) =>
        property.name != null &&
        isIdentifier(property.name) &&
        property.name.escapedText === 'path' &&
        isPropertyAssignment(property) &&
        isStringLiteral(property.initializer) &&
        property.initializer.text === targetPath
    )
  );
}
