import React, { Component } from 'react';
import HoursPanel from './HoursPanel';
import './StepHour.css'
import { FaSave } from 'react-icons/fa'

class StepHour extends Component {
    constructor(props){
        super(props);
        this.state ={
            form: {
                monday: '',
                tuesday: '',
                wednesday: '',
                thursday: '',
                friday: '',
                saturday: '',
                sunday: ''
            },
            error: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    validate = (form) => {
        if(!form.monday){
            return 'Set monday!';
        }else if(!form.thuesday){
            return 'Set thuesday!';
        }else if(!form.wednesday){
            return 'Set wednesday!';
        }else if(!form.thursday){
            return 'Set thursday!';
        }else if(!form.friday){
            return 'Set friday!';
        }else if(!form.saturday){
            return 'Set saturday!';
        }else if(!form.sunday){
            return 'Set sunday!';
        }
        return null;
    }

    handleChange = (name, value) => {
        this.setState({
            ...this.state,
            form:{
                ...this.state.form,
                [name]: value
            }
        });
    }

    handleSubmit = (event) => {
        const errorMsg = this.validate(this.state.form)
        if(errorMsg){
            this.setState({
                ...this.state,
                error: errorMsg
            });
            return;
        }
        this.props.onChange(this.state.form, 'open')
    }

    show = (object) => {
        if(!object){
            return <p className="hours-step-hours">Not specified</p>
        }else if(object.open === '00:00' && object.close === '00:00'){
            return <p className="hours-step-hours">Closed</p>
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
                <div className="error">
                    {this.state.error}
                </div>
                </div>
                <div className="hours-step-element">
                    <div>
                        <p className="hours-day">Monday</p>
                        {this.show(this.state.form.monday)}
                    </div>
                    <HoursPanel day="monday" onChange={this.handleChange}/>
                </div>
                <div className="hours-step-element">
                    <div>
                        <p className="hours-day">Tuesday</p>
                        {this.show(this.state.form.tuesday)}
                    </div>
                    <HoursPanel day="tuesday" onChange={this.handleChange}/>
                </div>
                <div className="hours-step-element">
                    <div>
                        <p className="hours-day">Wednesday</p>
                        {this.show(this.state.form.wednesday)}
                    </div>
                    <HoursPanel day="wednesday" onChange={this.handleChange}/>
                </div>
                <div className="hours-step-element">
                    <div>
                        <p className="hours-day">Thursday</p>
                        {this.show(this.state.form.thursday)}
                    </div>
                    <HoursPanel day="thursday" onChange={this.handleChange}/>
                </div>
                <div className="hours-step-element">
                    <div>
                        <p className="hours-day">Friday</p>
                        {this.show(this.state.form.friday)}
                    </div>
                    <HoursPanel day="friday" onChange={this.handleChange}/>
                </div>
                <div className="hours-step-element">
                    <div>
                        <p className="hours-day">Saturday</p>
                        {this.show(this.state.form.saturday)}
                    </div>
                    <HoursPanel day="saturday" onChange={this.handleChange}/>
                </div>
                <div className="hours-step-element">
                    <div>
                        <p className="hours-day">Sunday</p>
                        {this.show(this.state.form.sunday)}
                    </div>
                    <HoursPanel day="sunday" onChange={this.handleChange}/>
                </div>
                <button type="button" className="hours-step-submit" onClick={this.handleSubmit}><FaSave className="icon" /> Save</button>     
            </div>
        )
    }
}

export default StepHour;