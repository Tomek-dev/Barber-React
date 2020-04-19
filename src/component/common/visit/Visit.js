import React, { Component } from 'react';
import './Visit.css';

class Visit extends Component{
    constructor(props){
        super(props);
    }

    render(){
        const visit = this.props.visit;
        return(
            <div className="visit-item">
                <div>
                    <div className="visit-props">
                        <p>{visit.name}</p>
                        <p>{visit.servicePrice} $</p>
                    </div>
                </div>
                <p>{visit.beginning}</p>
                <p>{visit.workerName}</p>
                <p>{visit.serviceName}</p>
            </div>
        )
    }
}

export default Visit;