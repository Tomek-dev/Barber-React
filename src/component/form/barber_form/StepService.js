import React, { Component } from 'react';
import Service from './Service';

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
            error: ''
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
        let index = array.indexOf(event.target.key);
        if(index > -1){
            array.splice(index, 1);
            this.props.onDelete(array);
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
        this.props.handleService(array)
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
        return(
            <div className="form-step-service">
                <div className="service-error">
                    {error}
                </div>
                <form onSubmit={this.handleSubmit}>
                    <input 
                    type="text"
                    name="name"
                    className="barber-form-element"
                    value={this.state.name}
                    onChange={this.state.handleChange}/>
                    <input 
                    type="text"
                    name="description"
                    className="barber-form-element"
                    value={this.state.description}
                    onChange={this.state.handleChange}/>
                    <input 
                    type="text"
                    name="price"
                    className="barber-form-element"
                    value={this.state.price}
                    onChange={this.state.handleChange}/>
                    <input 
                    type="text"
                    name="time"
                    className="barber-form-element"
                    value={this.state.time}
                    onChange={this.state.handleChange}/>
                    <button type="submit">Add</button>
                </form>
                <div className="service-list">
                    {this.props.service.map(item, index => (
                        <Service service={this.props.service} key={index} onDelete={this.handleDelete} />
                    ))}
                </div>
            </div>
        )
    }
}