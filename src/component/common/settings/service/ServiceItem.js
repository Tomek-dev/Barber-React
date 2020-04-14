import React, { Component } from 'react';
import { del } from '../../../../util/ApiUtils';
import { FaTrashAlt } from 'react-icons/fa';
import ServiceEdit from './ServiceEdit';
import './ServiceItem.css'

class ServiceItem extends Component{
    constructor(props){
        super(props);
        this.handleDelete = this.handleDelete.bind(this);
    }

    handleDelete(){
        del('/service/' + this.props.service.id).then(() => {
            this.props.onEdit();
        }).catch(e => {
            this.props.onError(e.message || 'Sorry! Something went wrong. Please try again!');
        })
    }

    render(){
        const service = this.props.service;
        return(
            <div className="service-item">
                <div className="service-item-props">
                    <div className="service-element service-left">
                        <p className="service-item-name">{service.name}</p>
                        <p>{service.description}</p>
                    </div>
                    <div className="service-element service-right">
                        <p>{service.time} min</p>
                        <p>{service.price} $</p>
                    </div>
                </div>
                <div className="service-option">
                    <ServiceEdit onEdit={this.props.onEdit} service={service} />
                    <button className="btn service-delete-btn" onClick={this.handleDelete}><FaTrashAlt /></button>
                </div>
            </div>
        )
    }
}
export default ServiceItem;