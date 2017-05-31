// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import type { State, Dispatch } from 'state/reducer';
import { codeStateAction } from 'state/actions';
import prefixer from 'utils/class-name-prefixer';

class PrevButton extends Component {
  render() {
    return (
      <button
        className={prefixer('prev-button')}
        onClick={() => { this.props.onClick(this.props.index - 1); }}
        disabled={this.props.index === 0}
      >
        Prev
      </button>
    );
  }
}

function mapStateToProps(state: State) {
  return {
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

export default connect(mapStateToProps, mapDispatchToProps)(PrevButton);
