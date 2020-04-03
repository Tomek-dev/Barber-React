import React, { Component } from 'react';

class Service extends Component{
    constructor(props){
        super(props)
    }

    render(){
        const serviceProps = this.props.service;
        return(
            <div className="service" key={this.props.key}>
                <div className="service-props">
                    <div className="service-element">
                       <p>{serviceProps.name}</p>
                        <p>{serviceProps.price}</p>
                    </div>
                    <div className="service-element">
                        <p>{serviceProps.description}</p>
                        <p>{serviceProps.time}</p>
                    </div>
                </div>
                <button onClick={this.props.onDelete}>
                    
                </button>
            </div>
        )
    }
}

export default Service;