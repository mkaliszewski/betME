import { Switch, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';

import { RacesView, RaceView } from './views';
import { theme, GlobalStyle } from './styles/theme';
import { Layout } from './components/Layout';
import { ErrorBoundary } from './components/ErrorBoundary';

export const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Layout>
        <ErrorBoundary>
          <Switch>
            <Route path="/" exact>
              <RacesView />
            </Route>
            <Route path="/race/:id">
              <RaceView />
            </Route>
          </Switch>
        </ErrorBoundary>
      </Layout>
    </ThemeProvider>
  );
};
