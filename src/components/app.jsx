// @flow
import React, { Component } from 'react';
import prefixer from 'utils/class-name-prefixer';
import Code from './code';
import CodeStates from './code-states';

class App extends Component {
  render() {
    return (
      <div className={prefixer('container')}>
        <Code />
        <CodeStates />
      </div>
    );
  }
}

export default App;
