// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import type { State } from 'state/reducer';
import prefixer from 'utils/class-name-prefixer';

class Variables extends Component {
  render() {
    return (
      <div className={prefixer('variables-wrapper')}>
        {this.props.stack.map((stackFrame) => {
          let localsClassName = prefixer('variables');
          let globalsClassName = prefixer('variables');
          if (stackFrame.encoded_locals && stackFrame.func_name !== '<module>') {
            localsClassName += ` ${prefixer('active')}`;
          } else {
            globalsClassName += ` ${prefixer('active')}`;
          }
          return (
            <div>
              {stackFrame.global_variables &&
                Object.keys(stackFrame.global_variables).length > 0 && (
                  <div className={prefixer('variables-table-wrapper')}>
                    <table className={globalsClassName}>
                      <thead>
                        <tr>
                          <th colSpan="2" className={prefixer('table-header')}>
                          Global variables
                        </th>
                        </tr>
                        <tr>
                          <th>Name</th>
                          <th>Value</th>
                        </tr>
                      </thead>
                      <tbody className={prefixer('table-content-wrapper')}>
                        {stackFrame.global_variables.map((key) => {
                          const value = key[1];
                          const valueClass =
                            value.toString().indexOf('\n') > 0
                              ? prefixer('wrapwhitespace')
                              : '';
                          return (
                            <tr>
                              <td>{key[0]}</td>
                              <td className={valueClass}>{key[1]}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                )}
              {stackFrame.encoded_locals && stackFrame.func_name !== '<module>' && (
                <div className={prefixer('variables-table-wrapper')}>
                  <table className={localsClassName}>
                    <tr>
                      <th colSpan="2" className={prefixer('table-header')}>
                        {stackFrame.func_name}
                      </th>
                    </tr>
                    <tr>
                      <th>Name</th>
                      <th>Value</th>
                    </tr>
                    <tbody className={prefixer('table-content-wrapper')}>
                      {stackFrame.encoded_locals.map((key) => {
                        const value = key[1];
                        const valueClass =
                          value.toString().indexOf('\n') > 0
                            ? prefixer('wrapwhitespace')
                            : '';
                        return (
                          <tr>
                            <td>{key[0]}</td>
                            <td className={valueClass}>{key[1]}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          );
        })}
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
