// @flow
import React, { Component } from "react"
import { connect } from "react-redux"
import type { State, Dispatch } from "state/reducer"
import { codeStateAction } from "state/actions"
import prefixer from "utils/class-name-prefixer"

class ChangeStateButton extends Component {
  props: {
    direction: string,
    index: number,
    codeStatesLength: number,
    onClick: (index: number) => void,
  }

  disabled() {
    if (this.props.direction === "next") {
      return this.props.index === this.props.codeStatesLength - 1
    } else if (this.props.direction === "prev") {
      return this.props.index === 0
    }
    return true
  }

  render() {
    let className = prefixer("change-state-button")
    if (this.disabled()) {
      className += ` ${prefixer("disabled")}`
    }
    return (
      <button
        className={className}
        onClick={() => {
          this.props.onClick(this.props.index, this.props.direction)
        }}
        disabled={this.disabled()}
      >
        {this.props.direction.charAt(0).toUpperCase() +
          this.props.direction.substring(1, this.props.direction.length)}
      </button>
    )
  }
}

function mapStateToProps(state: State) {
  return {
    codeStatesLength: state.codeStatesReducer.code_states.length,
    index: state.codeStatesReducer.index,
  }
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    onClick(index: number, direction: string) {
      if (direction === "next") {
        dispatch(codeStateAction(index + 1))
      } else if (direction === "prev") {
        dispatch(codeStateAction(index - 1))
      } else {
        dispatch(codeStateAction(index))
      }
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChangeStateButton)
