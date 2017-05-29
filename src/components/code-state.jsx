// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import type { Dispatch } from 'state/reducer';
import { codeStateAction } from 'state/actions';
import prefixer from 'utils/class-name-prefixer';

class CodeState extends Component {
  props: {
    index: number,
    onClick: (index: number) => void,
  }

  render() {
    return (
      <button
        className={prefixer('code-state')}
        onClick={() => { this.props.onClick(this.props.index); }}
      >
        {this.props.index}
      </button>
    );
  }
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    onClick(index: number) {
      dispatch(codeStateAction(index));
    },
  };
}

export default connect(null, mapDispatchToProps)(CodeState);
