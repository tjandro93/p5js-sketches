import { strings } from '@angular-devkit/core';
import {
  apply,
  applyTemplates,
  chain,
  MergeStrategy,
  mergeWith,
  move,
  Rule,
  SchematicContext,
  SchematicsException,
  Tree,
  url,
} from '@angular-devkit/schematics';
import {
  createSourceFile,
  Identifier,
  isIdentifier,
  isTypeReferenceNode,
  isVariableDeclaration,
  isVariableStatement,
  ScriptTarget,
  SyntaxKind,
  VariableDeclaration,
} from 'typescript';
import {
  ROUTED_SKETCH_COMPONENT_CLASS_NAME,
  SKETCH_DIRECTORY_PATH,
  SKETCH_ROUTES_DIRECTORY_PATH,
  SKETCH_ROUTES_PATH,
} from '../core/constants';

export function sketchRoutes(): Rule {
  return (tree: Tree, context: SchematicContext) => {
    context.logger.info(`Generating ${SKETCH_ROUTES_PATH}`);

    const [sketchRouteInitializers, sketchImporters] =
      buildTemplateObjects(tree);

    const routes = sketchRouteInitializers.map(routeFormatter).join(',\n');
    const imports = importsFormat(sketchImporters);

    const templateSource = apply(url('./files'), [
      applyTemplates({
        routes,
        imports,
      }),
      move(SKETCH_ROUTES_DIRECTORY_PATH),
    ]);

    return chain([mergeWith(templateSource, MergeStrategy.Overwrite)]);
  };
}

function buildTemplateObjects(
  tree: Tree
): [SketchRouteInitializer[], SketchImporter[]] {
  const sketchesDirectory = tree.getDir(SKETCH_DIRECTORY_PATH);

  const sketchRouteInitializers: SketchRouteInitializer[] = [];
  const sketchImporters: SketchImporter[] = [];

  sketchesDirectory.visit((filename) => {
    // strip off leading '/'
    const projectPath = filename.slice(1).replace('.ts', '');
    const relativePath = projectPath
      .replace(`${SKETCH_DIRECTORY_PATH}/`, '')
      .replace('.sketch', '');

    const pathPieces = relativePath.split('/');

    const sketchObjectName = getSketchObjectName(tree, `${projectPath}.ts`);
    sketchImporters.push({
      sketchObjectName,
      sketchSourcePath: projectPath,
    });

    let currentPath: string;
    let parentChildArray = sketchRouteInitializers;

    while (pathPieces.length > 1) {
      // tslint:disable-next-line: no-non-null-assertion
      currentPath = pathPieces.shift()!;
      let nextParent = parentChildArray.find(
        (childRoute) =>
          childRoute.children != null && childRoute.path === currentPath
      );

      if (!nextParent) {
        nextParent = {
          path: currentPath,
          collectionTitle: strings.capitalize(currentPath).replace('-', ' '),
          children: [],
        };
        parentChildArray.push(nextParent);
      }
      if (!nextParent.children) {
        nextParent.children = [];
      }

      parentChildArray = nextParent.children;
    }
    // tslint:disable-next-line: no-non-null-assertion
    currentPath = pathPieces.shift()!;

    parentChildArray.push({
      path: currentPath,
      sketchObjectName,
    });
  });

  return [sketchRouteInitializers, sketchImporters];
}

function getSketchObjectName(tree: Tree, sketchPath: string): string {
  const sketchBuffer = tree.read(sketchPath);
  if (!sketchBuffer) {
    throw new SchematicsException(`Sketch file not found at ${sketchPath}`);
  }

  const source = createSourceFile(
    sketchPath,
    sketchBuffer.toString(),
    ScriptTarget.Latest
  );

  function isSketchDeclaration(declaration: VariableDeclaration): boolean {
    return (
      isVariableDeclaration(declaration) &&
      declaration.name != null &&
      isIdentifier(declaration.name) &&
      declaration.type != null &&
      isTypeReferenceNode(declaration.type) &&
      isIdentifier(declaration.type.typeName) &&
      declaration.type.typeName.escapedText === 'Sketch'
    );
  }

  const sketchVariableStatement = source
    .getChildren()
    .find((node) => node.kind === SyntaxKind.SyntaxList)
    ?.getChildren()
    ?.filter(isVariableStatement)
    ?.find((statement) =>
      statement.declarationList.declarations.find(isSketchDeclaration)
    );

  if (sketchVariableStatement == null) {
    throw new Error(`Could not find Sketch declaration in ${sketchPath}`);
  }

  const sketchDeclaration =
    sketchVariableStatement.declarationList.declarations.find(
      isSketchDeclaration
    );
  // tslint:disable-next-line: no-non-null-assertion
  return (sketchDeclaration!.name as unknown as Identifier)
    .escapedText as string;
}

function importsFormat(imports: SketchImporter[]): string {
  return imports
    .map((i) => `import { ${i.sketchObjectName} } from '${i.sketchSourcePath}'`)
    .join('\n');
}

function routeFormatter(route: SketchRouteInitializer): string {
  let routeString = `{\npath: '${route.path}',\n`;
  if (route.sketchObjectName != null) {
    routeString += `component: ${ROUTED_SKETCH_COMPONENT_CLASS_NAME},\ndata: ${route.sketchObjectName},\n`;
  }

  if (route.collectionTitle != null) {
    routeString += `collectionTitle: '${route.collectionTitle}',\n`;
  }

  if (route.children != null) {
    routeString += `children: [\n${route.children
      .map(routeFormatter)
      .join(',\n')}\n],`;
  }

  routeString += '}';

  return routeString;
}

interface SketchRouteInitializer {
  path: string;
  sketchObjectName?: string;
  collectionTitle?: string;
  children?: SketchRouteInitializer[];
}

interface SketchImporter {
  sketchObjectName: string;
  sketchSourcePath: string;
}
