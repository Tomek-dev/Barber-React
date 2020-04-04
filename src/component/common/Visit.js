import React, { Component } from 'react';

class Visit extends Component{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <button className="visit-button">
                <p>{this.props.visit.worker}</p>
                <p>{this.props.visit.service}</p>
                <p>{this.props.visit.date}</p>
            </button>
        )
    }
}