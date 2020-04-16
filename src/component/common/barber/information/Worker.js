import React, { Component } from 'react';
import { FaUserAlt } from 'react-icons/fa';
import './Worker.css';

class Worker extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div className="worker-list">
                {this.props.workers.map(element => (
                    <div className="worker-list-item" key={element.id}>
                        {!element.url ? (<div className="worker-list-image"><FaUserAlt /></div>):(<img />)}
                        <p>{element.name}</p>
                    </div>
                ))}
            </div>
        )
    }
}

export default Worker;