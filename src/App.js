import React from 'react';
import { Component } from 'react';
import Header from './component/common/header/Header';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { ACCESS_TOKEN } from './constans/Constant';
import { authenticatedUser, signUp } from "./util/ApiUtils";
import Images from './component/common/images/Images';
import LoginPage from './component/common/login/LoginPage';
import SignUpForm from './component/form/signup/SignUpForm';
import './App.css';
import SettingsPage from './component/common/settings/SettingsPage';
import PrivateRoute from './component/common/PrivateRoute';
import Bottom from './component/common/bottom/Bottom';
import Loader from './component/common/loader/Loader';
import Error from './component/common/error/Error';
import Barber from './component/common/barber/Barber';

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
    if(this.state.isLoading){
      return <Loader isLoading={this.state.isLoading} />;
    }
    return (
      <Router>
        <div className="app-container">
          <Header onLogout={this.handleLogout} currentUser={this.state.user} />
          <div className="app-content">
            <Route exact path="/" />
            <Route path="/login" render={(props) => <LoginPage onLogin={this.handleLogin} {...props} />}/>
            <Route path="/businesses" component={SignUpForm}/>
            <Route path="/error/:status" component={Error}/>
            <Route path="/barber/:id" render={(props) => <Barber currentUser={this.state.currentUser} {...props} />}/>
            <PrivateRoute authenticated={this.state.auth} path="/settings" currentUser={this.state.user} component={SettingsPage}/>
          </div>
          <Bottom />
        </div>
      </Router>
    );
  }
}

export default App;
