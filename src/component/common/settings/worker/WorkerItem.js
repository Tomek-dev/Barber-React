import React, { Component } from 'react';
import { FaTrashAlt, FaUserAlt } from 'react-icons/fa';
import { del } from '../../../../util/ApiUtils';
import WorkerEdit from './WorkerEdit';
import WorkerAdd from './WorkerAdd'
import './WorkerItem.css'

class WorkerItem extends Component{
    constructor(props){
        super(props);
        this.handleDelete = this.handleDelete.bind(this);
    }

    handleDelete(){
        del('/worker/' + this.props.worker.id).then(() => this.props.onEdit).catch(e => {
            this.props.onError(e.message || 'Sorry! Something went wrong. Please try again!');
        })
    }

    render(){
        const worker = this.props.worker;
        let element;
        if(worker.image){
            element = <img />
        }else{
            element = <div className="image-not-found"><FaUserAlt /></div>
        }
        return(
            <div className="worker-item">
                <div className="worker-props">
                    {element}
                    <p>{worker.name}</p>
                </div>
                <div className="worker-option">
                    <WorkerAdd onEdit={this.props.onEdit} service={this.props.service} id={worker.id}/>
                    <WorkerEdit onEdit={this.props.onEdit} worker={worker} />
                    <button className="worker-delete-btn btn" onClick={this.handleDelete}><FaTrashAlt /></button>
                </div>
            </div>
        )
    }
}

export default WorkerItem;