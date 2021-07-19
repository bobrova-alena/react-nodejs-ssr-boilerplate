import { loadableReady } from '@loadable/component';
import { ConnectedRouter } from 'connected-react-router';
import React, { Suspense } from 'react';
import { hydrate } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { theme } from 'src/theme';
import { ThemeProvider } from 'styled-components';

import { App } from './App';
import { rootSaga } from './sagas';
import { configureStore, IApplicationState } from './store';

declare global {
  interface Window {
    __PRELOADED_STATE__: IApplicationState;
  }
}

const preloadedState = window.__PRELOADED_STATE__;
const { store, history, runSaga } = configureStore(preloadedState);

runSaga(rootSaga);

loadableReady(() => {
  hydrate(
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <ConnectedRouter history={history}>
          <BrowserRouter>
            <Suspense fallback={<div>Loading...</div>}>
              <App />
            </Suspense>
          </BrowserRouter>
        </ConnectedRouter>
      </ThemeProvider>
    </Provider>,
    document.getElementById('root')
  );
});
