// @flow
import { applyMiddleware, createStore, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducer';

export type ThunkArgument = {
}

export default function makeStore(input: string) {
  /* eslint-disable no-underscore-dangle */
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  /* eslint-enable no-underscore-dangle */
  const store = createStore(
    rootReducer(input),
    composeEnhancers(
      applyMiddleware(thunk.withExtraArgument()),
    ),
  );
  return store;
}
