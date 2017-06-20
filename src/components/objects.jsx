// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import type { State } from 'state/reducer';
import prefixer from 'utils/class-name-prefixer';

class Variables extends Component {
  render() {
    return (
      <div className={prefixer('variables-wrapper')}>
        { this.props.heap.map(object => (
          <div>
            <table>
              <tr>
                <th>{object[0]}</th>
              </tr>
            </table>
          </div>
          ))}
      </div>
    );
  }
}

function mapStateToProps(state: State) {
  return {
    heap: state.codeStatesReducer.current_heap,
  };
}

export default connect(mapStateToProps)(Variables);
