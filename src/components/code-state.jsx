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
    active: boolean,
  }

  render() {
    let className = prefixer('code-state');
    if (this.props.active) {
      className += ` ${prefixer('active')}`;
    }
    return (
      <button
        className={className}
        onClick={() => { this.props.onClick(this.props.index); }}
      >
        {this.props.index + 1}
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
