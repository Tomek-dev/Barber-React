import React, { Component } from 'react';
import { del } from '../../../../util/ApiUtils';
import { FaTrashAlt } from 'react-icons/fa';
import ServiceEdit from './ServiceEdit';

class ServiceItem extends Component{
    constructor(props){
        super(props);
        this.handleDelete = this.handleDelete.bind(this);
    }

    handleDelete(){
        del('/service/' + this.props.service.id).then(response => {
            console.log("test")
            this.props.onEdit();
        }).catch(e => {
            this.props.onError(e.message || 'Sorry! Something went wrong. Please try again!');
        })
        this.props.onEdit();
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
                    <ServiceEdit onEdit={this.props.onEdit} service={service} />
                    <button onClick={this.handleDelete}><FaTrashAlt /></button>
                </div>
            </div>
        )
    }
}
export default ServiceItem;