import * as breakpoints from './breakpoints';
import * as colors from './colors';
import * as layout from './layout';

export const theme = {
  ...colors,
  ...layout,
  ...breakpoints,
  styles: {
    body: {
      margin: 0,
    },
  },
};
