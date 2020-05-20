// @flow
import React, { Component } from "react"
import { connect } from "react-redux"
import type { State } from "state/reducer"
import prefixer from "utils/class-name-prefixer"
import PropTypes from "prop-types"

class PrintOutput extends Component {
  render() {
    return (
      <div className={prefixer("output")}>
        <h4 className={prefixer("header")}>Output</h4>
        <div className={prefixer("output-content")}>
          {this.props.output.map((line, i) => (
            <div key={i}>{line}</div>
          ))}
        </div>
      </div>
    )
  }
}

function mapStateToProps(state: State) {
  return {
    output: state.codeStatesReducer.current_print_outputs,
  }
}

PrintOutput.propTypes = {
  output: PropTypes.array,
}

export default connect(mapStateToProps)(PrintOutput)
