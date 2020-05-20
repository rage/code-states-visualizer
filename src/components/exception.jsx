// @flow
import React, { Component } from "react"
import { connect } from "react-redux"
import type { State } from "state/reducer"
import prefixer from "utils/class-name-prefixer"
import PropTypes from "prop-types"

class Exception extends Component {
  render() {
    let className = prefixer("exception")
    if (this.props.exception !== "") {
      className += ` ${prefixer("active")}`
    }
    return (
      <div className={className}>
        <b>Program threw an exception:</b> {this.props.exception}
      </div>
    )
  }
}

function mapStateToProps(state: State) {
  return {
    exception: state.codeStatesReducer.current_exception,
  }
}

Exception.propTypes = {
  exception: PropTypes.string,
}

export default connect(mapStateToProps)(Exception)
