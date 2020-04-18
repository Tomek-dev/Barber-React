import React, { Component } from 'react';
import ProfileEdit from './ProfileEdit';
import BarberEdit from './BarberEdit';
import './Barber.css';
import SocialEdit from './social/SocialEdit';
import BarberSocial from './social/BarberSocial';

class Barber extends Component{
    constructor(props){
        super(props);
    }

    render(){
        if(this.props.display != 1){
            return null;
        }
        return(
            <div className="barber-settings-container">
                <div className="barber-owner-info">
                    <div className="barber-owner-props">
                        <p>Username: </p>
                        <p className="barber-owner-name">{this.props.currentUser.name}</p>
                    </div>
                    <ProfileEdit />
                </div>
                <div className="barber-settings-content">
                    <div className="barber-content-element barber-bottom">
                        <BarberEdit barber={this.props.barber}/>
                    </div>
                    <div className="barber-content-element">
                        <BarberSocial id={this.props.barber.id} />
                    </div>
                </div>
            </div>
        )
    }
}

export default Barber;