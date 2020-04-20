import React, { Component } from 'react';
import fbLogo from '../../image/fb-logo.png';
import googleLogo from '../../image/google-logo.png';
import githubLogo from '../../image/github-logo.png';
import { GOOGLE_AUTH_URL, FACEBOOK_AUTH_URL, GITHUB_AUTH_URL } from '../../constans/Constant';
import './SocialLogin.css'

class SocialLogin extends Component{

    render(){
        return(
            <div className="social-login">
                <p className="social-paragraph">Login as user</p>
                <p className="social-info-paragraph">You will be able to arrange a visit and also rate barber shop's.</p>
                <a className="social-btn" href={GOOGLE_AUTH_URL}>
                    <img src={googleLogo} alt="Google"/>
                    Log in with Google
                </a>
                <a className="social-btn" href={FACEBOOK_AUTH_URL}>
                    <img src={fbLogo} alt="Facebook"/>
                    Log in with Facebook
                </a>
                <a className="social-btn" href={GITHUB_AUTH_URL}>
                    <img src={githubLogo} alt="Github"/>
                    Log in with Github
                </a>
            </div>
        )
    }
}

export default SocialLogin;