// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import type { State } from 'state/reducer';
import prefixer from 'utils/class-name-prefixer';
import Timeline from './timeline';

class CodeStates extends Component {
  render() {
    return (
      <div className={prefixer('timeline-wrapper')}>
        <Timeline
          index={this.props.active_index}
          count={this.props.code_states.length}
        />
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
