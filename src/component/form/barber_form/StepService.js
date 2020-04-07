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
            [event.target.name]: event.target.value
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
        this.props.onChange(array)
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
        const elements = [];
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
                <form className="form-step-service" onSubmit={this.handleSubmit}>
                    <input 
                    type="text"
                    name="name"
                    placeholder="Name"
                    className="service-form-element"
                    value={this.state.name}
                    onChange={this.state.handleChange}/>
                    <input 
                    placeholder="Description"
                    type="text"
                    name="description"
                    className="service-form-element"
                    value={this.state.description}
                    onChange={this.state.handleChange}/>
                    <div className="service-props">
                        <input 
                        type="text"
                        name="price"
                        placeholder="Price"
                        className="service-props-element"
                        value={this.state.price}
                        onChange={this.state.handleChange}/>
                        <input 
                        type="text"
                        placeholder="Time"
                        name="time"
                        className="service-props-element"
                        value={this.state.time}
                        onChange={this.state.handleChange}/>
                    </div>
                    <button className="service-submit" type="submit">Add</button>
                </form>
                <div className="service-list">
                    {elements}
                </div>
            </div>
        )
    }
}

export default StepService;