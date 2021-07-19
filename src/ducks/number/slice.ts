/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { NumberRequest, INumberResponse, IHomePageResponse } from './transport';

export type NumericData = {
  number: number;
};

export type NumberState = {
  data: NumericData;
};

const numberAdapter = createEntityAdapter<NumberState>();

const initialState = numberAdapter.getInitialState({
  data: {
    number: 0,
  },
});

const numberSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    setNumber(state: NumberState, action: PayloadAction<INumberResponse>) {
      state.data.number = action.payload?.number;
    },
    setHomePage(state: NumberState, action: PayloadAction<IHomePageResponse>) {
      state.data.number = action.payload?.data.number;
    },

    //sagas
    GET_NUMBER(_state: NumberState): void {},
    FETCH_HOMEPAGE(): void {},
    POST_NUMBER(_state: NumberState, _action: PayloadAction<NumberRequest>): void {},
  },
});

export const numberReducer = numberSlice.reducer;

export const { GET_NUMBER, setNumber, POST_NUMBER, FETCH_HOMEPAGE } = numberSlice.actions;
