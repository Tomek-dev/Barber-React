import React, { Component } from 'react';
import '../common/visit/Visit.css';
import { FaTrashAlt } from 'react-icons/fa';
import { del } from '../../util/ApiUtils';

class Visit extends Component{
    constructor(props){
        super(props);
        this.handleDelete = this.handleDelete.bind(this);
    }

    handleDelete(){
        del('/oauth/visit/' + this.props.visit.id).then(() => this.fetchData).catch(e => {
            this.props.onError(e.message);
        })
    }

    render(){
        const visit = this.props.visit;
        return(
            <div className="visit-item">
                <div className="visit-option">
                    <div className="visit-props">
                        <p>{visit.name}</p>
                        <p>{visit.servicePrice} $</p>
                    </div>
                    <button onClick={this.handleDelete} onError={this.props.onError} onEdit={this.handleEdit} className="btn reservation-delete"><FaTrashAlt /></button>
                </div>
                <p>{visit.beginning}</p>
                <p>{visit.workerName}</p>
                <p>{visit.serviceName}</p>
            </div>
        )
    }
}

export default Visit;