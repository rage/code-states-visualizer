import 'wicg-focus-ring';

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import createStore from 'state/store';

import './styles';
import App from './components/app';

/* eslint-disable */
try {
  require("babel-polyfill");
} catch (e) {}
/* eslint-enable */

const CodeStatesVisualizer = ({ input, language }) => {
  const store = createStore(input, language);
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

if (typeof window !== 'undefined') {
  window.initCodeStatesVisualizer = function initCodeStatesVisualizer() {
    document
      .querySelectorAll('.code-states-visualizer-widget')
      .forEach((element) => {
        const input = element.dataset.input;
        const language = element.dataset.language;
        render(<CodeStatesVisualizer input={input} language={language} />, element);
      });
  };
}

export default CodeStatesVisualizer;
