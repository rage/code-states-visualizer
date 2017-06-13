// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import type { State } from 'state/reducer';
import prefixer from 'utils/class-name-prefixer';

class Variables extends Component {
  render() {
    return (
      <div className={prefixer('variables-wrapper')}>
        { this.props.variables.map(stackFrame => (
          <table className={prefixer('variables')}>
            <tr>
              <th>Name</th>
              <th>Value</th>
            </tr>
            {stackFrame.map(key =>
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
    variables: state.codeStatesReducer.current_stack,
  };
}

export default connect(mapStateToProps)(Variables);
