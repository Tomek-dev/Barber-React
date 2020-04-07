import React from 'react';
import { Component } from 'react';
import Header from './component/common/header/Header';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { ACCESS_TOKEN } from './constans/Constant';
import { authenticatedUser, signUp } from "./util/ApiUtils";
import Images from './component/common/images/Images';
import LoginPage from './component/page/LoginPage';
import SignUpForm from './component/form/SignUpForm';
import BarberForm from './component/form/barber_form/BarberForm';
import './App.css';

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
    const images = [];

    return (
      <Router>
        <div className="app-container">
          <Header />
          <Route path="/login" component={LoginPage}/>
          <Route path="/register" component={SignUpForm}/>
          <Route path="/business-create" component={BarberForm}/>
        </div>
      </Router>
    );
  }
}

export default App;
