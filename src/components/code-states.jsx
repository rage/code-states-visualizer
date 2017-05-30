// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import type { State } from 'state/reducer';
import prefixer from 'utils/class-name-prefixer';
import CodeState from './code-state';

class CodeStates extends Component {
  render() {
    return (
      <div className={prefixer('timeline-wrapper')}>
        <div className={prefixer('timeline-line')} />
        <div className={prefixer('code-states')}>
          {this.props.code_states.map((state, i) => (
            <CodeState
              key={i.toString()}
              index={i}
              active={this.props.active_index === i}
            />
          ))}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state: State) {
  return {
    code_states: state.codeStatesReducer.code_states,
    active_index: state.codeStatesReducer.index,
  };
}

export default connect(mapStateToProps)(CodeStates);
