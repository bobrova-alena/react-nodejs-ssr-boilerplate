import { Store } from '@reduxjs/toolkit';
import { RouterState, connectRouter } from 'connected-react-router';
import { createMemoryHistory } from 'history';
import { routerMiddleware } from 'react-router-redux';
import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { numberReducer, NumberState } from 'src/ducks';

const sagaMiddleware = createSagaMiddleware();

export interface IServerApplicationState {
  numericData: NumberState;
  router: {
    location: {
      pathname: string;
      search: string;
      hash: string;
      key: string;
    };
    action: string;
  };
}

export const getInitialState = (pathname = '/'): IServerApplicationState => {
  return {
    numericData: {
      data: {
        number: 0,
      },
    },
    router: {
      location: { pathname, search: '', hash: '', key: '' },
      action: 'POP',
    } as RouterState,
  };
};
const history = createMemoryHistory({ initialEntries: ['/'] });

const createRootReducer = combineReducers<IServerApplicationState>({
  numericData: numberReducer,
  router: connectRouter(history),
});

export function configureServerStore(
  initialState: IServerApplicationState,
  url = '/'
): Store<IServerApplicationState> {
  const history = createMemoryHistory({ initialEntries: [url] });
  const store = createStore(
    createRootReducer,
    initialState,
    compose(applyMiddleware(routerMiddleware(history), sagaMiddleware))
  );

  return store;
}

export const runSaga = sagaMiddleware.run;
