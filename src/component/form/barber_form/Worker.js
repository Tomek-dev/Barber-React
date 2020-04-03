import React, { Component } from 'react';

class Service extends Component{
    constructor(props){
        super(props)
    }

    render(){
        const workerProps = this.props.worker;
        return(
            <div className="service" key={this.props.key}>
                <div className="service-props">
                    {workerProps.name}
                </div>
                <button onClick={this.props.onDelete}>
                    
                </button>
            </div>
        )
    }
}

export default Service;