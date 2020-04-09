import React, { Component } from 'react';
import LoginForm from './LoginForm';
import SocialLogin from './SocialLogin';
import './LoginPage.css'


class LoginPage extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div className="login-page-container">
                <div className="login-page-content">
                    <div className="login-method">
                        <LoginForm />
                    </div>
                    <div className="login-method side">
                        <SocialLogin />
                    </div>
                </div>
            </div>
        )
    }
}

export default LoginPage;