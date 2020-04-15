import React, { Component } from 'react';
import HoursPanel from './HoursPanel';
import './HoursItem.css';


class HoursItem extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div className="hours-step-element">
                <div>
                    <p className="hours-day">{this.props.name}</p>
                    {this.props.hours}
                </div>
                {this.props.children}
            </div>
        )
    }
}

export default HoursItem;