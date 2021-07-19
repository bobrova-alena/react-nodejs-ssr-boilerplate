import { combineReducers, Store } from '@reduxjs/toolkit';
import {
  BrowserHistory,
  createBrowserHistory,
  createMemoryHistory,
  MemoryHistory,
  State,
} from 'history';
import { routerReducer, RouterState, routerMiddleware } from 'react-router-redux';
import { applyMiddleware, createStore } from 'redux';
import createSagaMiddleware, { END, Saga, Task } from 'redux-saga';
import { numberReducer, NumberState, NumericData } from 'src/ducks';

export interface IApplicationState {
  router: RouterState;
  numericData: NumberState;
}

const createRootReducer = combineReducers<IApplicationState>({
  router: routerReducer,
  numericData: numberReducer,
});

export const isServer = !(
  typeof window !== 'undefined' &&
  window.document &&
  window.document.createElement
);

export function configureStore(
  preloadedState: IApplicationState,
  url = '/'
): {
  store: Store<IApplicationState>;
  history: MemoryHistory<State> | BrowserHistory<State>;
  runSaga: <S extends Saga<any[]>>(saga: S, ...args: Parameters<S>) => Task;
} {
  const history = isServer
    ? createMemoryHistory({ initialEntries: [url] })
    : createBrowserHistory();
  const sagaMiddleware = createSagaMiddleware();
  const runSaga = sagaMiddleware.run;
  const store = createStore(
    createRootReducer,
    preloadedState,
    applyMiddleware(routerMiddleware(history), sagaMiddleware)
  );

  return { store, history, runSaga };
}

export function getHomepage(state: IApplicationState): NumericData {
  return state.numericData.data;
}

export const selectNumber = (state: IApplicationState): number => state.numericData.data.number;
