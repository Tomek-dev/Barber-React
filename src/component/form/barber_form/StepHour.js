import React, { Component } from 'react';
import HoursPanel from './HoursPanel';
import './StepHours.css'
import { FaSave } from 'react-icons/fa'

class StepHour extends Component {
    constructor(props){
        super(props);
        this.state ={
            monday: '',
            tuesday: '',
            wednesday: '',
            thursday: '',
            friday: '',
            saturday: '',
            sunday: ''
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

    show = (object) => {
        if(!object){
            return <p className="hours-step-hours">Not specified</p>
        }else{
            return <p className="hours-step-hours">{object.open} - {object.close}</p>
        }
    }

    render(){
        if(this.props.step !== 2){
            return null;
        }
        return(
            <div className="form-step-hours">
                 <div>
                    <p className="barber-step">Second Step</p>
                    <p className="barber-text-info">Specify hours opening.</p>
                </div>
                <div className="hours-step-element">
                    <div>
                        <p className="hours-day">Monday</p>
                        {this.show(this.state.monday)}
                    </div>
                    <HoursPanel day="monday" onChange={this.handleChange}/>
                </div>
                <div className="hours-step-element">
                    <div>
                        <p className="hours-day">Tuesday</p>
                        {this.show(this.state.tuesday)}
                    </div>
                    <HoursPanel day="tuesday" onChange={this.handleChange}/>
                </div>
                <div className="hours-step-element">
                    <div>
                        <p className="hours-day">Wednesday</p>
                        {this.show(this.state.wednesday)}
                    </div>
                    <HoursPanel day="wednesday" onChange={this.handleChange}/>
                </div>
                <div className="hours-step-element">
                    <div>
                        <p className="hours-day">Thursday</p>
                        {this.show(this.state.thursday)}
                    </div>
                    <HoursPanel day="thursday" onChange={this.handleChange}/>
                </div>
                <div className="hours-step-element">
                    <div>
                        <p className="hours-day">Friday</p>
                        {this.show(this.state.friday)}
                    </div>
                    <HoursPanel day="friday" onChange={this.handleChange}/>
                </div>
                <div className="hours-step-element">
                    <div>
                        <p className="hours-day">Saturday</p>
                        {this.show(this.state.saturday)}
                    </div>
                    <HoursPanel day="saturday" onChange={this.handleChange}/>
                </div>
                <div className="hours-step-element">
                    <div>
                        <p className="hours-day">Sunday</p>
                        {this.show(this.state.sunday)}
                    </div>
                    <HoursPanel day="sunday" onChange={this.handleChange}/>
                </div>
                <button className="hours-step-submit" onClick={this.handleSubmit}><FaSave className="icon" /> Save</button>     
            </div>
        )
    }
}

export default StepHour;