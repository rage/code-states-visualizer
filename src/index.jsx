import "focus-visible"

import React from "react"
import { render } from "react-dom"
import { Provider } from "react-redux"
import createStore from "state/store"

import "./styles"
import App from "./components/app"
import PropTypes from "prop-types"

/* eslint-disable */
try {
  require("core-js/stable")
  require("regenerator-runtime/runtime")
} catch (e) {}
/* eslint-enable */

const CodeStatesVisualizer = ({ input }) => {
  const store = createStore(input)
  return (
    <Provider store={store}>
      <App />
    </Provider>
  )
}

if (typeof window !== "undefined") {
  window.initCodeStatesVisualizer = function initCodeStatesVisualizer() {
    document
      .querySelectorAll(".code-states-visualizer-widget")
      .forEach((element) => {
        const input = element.dataset.input
        render(<CodeStatesVisualizer input={input} />, element)
      })
  }
}

CodeStatesVisualizer.propTypes = {
  input: PropTypes.string,
}

export default CodeStatesVisualizer
