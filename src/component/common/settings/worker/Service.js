import React, { Component } from 'react';
import './Service.css';

class Service extends Component{
    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick = (event) => {
        this.props.onClick(this.props.service.id);
    }

    render(){
        let service = this.props.service;
        return(
            <button type="button" className="worker-add-service-btn btn" onClick={this.handleClick}>
                <p className="worker-add-service-name">{service.name}</p>
                <p>{service.description}</p>
            </button>  
        )
    }
}

export default Service;