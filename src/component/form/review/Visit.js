import React, { Component } from 'react';

class Visit extends Component{
    constructor(props){
        super(props)
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick = (id) => {
        this.props.onChange(id)
    }

    render(){
        const visit = this.props.visit;
        return(
            <button className="visit-button" onClick={this.handleClick}>
                <p>{visit.worker}</p>
                <p>{visit.service}</p>
                <p>{visit.date}</p>
            </button>
        )
    }
}

export default Visit;