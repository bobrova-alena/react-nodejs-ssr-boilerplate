import { IncomingHttpHeaders } from 'http';
import url from 'url';

import { ChunkExtractor, ChunkExtractorManager } from '@loadable/server';
import { AnyAction, Store } from '@reduxjs/toolkit';
import MobileDetect from 'mobile-detect';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { Provider } from 'react-redux';
import { matchPath, StaticRouterContext } from 'react-router';
import { StaticRouter } from 'react-router-dom';
import { END } from 'redux-saga';
import { App as MobileApp } from 'src/apps/mobile/App';
import { routes as mobileRoutes } from 'src/apps/mobile/routes';
import { rootSaga as mobileRootSaga } from 'src/apps/mobile/sagas';
import { App as WebApp } from 'src/apps/web/App';
import { routes as webRoutes } from 'src/apps/web/routes';
import { rootSaga as webRootSaga } from 'src/apps/web/sagas';
import { theme } from 'src/theme';
import { ServerStyleSheet, StyleSheetManager, ThemeProvider } from 'styled-components';

import appPath from '../../utils';

import { IServerApplicationState } from './store';

export const closeStore = (store: Store): END => store.dispatch(END);

export type RenderOptions = {
  rootSaga: () => Generator<unknown, any, unknown>;
  statsFile: string;
  entrypoints: string;
  App: () => JSX.Element;
  routes: Array<any>;
};

export function getRenderOptions(headers: IncomingHttpHeaders): RenderOptions {
  const mobileDetect = new MobileDetect(
    headers['user-agent'] ??
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
  );
  const isMobile = !!mobileDetect.mobile();
  return isMobile
    ? {
      rootSaga: mobileRootSaga,
      entrypoints: appPath.mobileAppName,
      statsFile: appPath.mobileLoadableStats,
      App: MobileApp,
      routes: mobileRoutes,
      }
    : {
      rootSaga: webRootSaga,
      entrypoints: appPath.webAppName,
      statsFile: appPath.webLoadableStats,
      App: WebApp,
      routes: webRoutes,
    };
}

export function getDataRequirements(
  store: Store<IServerApplicationState, AnyAction>,
  location: string,
  routes: Array<any>
): (Promise<void> | void)[] {
  const dataRequirements: (Promise<void> | void)[] = [];
  routes.some(route => {
    const { fetchData: fetchMethod } = route;
    const match = matchPath<{ slug: string }>(
      location ? url.parse(location).pathname ?? '/' : '/',
      route
    );

    if (match && fetchMethod) {
      dataRequirements.push(
        fetchMethod({
          dispatch: store.dispatch,
          match,
        })
      );
    }

    return Boolean(match);
  });

  return dataRequirements;
}

export function getHTML(
  data: string,
  store: Store,
  renderOptions: RenderOptions,
  context: StaticRouterContext,
  location: string
): string {
  const chunkExtractor = new ChunkExtractor({
    statsFile: renderOptions.statsFile,
    entrypoints: renderOptions.entrypoints,
  });
  const sheet = new ServerStyleSheet();
  const AppWithRouter = (
    <ChunkExtractorManager extractor={chunkExtractor}>
      <Provider store={store}>
        <StyleSheetManager sheet={sheet.instance}>
          <ThemeProvider theme={theme}>
            <StaticRouter location={location} context={context}>
              <renderOptions.App />
            </StaticRouter>
          </ThemeProvider>
        </StyleSheetManager>
      </Provider>
    </ChunkExtractorManager>
  );

  let app;
  let styleTags;
  try {
    app = ReactDOMServer.renderToString(AppWithRouter);
    styleTags = sheet.getStyleTags();
  } catch (e) {
    console.error(e);
  } finally {
    sheet.seal();
  }

  const scriptTags = chunkExtractor.getScriptTags();
  const linkTags = chunkExtractor.getLinkTags();

  return data
    .replace(
      '<div id="root"></div>',
      `<script>
       window.__PRELOADED_STATE__ = ${JSON.stringify(store.getState())}
     </script>
     ${scriptTags}
     <div id="root">${app}</div>`
    )
    .replace(
      '<title>Server side rendering</title>',
      `<title>Server side rendering</title>
       ${linkTags}
       ${styleTags}`
    );
}
