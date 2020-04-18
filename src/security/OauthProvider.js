import React, { Component } from 'react';
import { ACCESS_TOKEN } from '../constans/Constant'
import { Redirect } from 'react-router-dom';

class OAuthProvider extends Component {
    getUrlParameter(name) {
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');

        var results = regex.exec(this.props.location.search);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    }

    render(){
        const token = this.getUrlParameter('token');
        const error = this.getUrlParameter('error');
        if(token){
            localStorage.setItem(ACCESS_TOKEN, token);
            this.props.onLogin();
            return <Redirect to={{
                pathname: "/",
                state: { from: this.props.location }
            }}/>
        }else{
            return <Redirect to={{
                pathname: "/login",
                state: {
                    from: this.props.location,
                    error: error
                }
            }}/>
        }
    }
}

export default OAuthProvider;