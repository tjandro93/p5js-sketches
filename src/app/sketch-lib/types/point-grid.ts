import * as P5 from 'p5';
import { Bounds, circle, distance, validateBounds, Vector } from '../';

export class PointGrid<T extends PointGridPoint = PointGridPoint> {
  public readonly points: T[];

  public readonly columnSize: number;
  public readonly rowSize: number;

  constructor(public p5: P5, public options: PointGridOptions<T>) {
    if (isPointGridOptionsByRowColCount(options)) {
      this.validatePointGridOptionsByRowColCount(options);
      const initialValues = this.constructPointGridByRowColCount(options);
      this.points = initialValues.points;
      this.columnSize = initialValues.columnSize;
      this.rowSize = initialValues.rowSize;
    } else if (isPointGridOptionsByRowColSize(options)) {
      this.validatePointGridOptionsByRowColSize(options);
      const initialValues = this.constructPointGridByRowColSize(options);
      this.points = initialValues.points;
      this.columnSize = initialValues.columnSize;
      this.rowSize = initialValues.rowSize;
    } else {
      throw new Error('Unknown options type');
    }
  }

  public getNearestPointToVector(location: Vector): [T, number] {
    // TODO there is probably a more efficient algorithm for this
    let nearestPointSoFar: [T, number] | null = null;

    this.points.forEach((point) => {
      const currentPointDistance = distance(point.position, location);
      if (
        nearestPointSoFar == null ||
        currentPointDistance < nearestPointSoFar[1]
      ) {
        nearestPointSoFar = [point, currentPointDistance];
      }
    });

    return nearestPointSoFar;
  }

  public draw(): void {
    this.points.forEach((point) => {
      circle(this.p5, point.position, 10);
    });
  }

  private constructPointGridByRowColCount(
    options: PointGridOptionsByRowColCount<T>
  ): { points: T[]; columnSize: number; rowSize: number } {
    const points: T[] = [];
    const minX = options.bounds.minX ?? 0;
    const minY = options.bounds.minY ?? 0;

    let columnSize = (options.bounds.maxX - minX) / (options.columnCount - 1);
    let rowSize = (options.bounds.maxY - minY) / (options.rowCount - 1);

    if (options.evenSpacing === 'min') {
      const min = Math.min(columnSize, rowSize);
      columnSize = min;
      rowSize = min;
    } else if (options.evenSpacing === 'max') {
      const max = Math.max(columnSize, rowSize);
      columnSize = max;
      rowSize = max;
    }

    // console.log('Options', {
    //   minX,
    //   maxX: options.maxX,
    //   minY,
    //   maxY: options.maxY,
    //   columnSize,
    //   rowSize,
    //   evenSpacing: options.evenSpacing,
    // });

    for (let i = 0; i < options.columnCount; i++) {
      for (let j = 0; j < options.rowCount; j++) {
        const x = minX + i * columnSize;
        const y = minY + j * rowSize;
        // console.log(`Creating point (${i}, ${j}) at (${x}, ${y})`);
        points.push(this.options.pointGridPointFactory.createPoint(x, y));
      }
    }

    return { points, columnSize, rowSize };
  }

  private constructPointGridByRowColSize(
    options: PointGridOptionsByRowColSize<T>
  ): { points: T[]; columnSize: number; rowSize: number } {
    const points: T[] = [];
    const minX = options.bounds.minX ?? 0;
    const minY = options.bounds.minY ?? 0;
    const columnSize = options.columnSize;
    const rowSize = options.rowSize;

    // console.log('Options', {
    //   minX,
    //   maxX: options.maxX,
    //   minY,
    //   maxY: options.maxY,
    //   columnSize,
    //   rowSize,
    // });
    for (let x = minX; x <= options.bounds.maxX; x += columnSize) {
      for (let y = minY; y <= options.bounds.maxY; y += rowSize) {
        // console.log(`Creating point at (${x}, ${y})`);
        points.push(this.options.pointGridPointFactory.createPoint(x, y));
      }
    }

    return { points, columnSize, rowSize };
  }

  private validatePointGridOptionsByRowColCount(
    options: PointGridOptionsByRowColCount<T>
  ): void {
    const errors: string[] = validateBounds(options.bounds);

    if (options.columnCount <= 1) {
      errors.push('columnCount must be greater than 1');
    }
    if (options.rowCount <= 1) {
      errors.push('rowCount must be greater than 1');
    }
    if (!Number.isInteger(options.columnCount)) {
      errors.push('columnCount must be an integer');
    }
    if (!Number.isInteger(options.rowCount)) {
      errors.push('rowCount must be an integer');
    }

    if (errors.length > 0) {
      throw new Error(`Error creating PointGrid: ${errors.join('; ')}`);
    }
  }

  private validatePointGridOptionsByRowColSize(
    options: PointGridOptionsByRowColSize<T>
  ): void {
    const errors: string[] = validateBounds(options.bounds);

    if (options.columnSize <= 0) {
      errors.push('columnSize must be greater than 0');
    }
    if (options.rowSize <= 0) {
      errors.push('rowSize must be greater than 0');
    }

    if (errors.length > 0) {
      throw new Error(`Error creating PointGrid: ${errors.join('; ')}`);
    }
  }
}

export interface PointGridPointFactory<
  T extends PointGridPoint = PointGridPoint
> {
  createPoint: (x: number, y: number) => T;
}

export class DefaultPointGridPointFactory
  implements PointGridPointFactory<PointGridPoint>
{
  constructor(private p5: P5) {}

  public createPoint(x: number, y: number): PointGridPoint {
    return { position: this.p5.createVector(x, y) };
  }
}

export interface PointGridPoint {
  position: P5.Vector;
}

export interface PointGridOptions<T extends PointGridPoint = PointGridPoint> {
  bounds: Bounds;
  pointGridPointFactory: PointGridPointFactory<T>;
}

export interface PointGridOptionsByRowColCount<
  T extends PointGridPoint = PointGridPoint
> extends PointGridOptions<T> {
  columnCount: number;
  rowCount: number;
  evenSpacing?: 'min' | 'max';
}

export interface PointGridOptionsByRowColSize<
  T extends PointGridPoint = PointGridPoint
> extends PointGridOptions<T> {
  columnSize: number;
  rowSize: number;
}

function isPointGridOptionsByRowColCount<
  T extends PointGridPoint = PointGridPoint
>(options: PointGridOptions<T>): options is PointGridOptionsByRowColCount<T> {
  const asTarget = options as PointGridOptionsByRowColCount<T>;
  return (
    typeof asTarget.columnCount === 'number' &&
    typeof asTarget.rowCount === 'number'
  );
}

function isPointGridOptionsByRowColSize<
  T extends PointGridPoint = PointGridPoint
>(options: PointGridOptions<T>): options is PointGridOptionsByRowColSize<T> {
  const asTarget = options as PointGridOptionsByRowColSize<T>;
  return (
    typeof asTarget.columnSize === 'number' &&
    typeof asTarget.rowSize === 'number'
  );
}
