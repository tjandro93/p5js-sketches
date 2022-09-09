export interface Bounds {
  minX?: number;
  maxX: number;
  minY?: number;
  maxY: number;
}

export function validateBounds(bounds: Bounds): string[] {
  const errors: string[] = [];

  if ((bounds.minX ?? 0) >= bounds.maxX) {
    errors.push('minX must be strictly less than maxX');
  }
  if ((bounds.minY ?? 0) >= bounds.maxY) {
    errors.push('minY must be strictly less than maxY');
  }

  return errors;
}

export const enum OutOfBoundsPosition {
  Left = 'left',
  Top = 'top',
  Right = 'right',
  Bottom = 'bottom',
}
