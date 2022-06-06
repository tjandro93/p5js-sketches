export function sum(vals: number[]): number {
  return vals.reduce((workingSum, val) => workingSum + val, 0);
}
