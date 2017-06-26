// @flow
import React, { Component } from 'react';
import prefixer from 'utils/class-name-prefixer';
import Code from './code';
import Variables from './variables';
import Exception from './exception';
import PrintOutput from './print-output';
import CodeStates from './code-states';
import ChangeStateButton from './change-state-button';
import StateCounter from './statecounter';

class App extends Component {
  render() {
    return (
      <div className={prefixer('container')}>
        <div className={prefixer('code-parts-container')}>
          <div className={prefixer('code-container')}>
            <Code />
          </div>
          <div className={prefixer('variables-container')}>
            <Variables />
          </div>
        </div>
        <Exception />
        <PrintOutput />
        <div className={prefixer('timeline-container')}>
          <CodeStates />
          <div className={prefixer('button-container')}>
            <ChangeStateButton
              direction="prev"
            />
            <StateCounter />
            <ChangeStateButton
              direction="next"
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
