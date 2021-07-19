import loadable from '@loadable/component';
import { Dispatch, PayloadAction } from '@reduxjs/toolkit';
import { match } from 'react-router';
import { FETCH_HOMEPAGE } from 'src/ducks';

import ContactsPage from './pages/contacts';
import HomePage from './pages/home';
import SchedulePage from './pages/schedule';

//const HomePage = loadable(() => import('./pages/home/home'));

type RouterFetchDataArgs = {
  dispatch: Dispatch<PayloadAction>;
  match: match<{ slug: string }>;
};

export const routes = [
  {
    path: '/',
    component: HomePage,
    exact: true,
    fetchData({ dispatch }: RouterFetchDataArgs): void {
      dispatch(FETCH_HOMEPAGE());
    },
  },
  {
    path: '/home',
    component: HomePage,
    exact: true,
    fetchData({ dispatch }: RouterFetchDataArgs): void {
      dispatch(FETCH_HOMEPAGE());
    },
  },
  {
    path: '/contacts',
    component: ContactsPage,
    exact: true,
  },
  {
    path: '/schedule',
    component: SchedulePage,
    exact: true,
  },
];
