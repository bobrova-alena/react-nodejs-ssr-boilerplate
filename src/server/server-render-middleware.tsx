import fs from 'fs';

import { Store } from '@reduxjs/toolkit';
import { Request, Response } from 'express';
import React from 'react';
import { StaticRouterContext } from 'react-router';
import { END } from 'redux-saga';

import appPath from '../../utils/path';

import {
  closeStore,
  getDataRequirements,
  getHTML,
  getRenderOptions,
  RenderOptions,
} from './render-utils';
import { configureServerStore, getInitialState, runSaga } from './store';

export async function serverRender(req: Request, res: Response): Promise<END> {
  const renderOptions = getRenderOptions(req.headers);
  const location = req.url;
  const store = configureServerStore(getInitialState(location), location);

  //const rootSaga = loadable(() => import(`../apps/${isMobile ? 'mobile' : 'web'}/sagas`)) as any;

  runSaga(renderOptions.rootSaga)
    .toPromise()
    .then(() => renderApp(res, store, renderOptions, location))
    .catch(err => {
      throw err;
    });

  const dataRequirements = getDataRequirements(store, location, renderOptions.routes);

  return Promise.all(dataRequirements)
    .then(() => closeStore(store))
    .catch(err => {
      throw err;
    });
}

function renderApp(res: Response, store: Store, renderOptions: RenderOptions, location: string) {
  const context: StaticRouterContext = { url: undefined };

  if (context.url) {
    res.redirect(context.url);
    return;
  }

  res.status(context.statusCode || 200);
  fs.readFile(`${appPath.publicFolder}/app.html`, 'utf8', async (err, data) => {
    if (err) {
      console.error('Something went wrong:', err);
      return res.status(500).send('The html file not found!');
    }

    return res.send(getHTML(data, store, renderOptions, context, location));
  });
}
