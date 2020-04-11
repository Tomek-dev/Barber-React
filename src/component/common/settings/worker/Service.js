import React, { Component } from 'react';

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
            <button className="worker-add-service-btn" onClick={this.handleClick}>
                <p>{service.name}</p>
                <p>{service.description}</p>
            </button>  
        )
    }
}

export default Service;