import React, { Component } from 'react';
import HoursPanel from './HoursPanel';

class StepHour extends Component {
    constructor(props){
        super(props);
        this.state ={
            monday: [],
            tuesday: [],
            wednesday: [],
            thursday: [],
            friday: [],
            saturday: [],
            sunday: []
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange = (event) => {
        this.setState({
            ...this.state,
            [event.target.name]: event.target.value
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.onChange(this.state, 'open')
    }

    render(){
        if(this.props.step !== 2){
            return null;
        }
        return(
            <div className="form-step-hours">
                <div className="hours-step-element">
                    <p>Monday</p>
                    <HoursPanel day="monday" onChange={this.handleChange}/>
                    <p>Tuesday</p>
                    <HoursPanel day="tuesday" onChange={this.handleChange}/>
                    <p>Wednesday</p>
                    <HoursPanel day="wednesday" onChange={this.handleChange}/>
                    <p>Thursday</p>
                    <HoursPanel day="thursday" onChange={this.handleChange}/>
                    <p>Friday</p>
                    <HoursPanel day="friday" onChange={this.handleChange}/>
                    <p>Saturday</p>
                    <HoursPanel day="saturday" onChange={this.handleChange}/>
                    <p>Sunday</p>
                    <HoursPanel day="sunday" onChange={this.handleChange}/>
                    <button onClick={this.handleSubmit}></button> 
                </div>
            </div>
        )
    }
}

export default StepHour;