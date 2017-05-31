// @flow
import React, { Component } from 'react';
import prefixer from 'utils/class-name-prefixer';
import Code from './code';
import CodeStates from './code-states';
import PrevButton from './prev-button';
import NextButton from './next-button';

class App extends Component {
  render() {
    return (
      <div className={prefixer('container')}>
        <Code />
        <CodeStates />
        <PrevButton />
        <NextButton />
      </div>
    );
  }
}

export default App;
