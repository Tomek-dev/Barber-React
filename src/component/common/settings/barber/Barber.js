import React, { Component } from 'react';
import ProfileEdit from './ProfileEdit';
import BarberEdit from './BarberEdit';
import './Barber.css';

class Barber extends Component{
    constructor(props){
        super(props);
    }

    render(){
        if(this.props.display != 1){
            return null;
        }
        return(
            <div className="barber-container">
                <div className="barber-owner-info">
                    <div className="barber-owner-props">
                        <p>Username: </p>
                        <p className="barber-owner-name">{this.props.currentUser.name}</p>
                    </div>
                    <ProfileEdit />
                </div>
                <div>
                    <BarberEdit barber={this.props.barber}/>
                </div>
            </div>
        )
    }
}

export default Barber;