import React, { Component } from 'react';
import './Service.css';
import Reservation from './Reservation';

class Service extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div className="service">
                <div className="service-info">
                    <div className="service-panel-element service-left">
                        <p>{this.props.service.name}</p>
                        <p>{this.props.service.description}</p>
                    </div>
                    <div className="service-panel-element service-right">
                        <p>{this.props.service.time} min</p>
                        <p>{this.props.service.price} $</p>
                    </div>
                </div>
                <div className="service-reservation">
                    <Reservation />
                </div>
            </div>
        );
    }
}

export default Service;