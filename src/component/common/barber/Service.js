import React, { Component } from 'react';

class Service extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div className="service">
                <div className="service-info">
                    <div className="service-element">
                        <p>{this.props.service.name}</p>
                        <p>{this.props.service.price}</p>
                    </div>
                    <div className="service-element">
                        <p>{this.props.service.description}</p>
                        <p>{this.props.service.time}</p>
                    </div>
                </div>
                <button className="service-button">Reservation</button>
            </div>
        );
    }
}

export default Service;