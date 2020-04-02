import React from 'react';
import { Component } from 'react';
import Header from './component/common/Header';
import { BrowserRouter as Router } from 'react-router-dom';
import { ACCESS_TOKEN } from './constans/Constant';
import { authenticatedUser } from "./util/ApiUtils";

class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      user: null,
      isAuthenticated: false,
    }
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.loadUser = this.loadUser.bind(this);
  }

  handleLogout(redirect="/"){
    localStorage.removeItem(ACCESS_TOKEN);

    this.setState({
      user: null,
      isAuthenticated: false
    });

    this.context.history.push(redirect);
  }

  handleLogin(){
    this.loadUser();
    this.context.history.push('/')
  }

  loadUser(){
    authenticatedUser().then(response => {
      this.setState({
        user: response,
        isAuthenticated: true
      });
    }).catch(e => {
      // ??
    })
  }

  componentDidMount(){
    // this.loadUser();
  }

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
