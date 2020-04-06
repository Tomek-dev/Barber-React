import React, { Component } from 'react';
import LoginForm from '../form/LoginForm';
import SocialLogin from '../common/SocialLogin';

class LoginPage extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div className="login-page-container">
                <LoginForm />
                <SocialLogin />
            </div>
        )
    }
}