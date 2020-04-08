import React, { Component } from 'react';
import StepBarber from './StepBarber';
import StepHour from './StepHour';
import StepService from './StepService';
import StepWorker from './StepWorker';
import './BarberForm.css'
import { post } from '../../../util/ApiUtils';

class BarberForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            form: {
                barber: {
                    name: '',
                    city: '',
                    address: '',
                    local: '',
                    about: ''
                },
                open: [],
                services: [],
                workers: [],
                images: []
            },
            error: '',
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
            form: {
                ...this.state.form,
                barber: {
                    ...this.state.form.barber,
                    [event.target.name]: event.target.value
                }
            }
        });
    }

    validate = (form) => {
        if(!form.barber.name){
            return 'Name not may be empty!';
        }else if(!form.barber.city){
            return 'City not may be empty!';
        }else if(!form.barber.address){
            return 'Address not may be empty!';
        }else if(!form.barber.local){
            return 'Local not may be empty!';
        }else if(!form.barber.about){
            return 'About not may be empty!';
        }else if(!form.open){
            return 'Set opening hours!';
        }else if(!form.workers){
            return 'Add some workers!';
        }else if(!form.service){
            return 'Add some services!';
        }
        return null;
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const errorMsg = this.validate(this.state.form);
        if(errorMsg){
            this.setState({
                ...this.state,
                error: errorMsg
            });
            return;
        }
        console.log(this.state.form.barber)
        console.log(this.state.form.services)
        console.log(this.state.form.open)
        console.log(this.state.form.workers)
        try{
            /*post(this.state.form.barber, '/barber/add')
            post(this.state.form.open, '/open/add/' + this.props.match.params.id)
            post(this.state.form.workers, '/workers/add')
            post(this.state.form.services, '/services/add')*/
        }catch(error){
            // ??
        }
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

    get submitBtn(){
        if(this.state.step === 4){
            return <div className="barber-btn" type="submit">
                Submit
            </div>
        }
    }

    handleObjectChange = (form, name) => {
        this.setState({
            ...this.state,
            [name]: form
        });
    }
    
    handleList = (array, name) => {
        console.log(name)
        this.setState({
            ...this.state,
            form: {
                ...this.state.form,
                [name]: array
            }
        })
    }

    render(){
        return(
            <div className="barber-form-container">
                <form className="barber-form" onSubmit={this.handleSubmit}>
                    <StepBarber step={this.state.step} onChange={this.handleChange}/>
                    <StepHour step={this.state.step} onChange={this.handleObjectChange}/>
                    <StepService step={this.state.step} name="services" onChange={this.handleList} service={this.state.form.services}/>
                    <StepWorker step={this.state.step} name="workers" worker={this.state.form.workers} onChange={this.handleList}/>
                    <div className="barber-form-buttons">
                        {this.prevBtn}
                        {this.nextBtn}
                        {this.submitBtn}
                    </div>
                </form>
            </div>
        )
    }
}

export default BarberForm;