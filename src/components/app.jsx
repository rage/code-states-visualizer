// @flow
import React, { Component } from 'react';
import prefixer from 'utils/class-name-prefixer';
import Code from './code';

class App extends Component {
  render() {
    return (
      <div className={prefixer('container')}>
        <Code />
      </div>
    );
  }
}

export default App;
