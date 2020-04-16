import React, { Component } from 'react';
import './Service.css';
import Reservation from './Reservation';

class Service extends Component{
    constructor(props){
        super(props);
    }

    render(){
        const service = this.props.service;
        return(
            <div className="service">
                <div className="service-info">
                    <div className="service-panel-element service-left">
                        <p>{service.name}</p>
                        <p>{service.description}</p>
                    </div>
                    <div className="service-panel-element service-right">
                        <p>{service.time} min</p>
                        <p>{service.price} $</p>
                    </div>
                </div>
                <div className="service-reservation">
                    <Reservation service={service.id} id={this.props.id}/>
                </div>
            </div>
        );
    }
}

export default Service;