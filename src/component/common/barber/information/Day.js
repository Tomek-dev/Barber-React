import React, { Component } from 'react';
import { show } from '../../settings/hours/SetHours';
import './Day.css';

class Day extends Component{
    constructor(props){
        super(props);
    }

    render(){
        const hours = this.props.hours;
        return(
            <div className="day-hours">
                <p className="hours-day-name">{hours.day}</p>
                <p>{show(hours)}</p>
            </div>
        )
    }
}
export default Day;