import React, { Component } from 'react';
import { get, post } from '../../../../util/ApiUtils';
import ServiceItem from './ServiceItem';
import { FaFolder } from 'react-icons/fa';
import './Services.css';
import MiniLoader from '../../loader/MiniLoader'

class Services extends Component{
    constructor(props){
        super(props);
        this.state={
            form: {
                name: '',
                description: '',
                price: '',
                time: ''
            },
            error: '',
            data: [],
            isLoading: false
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleError = this.handleError.bind(this);
        }

    fetchData = () => {
        if(!this.props.id){
            return null;
        }
        this.setState({
            ...this.state,
            isLoading: true
        });
        get('/service/value?barber=' + this.props.id).then(response => {
            this.setState({
                ...this.state,
                data: response,
                isLoading: false
            });
        }).catch(e => {
            // ??
        });
    }

    componentDidMount(){
        this.fetchData();
    }

    validate = (form) => {
        if(!form.name){
            return 'Name may not be empty!';
        }else if(!form.description){
            return 'Description may not be empty';
        }else if(!form.price){
            return 'Price may not be empty';
        }else if(!form.time){
            return 'Time may not be empty';
        }
        return null;
    }

    handleEdit = () => {
        this.fetchData(this.props.id);
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

    handleSubmit = (event) => {
        event.preventDefault();
        const form = this.state.form;
        const errorMsg = this.validate(form);
        if(errorMsg){
            this.setState({
                ...this.state,
                error: errorMsg
            });
        }
        post(form, '/service/add').then(() => {
            this.setState({
                ...this.state,
                form: {
                    name: '',
                    description: '',
                    price: '',
                    time: ''
                },
                error: '',
            })
        }).catch(e => {
            this.setState({
                ...this.state,
                error: e.message || 'Sorry! Something went wrong. Please try again!'
            });
        })
        this.fetchData(this.props.id);
    }

    handleError = (msg) => {
        this.setState({
            ...this.state,
            error: msg
        });
    }

    render(){
        if(this.props.display != 3){
            return null;
        }
        let elements = [];
        if(this.state.isLoading){
            elements = <MiniLoader isLoading={this.state.isLoading} />
        }else if(this.state.data.length > 0){
            elements = this.state.data.map((item, index) => (
                <ServiceItem service={item} key={index} onEdit={this.handleEdit} onError={this.handleError}/>
            ))
        }else{
            elements = <p className="not-yet"><FaFolder className="icon" /> You don't have any services yet</p>
        }
        return(
            <div className="services-container">
                <div className="services-side-bar">
                    <form autoComplete="off" onSubmit={this.handleSubmit}>
                        <div className="error">
                            {this.state.error}
                        </div>
                        <input 
                        type="text"
                        name="name"
                        placeholder="Name"
                        className="service-form-element"
                        value={this.state.form.name}
                        onChange={this.handleChange}/>
                        <input 
                        placeholder="Description"
                        type="text"
                        name="description"
                        className="service-form-element"
                        value={this.state.form.description}
                        onChange={this.handleChange}/>
                        <div className="service-props">
                            <input 
                            type="text"
                            name="price"
                            pattern="\d*"
                            placeholder="Price"
                            className="service-props-element"
                            value={this.state.form.price}
                            onChange={this.handleChange}/>
                            <input 
                            type="text"
                            placeholder="Time"
                            name="time"
                            pattern="\d*"
                            className="service-props-element"
                            value={this.state.form.time}
                            onChange={this.handleChange}/>
                        </div>
                        <div>
                            <button type="submit" className="service-submit btn" onClick={this.handleSubmit}>Add</button>
                        </div>
                    </form>
                </div>
                <div className="services-content">
                    {elements}
                </div>
            </div>
        )
    }
}

export default Services;