import { createTheme } from '@mui/material/styles';
import { teal } from '@mui/material/colors';

import { createGlobalStyle } from 'styled-components';

export const theme = createTheme({
  palette: {
    primary: {
      main: teal[500],
    },
  },
});

export const GlobalStyle = createGlobalStyle`
html {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}
body {
    font-family: 'Roboto', sans-serif;
    box-sizing: border-box;
    font-weight: 400;
    overflow-x: hidden;
    margin: inherit;
    padding: inherit;
}
*, *:before, *:after {
  box-sizing: border-box;;
}
p, a, ul, ol {
  font-size: 16px;
}
a {
  text-decoration: none;
  :hover {
    text-decoration: none;
  }
}
`;
