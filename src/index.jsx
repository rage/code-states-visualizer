import 'wicg-focus-ring';

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import createStore from 'state/store';

import './styles';
import App from './components/app';

/* eslint-disable */
try {
  require('babel-polyfill');
} catch (e) {
}
/* eslint-enable */

window.initCodeStatesVisualizer = function initCodeStatesVisualizer() {
  document.querySelectorAll('.code-states-visualizer-widget').forEach((element) => {
    const data = element.dataset.input;
    const store = createStore(data);
    render(
      <Provider store={store}>
        <App />
      </Provider>,
      element,
    );
  });
};
