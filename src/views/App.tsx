import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ThemeProvider } from 'styled-components';

import GlobalStyle from '~/application/styles/globalStyles';
import Theme from '~/application/styles/theme';

import Details from '~/views/Details';

const queryClient = new QueryClient();

const App = (): JSX.Element => (
  <ThemeProvider theme={Theme}>
    <QueryClientProvider client={queryClient}>
      <Router>
        <GlobalStyle />
        <Switch>
          <Route exact path='/:mediaId' component={Details} />
        </Switch>
      </Router>
    </QueryClientProvider>
  </ThemeProvider>
);

export default App;
