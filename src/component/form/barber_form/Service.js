import React, { Component } from 'react';

class Service extends Component{
    constructor(props){
        super(props)
        this.handleDelete = this.handleDelete.bind(this);
    }

    handleDelete= (event) => {
        this.props.onDelete(event);
    }

    render(){
        const serviceProps = this.props.service;
        return(
            <div className="service">
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
                <button value={serviceProps} onClick={this.handleDelete}>
                    Delete
                </button>
            </div>
        )
    }
}

export default Service;