import React from 'react';
import { Component } from 'react';
import Header from './component/header/Header';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { ACCESS_TOKEN } from './constans/Constant';
import { authenticatedUser } from "./util/ApiUtils";
import User from './component/user/User';
import LoginPage from './component/login/LoginPage';
import SignUpForm from './component/signup/SignUpForm';
import SettingsPage from './component/settings/SettingsPage';
import PrivateRoute from './component/common/PrivateRoute';
import Bottom from './component/bottom/Bottom';
import Loader from './component/common/loader/Loader';
import Error from './component/error/Error';
import Barber from './component/page/Barber';
import Index from './component/index/Index';
import Panel from './component/panel/Panel';
import OAuthProvider from './security/OAuthProvider';
import Search from './component/search/Search';
import './App.css';

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
  }

  handleLogin(){
    this.loadUser();
  }

  loadUser(){
    this.setState({
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
        isLoading: false
    });
    })
  }

  componentDidMount(){
    //localStorage.removeItem(ACCESS_TOKEN)
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
            <Switch>
              <Route exact path="/" component={Index}/>
              <Route path="/login" render={(props) => <LoginPage onLogin={this.handleLogin} {...props} />}/>
              <Route path="/businesses" component={SignUpForm}/>
              <Route path="/error/:status" component={Error}/>
              <Route path="/search" component={Search}/>
              <Route path="/oauth/redirect" render={(props) => <OAuthProvider onLogin={this.handleLogin} {...props} />}/>
              <Route path="/barber/:id" render={(props) => <Barber currentUser={this.state.user} {...props} />}/>
              <PrivateRoute authenticated={this.state.auth} path="/settings" type="basic" currentUser={this.state.user} component={SettingsPage}/>
              <PrivateRoute authenticated={this.state.auth} path="/visit" type="basic" currentUser={this.state.user} component={Panel}/>
              <PrivateRoute authenticated={this.state.auth} path="/profile" type="oauth" currentUser={this.state.user} component={User}/>
              <Route render={(props) => <Redirect to={{
                    pathname: '/error/404',
                    state: { from: props.location }
                }}/>}/>
            </Switch>                                             
          </div>
          <Bottom />
        </div>
      </Router>
    );
  }
}

export default App;
