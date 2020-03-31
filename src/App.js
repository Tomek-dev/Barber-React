import React from 'react';
import { Component } from 'react';
import SignUp from './component/form/SignUp';
import Login from './component/form/Login';

class App extends Component{

  render() {
    return (
      <div className="app-container">
        <SignUp />
      </div>
    );
  }
}

export default App;
