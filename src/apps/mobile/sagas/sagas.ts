import { all } from '@redux-saga/core/effects';

function SETUP() {
  //FOR INITIAL LOADING
  console.log('App started');
}

export function* rootSaga(): Generator {
  yield all([SETUP()]);
}
