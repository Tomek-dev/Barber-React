import React from 'react';
import { Component } from 'react';
import Header from './component/common/header/Header';
import { BrowserRouter as Router, Route, withRouter } from 'react-router-dom';
import { ACCESS_TOKEN } from './constans/Constant';
import { authenticatedUser, signUp } from "./util/ApiUtils";
import Images from './component/common/images/Images';
import LoginPage from './component/common/login/LoginPage';
import SignUpForm from './component/form/SignUp/SignUpForm';
import './App.css';
import SettingsPage from './component/common/settings/SettingsPage';
import PrivateRoute from './component/common/PrivateRoute';

class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      user: null,
      auth: false,
      isLoading: false
    }
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.loadUser = this.loadUser.bind(this);
  }

  handleLogout(redirect="/"){
    localStorage.removeItem(ACCESS_TOKEN);

    this.setState({
      user: null,
      auth: false,
    });

    //this.context.history.push(redirect);
  }

  handleLogin(){
    this.loadUser();
    //this.context.history.push('/');
  }

  loadUser(){
    this.setState({
        ...this.state,
        isLoading: true
    });
    authenticatedUser().then(response => {
      this.setState({
        user: response,
        auth: true,
        isLoading: false
      });
    }).catch(e => {
      this.setState({
        ...this.state,
        isLoading: false
    });
    })
  }

  componentDidMount(){
    localStorage.removeItem(ACCESS_TOKEN);
    this.loadUser();
  }


  render() {
    return (
      <Router>
        <div className="app-container">
          <Header onLogout={this.handleLogout} currentUser={this.state.user} />
          <Route path="/login" render={(props) => <LoginPage onLogin={this.handleLogin} {...props} />}/>
          <Route path="/businesses" component={SignUpForm}/>
          <PrivateRoute authenticated={this.state.auth} path="/settings" component={SettingsPage}/>
        </div>
      </Router>
    );
  }
}

export default App;
