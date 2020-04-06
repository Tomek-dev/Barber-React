import React, { Component } from 'react';

class Service extends Component{
    constructor(props){
        super(props)
        this.handleDelete = this.handleDelete.bind(this);
    }

    handleDelete = (event) => {
        this.props.onDelete(event);
    }

    render(){
        const workerProps = this.props.worker;
        return(
            <div className="service">
                <div className="service-props">
                    {workerProps.name}
                </div>
                <button value={workerProps} onClick={this.handleDelete}>
                    Delete
                </button>
            </div>
        )
    }
}

export default Service;