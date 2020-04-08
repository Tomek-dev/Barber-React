import React, { Component } from 'react';
import './Worker.css';
import { FaTrashAlt } from 'react-icons/fa'

class Worker extends Component{
    constructor(props){
        super(props)
        this.state = {
            active: true
        }
        this.handleDelete = this.handleDelete.bind(this);
    }

    handleDelete = (event) => {
        this.props.onDelete(event);
        this.setState({
            active: false
        })
    }

    render(){
        const workerProps = this.props.worker;
        return(
            <div className={this.state.active ? 'worker-item': 'active'}>
                <div className="worker-props">
                    {workerProps.name}
                </div>
                <button className="worker-delete" type="button" value={workerProps} onClick={this.handleDelete}>
                    <FaTrashAlt />
                </button>
            </div>
        )
    }
}

export default Worker;