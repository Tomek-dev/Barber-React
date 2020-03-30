import React from 'react';
import { Component } from 'react';
import Header from '../src/component/Header'
import ReactNotification from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'

class App extends Component{

  render() {
    return (
      <div className="app-container">
        <ReactNotification />
      </div>
    );
  }
}

export default App;
