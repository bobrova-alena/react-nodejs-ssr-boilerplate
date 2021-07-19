/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { ErrorBoundary } from 'src/components';

import { routes } from './routes';

export function App(): JSX.Element {
  return (
    <ErrorBoundary>
      <Switch>
        {routes.map(({ /*fetchData,*/ ...routeProps }) => (
          <Route key={routeProps.path} {...routeProps} />
        ))}
      </Switch>
    </ErrorBoundary>
  );
}
