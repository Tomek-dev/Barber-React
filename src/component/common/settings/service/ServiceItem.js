import React, { Component } from 'react';
import { del } from '../../../../util/ApiUtils';
import { FaTrashAlt } from 'react-icons/fa';

class ServiceItem extends Component{
    constructor(props){
        super(props);
        this.handleDelete = this.handleDelete.bind(this);
    }

    handleDelete(){
        del('/service/' + this.props.id).catch(e => {
            this.props.onError(e.message || 'Sorry! Something went wrong. Please try again!');
        })
    }

    render(){
        const service = this.props.service;
        return(
            <div className="service-item">
                <div className="service-element">
                    <p>{service.name}</p>
                    <p>{service.time}</p>
                </div>
                <div className="service-element">
                    <p>{service.description}</p>
                    <p>{service.price}</p>
                </div>
                <div>
                    <button onClick={this.handleDelete}><FaTrashAlt /></button>
                </div>
            </div>
        )
    }
}
export default ServiceItem;