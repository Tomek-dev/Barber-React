import React, { Component } from 'react';
import { FaBug } from 'react-icons/fa';
import './Error.css';
import { Redirect } from 'react-router-dom';

class Error extends Component{
    constructor(props){
        super(props);
    }

    render(){
        const status = this.props.match.params.status;
        if(status === 'undefined' || status === null){
            return <Redirect to={{
                pathname: "/error/404",
                state: { from: this.props.location }
            }}/>
        }
        return(
            <div className="error-container">
                <div className="error-content">
                    <p className="bug"><FaBug /></p>
                    <p className="error-status">Error {status}</p>
                    <p>Ups! Something went wrong.</p>
                    <p> Please try again or contact with us.</p>
                </div>
            </div>
        )
    }
}
export default Error;