// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import type { State } from 'state/reducer';
import prefixer from 'utils/class-name-prefixer';

class Variables extends Component {
  render() {
    return (
      <div className={prefixer('variables-wrapper')}>
        { this.props.stack.map(stackFrame => (
          <table className={prefixer('variables')}>
            <tr>
              <th colSpan="2">{stackFrame.func_name}</th>
            </tr>
            <tr>
              <th>Name</th>
              <th>Value</th>
            </tr>
            { stackFrame.encoded_locals.map(key =>
               (
                 <tr>
                   <td>{key[0]}</td>
                   <td>{key[1]}</td>
                 </tr>
              ))}
          </table>
        ),
        )}
      </div>
    );
  }
}

function mapStateToProps(state: State) {
  return {
    stack: state.codeStatesReducer.current_stack,
  };
}

export default connect(mapStateToProps)(Variables);
