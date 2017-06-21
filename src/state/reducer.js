// @flow

import { combineReducers } from 'redux';

import codeStatesReducer from 'reducers/code-states-reducer';
import type { State as CodeStatesState } from 'reducers/code-states-reducer';

/* eslint-disable no-use-before-define */
export type ThunkAction = (dispatch: Dispatch, getState: GetState, arguments: ThunkArguments) => any;
/* eslint-enable no-use-before-define */
export type Action = { type: string, payload?: any } | ThunkAction | Promise<any>;

export type State = {
  codeStatesReducer: CodeStatesState,
}
export type Dispatch = (action: Action) => any;

export type ThunkArguments = {
};

export type GetState = () => State;

export default function reducerCreator(input: string) {
  return combineReducers({
    codeStatesReducer: codeStatesReducer(input),
  });
}
