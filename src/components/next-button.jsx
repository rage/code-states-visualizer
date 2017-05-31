// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import type { State, Dispatch } from 'state/reducer';
import { codeStateAction } from 'state/actions';
import prefixer from 'utils/class-name-prefixer';

class NextButton extends Component {
  render() {
    return (
      <button
        className={prefixer('next-button')}
        onClick={() => { this.props.onClick(this.props.index + 1); }}
        disabled={this.props.index === this.props.codeStatesLength - 1}
      >
        Next
      </button>
    );
  }
}

function mapStateToProps(state: State) {
  return {
    codeStatesLength: state.codeStatesReducer.code_states.length,
    index: state.codeStatesReducer.index,
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    onClick(index: number) {
      dispatch(codeStateAction(index));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(NextButton);
