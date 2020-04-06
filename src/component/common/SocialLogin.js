import React, { Component } from 'react';
import fbLogo from '../../img/fb-logo.png';
import googleLogo from '../../img/google-logo.png';
import githubLogo from '../../img/github-logo.png';
import { GOOGLE_AUTH_URL, FACEBOOK_AUTH_URL, GITHUB_AUTH_URL } from '../../constans/Constant';

class SocialLogin extends Component{

    render(){
        return(
            <div className="social-login">
                <a className="btn btn-google" href={GOOGLE_AUTH_URL}>
                    <img src={googleLogo} alt="Google"/>
                    Log in with Google
                </a>
                <a className="btn btn-facebook" href={FACEBOOK_AUTH_URL}>
                    <img src={fbLogo} alt="Facebook"/>
                    Log in with Facebook
                </a>
                <a className="btn btn-github" href={GITHUB_AUTH_URL}>
                    <img src={githubLogo} alt="Github"/>
                    Log in with Github
                </a>
            </div>
        )
    }
}

export default SocialLogin;