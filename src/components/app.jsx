// @flow
import React, { Component } from 'react';
import prefixer from 'utils/class-name-prefixer';
import Code from './code';
import Variables from './variables';
import CodeStates from './code-states';
import ChangeStateButton from './change-state-button';

class App extends Component {
  render() {
    return (
      <div className={prefixer('container')}>
        <div className={prefixer('code-container')}>
          <Code />
          <Variables />
        </div>
        <div className={prefixer('timeline-container')}>
          <CodeStates />
          <div className={prefixer('button-container')}>
            <ChangeStateButton
              direction="prev"
            />
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
