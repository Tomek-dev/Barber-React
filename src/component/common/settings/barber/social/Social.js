import React, { Component } from 'react';
import { FaFacebookMessenger, FaInstagram, FaTwitterSquare, FaTrashAlt, FaFacebook } from 'react-icons/fa';
import { del } from '../../../../../util/ApiUtils';
import SocialEdit from './SocialEdit';
import './Social.css';

class Social extends Component{
    constructor(props){
        super(props);
        this.handleDelete = this.handleDelete.bind(this);
    }

    handleDelete = () => {
        del('/social/' + this.props.social.id).then(() => this.props.onEdit()).catch(e => {
            this.props.onError(e.message);
        })
    }

    render(){
        const social = this.props.social;
        let logo;
        if(social.socialType === 'Facebook'){
            logo = <FaFacebook className="facebook"/>
        }else if(social.socialType === 'Instagram'){
            logo = <FaInstagram className="instagram"/>
        }else if(social.socialType === 'Twitter'){
            logo = <FaTwitterSquare className="twitter"/>
        }else if(social.socialType === 'Messenger'){
            logo = <FaFacebookMessenger className="messenger"/>
        }
        return(
            <div className="social-item">
                <div className="social-props">
                    {logo}
                    <p>{social.url}</p>
                </div>
                <div className="social-option">
                    <SocialEdit onEdit={this.props.onEdit} social={this.props.social}/>
                    <button onClick={this.handleDelete} className="social-delete-btn btn"><FaTrashAlt /></button>
                </div>
            </div>
        )
    }
}

export default Social;