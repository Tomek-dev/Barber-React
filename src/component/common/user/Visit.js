import React, { Component } from 'react';
import { del } from '../../../util/ApiUtils';
import { FaTrashAlt } from 'react-icons/fa';

class Visit extends Component{
    constructor(props){
        super(props);
    }

    handleDelete(){
        del('/oauth/visit/' + this.props.visit.id).then(() => {
            this.props.onEdit();
        }).catch(e => {
            this.props.onError(e.message);
        })
    }

    render(){
        const visit = this.props.visit;
        return(
            <div className="visit-item">
                <div className="visit-props">
                    <div>
                        <p>{visit.name}</p>
                        <p>{visit.date}</p>
                        <p>{visit.price}</p>
                    </div>
                    <button onClick={this.handleDelete} className="btn visit-delete"><FaTrashAlt /></button>
                </div>
                <div className="visit-info">
                    <p>{visit.workerName}</p>
                    <p>{visit.serviceName}</p>
                </div>
            </div>
        )
    }
}

export default Visit;