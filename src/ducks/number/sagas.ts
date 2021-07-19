import { all, takeEvery, put } from '@redux-saga/core/effects';
import { PayloadAction } from '@reduxjs/toolkit';

import * as api from './api';
import { FETCH_HOMEPAGE, GET_NUMBER, POST_NUMBER, setNumber } from './slice';
import { NumberRequest, INumberResponse, IHomePageResponse } from './transport';

function* GetNumericData() {
  try {
    const response = (yield api.getNumber()) as INumberResponse;
    yield put(setNumber(response));
  } catch (e) {
    console.log(e);
  }
}

function* PostNumericData(action: PayloadAction<NumberRequest>) {
  try {
    yield api.postNumber(action.payload);
    yield put(setNumber(action.payload));
  } catch (e) {
    console.log(e);
  }
}

function* fetchHomepageData() {
  try {
    const response = (yield api.getHomePage()) as IHomePageResponse;
    yield put(setHomePage(response));
  } catch (e) {
    console.log(e);
  }
}

export default function* rootCounterSaga(): unknown {
  yield all([
    yield takeEvery(GET_NUMBER.toString(), GetNumericData),
    yield takeEvery(POST_NUMBER.toString(), PostNumericData),
    yield takeEvery(FETCH_HOMEPAGE.toString(), fetchHomepageData),
  ]);
}
function setHomePage(response: IHomePageResponse): any {
  throw new Error('Function not implemented.');
}
