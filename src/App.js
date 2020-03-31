import React from 'react';
import { Component } from 'react';
import SignUp from './component/form/SignUp';
import Login from './component/form/Login';
import Change from './component/form/Change';

class App extends Component{

  render() {
    return (
      <div className="app-container">
        <Change />
      </div>
    );
  }
}

export default App;
