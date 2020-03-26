import React from 'react';
import { Component } from 'react';

class App extends Component{


  componentDidMount() {
    fetch("")
    .then(response => response.json)
    .then(data => {
        console.log(data);
        this.setState({ data });
    });
  }

  render() {
    return (
      <div>
        Hello World!
      </div>
    );
  }
}

export default App;
