import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';

import { RacesView, RaceView } from './views';
import { theme, GlobalStyle } from './styles/theme';
import { Layout } from './components/Layout';
import { ErrorBoundary } from './components/ErrorBoundary';
import { StoreProvider, initialState, reducer } from './store';

export const App = () => {
  const getInitialState = () => {
    const storedValue = localStorage.getItem('state');
    if (storedValue) {
      return JSON.parse(storedValue);
    }

    return initialState;
  };
  const initial = getInitialState();

  console.log(initial);
  return (
    <StoreProvider initialState={initial} reducer={reducer}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Router>
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
        </Router>
      </ThemeProvider>
    </StoreProvider>
  );
};
