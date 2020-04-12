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
        del('/social/' + this.props.social.id).catch(e => {
            // ?? 
        })
        this.props.onEdit();
    }

    render(){
        const social = this.props.social;
        let logo;
        if(social.socialType === 'Facebook'){
            logo = <FaFacebook />
        }else if(social.socialType === 'Instagram'){
            logo = <FaInstagram />
        }else if(social.socialType === 'Twitter'){
            logo = <FaTwitterSquare />
        }else if(social.socialType === 'Messenger'){
            logo = <FaFacebookMessenger />
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