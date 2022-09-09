import { DeepReadonly } from 'utility-types';

export const PlotterFriendlyDimensions: DeepReadonly<{
  letter: { width: number; height: number };
  square: { width: number; height: number };
}> = {
  letter: {
    width: 970,
    height: 750,
  },
  square: {
    width: 750,
    height: 750,
  },
};
