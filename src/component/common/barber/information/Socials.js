import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaTwitterSquare, FaFacebookMessenger } from 'react-icons/fa';
import './Socials.css';

class Socials extends Component{
    constructor(props){
        super(props);
    }

    render(){
        const social = this.props.social;
        let logo;
        if(social.socialType === 'Facebook'){
            logo = <FaFacebook className="facebook social-logo"/>
        }else if(social.socialType === 'Instagram'){
            logo = <FaInstagram className="instagram social-logo"/>
        }else if(social.socialType === 'Twitter'){
            logo = <FaTwitterSquare className="twitter social-logo"/>
        }else if(social.socialType === 'Messenger'){
            logo = <FaFacebookMessenger className="messenger social-logo"/>
        }
        return(
            <div className="social-info-container">
                <a href={social.url}>{logo}</a>
            </div>
        )
    }
}

export default Socials;