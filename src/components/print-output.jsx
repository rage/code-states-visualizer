// @flow
import React, { Component } from "react"
import { connect } from "react-redux"
import type { State } from "../state/reducer"
import prefixer from "../utils/class-name-prefixer"

type Props = {
  output: [],
}

class PrintOutput extends Component<Props> {
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

export default connect<Props, *, *, *, *, *>(mapStateToProps)(PrintOutput)
