import React, { Component } from 'react';
import Service from './Service';
import './StepService.css';

class StepService extends Component{
    constructor(props){
        super(props);
        this.state = {
            form: {
                name: '',
                description: '',
                price: '',
                time: ''
            },
            error: '',
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange = (event) => {
        this.setState({
            ...this.state,
            form: {
                ...this.state.form,
                [event.target.name]: event.target.value
            }
        });
    }

    //delete on barber

    handleDelete = (event) => {
        let array = [...this.props.service];
        let index = array.indexOf(event.target.value);
        if(index > -1){
            array.splice(index, 1);
            this.props.onChange(array);
        }
    }

    validate = (form) => {
        if(!form.name){
            return 'Name may not be empty';
        }else if(!form.description){
            return 'Description may not be empty';
        }else if(!form.price){
            return 'Price may not be empty'
        }else if(form.price < 0){
            return 'Invalid input for price';
        }else if(!form.time){
            return 'Time may not be empty';
        }
        return null;
    }

    handleSubmit = (event) => { 
        event.preventDefault();
        const form = this.state.form;
        const errorMsg = this.validate(form);
        if(errorMsg){
            this.setState({
                ...this.state,
                error: errorMsg
            });
            return;
        }
        let array = [...this.props.service];
        array.push(form);
        this.props.onChange(array, this.props.name)
        this.setState({
            form: {
                name: '',
                description: '',
                price: '',
                time: ''
            },
            error: ''
        })
    }

    render(){
        if(this.props.step !== 3){
            return null;
        }
        let elements = [];
        if(this.props.service){
            elements = this.props.service.map((item, index) => (
                <Service service={item} key={index} onDelete={this.handleDelete} />
            ))
        }
        return(
            <div className="step-service-container">
                <div>
                    <p className="barber-step">Third Step</p>
                    <p className="barber-text-info">Add some service.</p>
                </div>
                <div className="service-error">
                    {this.state.error}
                </div>
                <div className="form-step-service">
                    <input 
                    autoComplete="off"
                    type="text"
                    name="name"
                    placeholder="Name"
                    className="service-form-element"
                    value={this.state.form.name}
                    onChange={this.handleChange}/>
                    <input 
                    autoComplete="off"
                    placeholder="Description"
                    type="text"
                    name="description"
                    className="service-form-element"
                    value={this.state.form.description}
                    onChange={this.handleChange}/>
                    <div className="service-props">
                        <input 
                        autoComplete="off"
                        type="text"
                        name="price"
                        placeholder="Price"
                        className="service-props-element"
                        value={this.state.form.price}
                        onChange={this.handleChange}/>
                        <input 
                        autoComplete="off"
                        type="text"
                        placeholder="Time"
                        name="time"
                        className="service-props-element"
                        value={this.state.form.time}
                        onChange={this.handleChange}/>
                    </div>
                    <button className="service-submit" onClick={this.handleSubmit} type="button">Add</button>
                </div>
                <div className="service-list">
                    {elements}
                </div>
            </div>
        )
    }
}

export default StepService;