import React, { Component } from 'react';
import { FaTrashAlt, FaCamera } from 'react-icons/fa';
import { del } from '../../../../util/ApiUtils';

class WorkerItem extends Component{
    constructor(props){
        super(props);
    }

    handleDelete(){
        del('/worker/' + this.props.id).catch(e => {
            this.props.onError(e.message || 'Sorry! Something went wrong. Please try again!');
        })
    }

    render(){
        const worker = this.props.worker;
        let element;
        if(worker.image){
            element = <img />
        }else{
            element = <div className="image-not-found"><FaCamera /></div>
        }
        return(
            <div className="worker-item">
                <div className="worker-props">
                    {element}
                    <p>{worker.name}</p>
                </div>
                <div className="worker-option">
                    <button onClick={this.handleDelete}><FaTrashAlt /></button>
                </div>
            </div>
        )
    }
}

export default WorkerItem;