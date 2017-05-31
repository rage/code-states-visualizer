// @flow
import React, { Component } from 'react';
import prefixer from 'utils/class-name-prefixer';
import Code from './code';
import CodeStates from './code-states';
import ChangeStateButton from './change-state-button';

class App extends Component {
  render() {
    return (
      <div className={prefixer('container')}>
        <Code />
        <CodeStates />
        <div className={prefixer('buttonContainer')}>
          <ChangeStateButton
            direction="prev"
          />
          <ChangeStateButton
            direction="next"
          />
        </div>
      </div>
    );
  }
}

export default App;
