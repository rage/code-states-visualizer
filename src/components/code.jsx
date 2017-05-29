// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import type { State, Dispatch } from 'state/reducer';
import { codeStateAction } from 'state/actions';
import prefixer from 'utils/class-name-prefixer';
import CodeMirror from 'react-codemirror';
import 'codemirror/mode/clike/clike';

class Code extends Component {
  render() {
    return (
      <div className={prefixer('code')}>
        <CodeMirror
          value={this.props.code}
          options={{ readOnly: true, mode: 'text/x-java' }}
        />
      </div>
    );
  }
}

function mapStateToProps(state: State) {
  return {
    code: state.codeStatesReducer.code,
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    onChange(index: number) {
      dispatch(codeStateAction(index));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Code);
