import * as P5 from 'p5';
import { circle, Vector } from '../';

export class PointGrid {
  public readonly points: readonly Vector[];

  public readonly columnSize: number;
  public readonly rowSize: number;

  constructor(
    options: PointGridOptionsByRowColCount | PointGridOptionsByRowColSize
  ) {
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

  public draw(p5: P5): void {
    this.points.forEach((point) => {
      circle(p5, point, 10);
    });
  }

  private constructPointGridByRowColCount(
    options: PointGridOptionsByRowColCount
  ): { points: Vector[]; columnSize: number; rowSize: number } {
    const points: Vector[] = [];
    const minX = options.minX ?? 0;
    const minY = options.minY ?? 0;

    let columnSize = (options.maxX - minX) / (options.columnCount - 1);
    let rowSize = (options.maxY - minY) / (options.rowCount - 1);

    if (options.evenSpacing === 'min') {
      const min = Math.min(columnSize, rowSize);
      columnSize = min;
      rowSize = min;
    } else if (options.evenSpacing === 'max') {
      const max = Math.max(columnSize, rowSize);
      columnSize = max;
      rowSize = max;
    }

    console.log('Options', {
      minX,
      maxX: options.maxX,
      minY,
      maxY: options.maxY,
      columnSize,
      rowSize,
      evenSpacing: options.evenSpacing,
    });

    for (let i = 0; i < options.columnCount; i++) {
      for (let j = 0; j < options.rowCount; j++) {
        const x = minX + i * columnSize;
        const y = minY + j * rowSize;
        console.log(`Creating point (${i}, ${j}) at (${x}, ${y})`);
        points.push({ x, y });
      }
    }

    return { points, columnSize, rowSize };
  }

  private constructPointGridByRowColSize(
    options: PointGridOptionsByRowColSize
  ): { points: Vector[]; columnSize: number; rowSize: number } {
    const points: Vector[] = [];
    const minX = options.minX ?? 0;
    const minY = options.minY ?? 0;
    const columnSize = options.columnSize;
    const rowSize = options.rowSize;

    console.log('Options', {
      minX,
      maxX: options.maxX,
      minY,
      maxY: options.maxY,
      columnSize,
      rowSize,
    });
    for (let x = minX; x <= options.maxX; x += columnSize) {
      for (let y = minY; y <= options.maxY; y += rowSize) {
        console.log(`Creating point at (${x}, ${y})`);
        points.push({ x, y });
      }
    }

    return { points, columnSize, rowSize };
  }

  private validatePointGridOptionsByRowColCount(
    options: PointGridOptionsByRowColCount
  ): void {
    const errors: string[] = [];
    if ((options.minX ?? 0) >= options.maxX) {
      errors.push('minX must be strictly less than maxX');
    }
    if ((options.minY ?? 0) >= options.maxY) {
      errors.push('minY must be strictly less than maxY');
    }
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
    options: PointGridOptionsByRowColSize
  ): void {
    const errors: string[] = [];
    if ((options.minX ?? 0) >= options.maxX) {
      errors.push('minX must be strictly less than maxX');
    }
    if ((options.minY ?? 0) >= options.maxY) {
      errors.push('minY must be strictly less than maxY');
    }
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

export interface PointGridOptionsByRowColCount {
  minX?: number;
  maxX: number;
  minY?: number;
  maxY: number;
  columnCount: number;
  rowCount: number;
  evenSpacing?: 'min' | 'max';
}

export interface PointGridOptionsByRowColSize {
  minX?: number;
  maxX: number;
  minY?: number;
  maxY: number;
  columnSize: number;
  rowSize: number;
}

function isPointGridOptionsByRowColCount(
  options: PointGridOptionsByRowColCount | PointGridOptionsByRowColSize
): options is PointGridOptionsByRowColCount {
  const asTarget = options as PointGridOptionsByRowColCount;
  return (
    typeof asTarget.columnCount === 'number' &&
    typeof asTarget.rowCount === 'number'
  );
}

function isPointGridOptionsByRowColSize(
  options: PointGridOptionsByRowColCount | PointGridOptionsByRowColSize
): options is PointGridOptionsByRowColSize {
  const asTarget = options as any;
  return (
    typeof asTarget.columnSize === 'number' &&
    typeof asTarget.rowSize === 'number'
  );
}
