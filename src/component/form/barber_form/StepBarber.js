import React, { Component } from 'react';
import './StepBarber.css';

class StepBarber extends Component{
    constructor(props){
        super(props);
    }

    render(){
        if(this.props.step !== 1){
            return null;
        }
        return(
            <div className="form-step-barber">
                <div>
                    <p className="barber-step">First Step</p>
                    <p className="barber-text-info">Type necessary info about your barbershop.</p>
                </div>
                <input 
                placeholder="Barber Name"
                type="text"
                name="name"
                className="barber-form-element"
                value={this.props.name}
                onChange={this.props.onChange}/>
                <input 
                placeholder="City"
                type="text"
                name="city"
                className="barber-form-element"
                value={this.props.city}
                onChange={this.props.onChange}/>
                <input 
                placeholder="Address"
                type="text"
                name="address"
                className="barber-form-element"
                value={this.props.address}
                onChange={this.props.onChange}/>
                <input 
                placeholder="Local"
                type="text"
                name="local"
                className="barber-form-element"
                value={this.props.local}
                onChange={this.props.onChange}/>
                <p className="barber-text-info">Tell us something about your barbershop.</p>
                <textarea 
                placeholder="About..."
                name="about"
                rows="4"
                className="barber-form-textarea"
                value={this.props.about}
                onChange={this.props.onChange}/>
            </div>
        );
    }
}

export default StepBarber;