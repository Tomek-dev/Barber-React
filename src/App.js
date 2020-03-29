import React from 'react';
import { Component } from 'react';
import Header from '../src/component/Header'

class App extends Component{

  /*state =
  {
    data: []
  }

  componentDidMount() {
    fetch('http://localhost:8080/api/barber/1')
    .then(response => response.json())
    .then(data => {
        console.log(data);
        this.setState({ data });
    });
  }*/

  render() {
    return (
      <Header />
    );
  }
}

export default App;
