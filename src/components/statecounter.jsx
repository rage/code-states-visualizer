// @flow
import React, { Component } from "react"
import { connect } from "react-redux"
import type { State } from "../state/reducer"
import prefixer from "../utils/class-name-prefixer"

type Props = {
  states: [],
  index: number,
}

class StateCounter extends Component<Props> {
  render() {
    return (
      <div className={prefixer("state-counter")}>
        {`${this.props.index + 1} / ${this.props.states.length}`}
      </div>
    )
  }
}

function mapStateToProps(state: State) {
  return {
    states: state.codeStatesReducer.code_states,
    index: state.codeStatesReducer.index,
  }
}

export default connect<Props, *, *, *, *, *>(mapStateToProps)(StateCounter)
