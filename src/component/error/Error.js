import React, { Component } from 'react';
import { FaBug } from 'react-icons/fa';
import './Error.css';

class Error extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div className="error-container">
                <div className="error-content">
                    <p className="bug"><FaBug /></p>
                    <p className="error-status">Error {this.props.match.params.status}</p>
                    <p>Ups! Something went wrong.</p>
                    <p> Please try again or contact with us.</p>
                </div>
            </div>
        )
    }
}
export default Error;