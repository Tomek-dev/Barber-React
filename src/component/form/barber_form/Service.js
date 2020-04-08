import React, { Component } from 'react';
import './Service.css'
import { FaTrashAlt } from 'react-icons/fa'

class Service extends Component{
    constructor(props){
        super(props)
        this.handleDelete = this.handleDelete.bind(this);
        this.state = {
            active: true
        }
    }

    handleDelete= (event) => {
        this.props.onDelete(event);
        this.setState({
            active: false
        })
    }

    render(){
        const serviceProps = this.props.service;
        return(
            <div className={this.state.active ? 'service-item': 'active'}>
                <div className="service-props-item">
                    <div className="service-element">
                        <p className="service-element-name">{serviceProps.name}</p>
                        <p>{serviceProps.price}$</p>
                    </div>
                    <div className="service-element">
                        <p>{serviceProps.description}</p>
                        <p>{serviceProps.time} min</p>
                    </div>
                </div>
                <button className="service-delete" type="button" value={serviceProps} onClick={this.handleDelete}>
                    <FaTrashAlt />
                </button>
            </div>
        )
    }
}

export default Service;