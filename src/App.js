import React from 'react';
import { Component } from 'react';
import Header from './component/common/Header';
import { BrowserRouter as Router } from 'react-router-dom';

class App extends Component{

  render() {
    return (
      <Router>
        <div className="app-container">
          <Header />
        </div>
      </Router>
    );
  }
}

export default App;
