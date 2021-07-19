import { all } from '@redux-saga/core/effects';
import { counterSagas } from 'src/ducks';

function SETUP() {
  //FOR INITIAL LOADING
  console.log('App started');
}

export function* rootSaga(): Generator {
  yield all([counterSagas.default(), SETUP()]);
}
