import React, { Component } from 'react';
import StepBarber from './StepBarber';
import StepHour from './StepHour';
import StepService from './StepService';
import StepWorker from './StepWorker';
import './BarberForm.css'

class BarberForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            form: {
                name: '',
                city: '',
                address: '',
                local: '',
                about: '',
                open: [],
                services: [],
                workers: [],
                images: []
            },
            error: {
                msg: '',
                status: ''
            },
            step: 1
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.next = this.next.bind(this);
        this.prev = this.prev.bind(this);
        this.handleList = this.handleList.bind(this);
        this.handleObjectChange = this.handleObjectChange.bind(this);
    }

    handleChange = (event) => {
        this.state({
            ...this.state,
            [event.target.name]: event.target.value
        });
    }

    validate = (form) => {

    }

    handleSubmit = (event) => {

    }

    handleChange = (event) => {
        this.setState({
            ...this.state,
            [event.target.name]: event.target.value
        });
    }

    next(){
        let step = this.state.step;
        step = step >= 3? 4: step + 1;
        this.setState({
            ...this.state,
            step: step
        });
    }

    prev(){
        let step = this.state.step;
        step = step > 1? step - 1: 1;
        this.setState({
            ...this.state,
            step: step
        });
    }

    get nextBtn(){
        let step = this.state.step;
        if(step < 4){
            return(
                <button onClick={this.next}
                type="button"
                className="barber-btn">
                    Next
                </button>
            )
        }else{
            return null;
        }
    }

    get prevBtn(){
        let step = this.state.step;
        if(step >= 2){
            return(
                <button
                onClick={this.prev}
                type="button"
                className="barber-btn prev-btn">
                    Prev
                </button>
            )
        }else{
            return null;
        }
    }

    handleObjectChange = (form, name) => {
        this.setState({
            ...this.state,
            [name]: form
        });
    }
    
    handleList = (array) => {
        this.setState({
            ...this.state,
            services: array
        })
    }

    render(){
        return(
            <div className="barber-form-container">
                <form className="barber-form" onSubmit={this.handleSubmit}>
                    <StepBarber step={this.state.step} onChange={this.handleChange}/>
                    <StepHour step={this.state.step} onChange={this.handleObjectChange}/>
                    <StepService step={this.state.step} onChange={this.handleList} services={this.state.services}/>
                    <StepWorker step={this.state.step} worker={this.state.workers} onChange={this.handleList}/>
                    <div className="barber-form-buttons">
                        {this.prevBtn}
                        {this.nextBtn}
                    </div>
                </form>
            </div>
        )
    }
}

export default BarberForm;