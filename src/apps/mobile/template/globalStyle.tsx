import { createGlobalStyle } from 'styled-components';

import { fonts } from './fonts';

export const GlobalStyle = createGlobalStyle`
${fonts}

html {
  height: 100%;
}

body {
  margin: 0;
  height: 100%;
}

#root {
  height: 100%;
}
`;
