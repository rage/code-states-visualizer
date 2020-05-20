// @flow
import React, { Component } from "react"
import { connect } from "react-redux"
import type { State } from "state/reducer"
import prefixer from "utils/class-name-prefixer"
import PropTypes from "prop-types"

class StateCounter extends Component {
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

StateCounter.propTypes = {
  states: PropTypes.array,
  index: PropTypes.number,
}

export default connect(mapStateToProps)(StateCounter)
