import React, { Component } from 'react';
import { put } from '../../../util/ApiUtils';
import './BarberEdit.css';
import { FaExclamationCircle } from 'react-icons/fa';

class BarberEdit extends Component{
    constructor(props){
        super(props);
        this.state = {
            form: {
                name: '',
                city: '',
                address: '',
                local: ''
            },
            error: {
                msg: '',
                status: ''
            },
            edit: ''
        }
    }

    componentDidMount(){
        this.setState({
            form: this.props.barber,
            edit: this.props.barber
        });
    }

    validate = (form) => {
        if(!form.name){
            return 'Name may not be empty';
        }else if(!form.city){
            return 'City may not be empty';
        }else if(!form.address){
            return 'Address may not be empty';
        }else if(!form.local){
            return 'Local may not be empty';
        }
        return null;
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const form = this.state.form;
        const errorMsg = this.validate(form);
        if(errorMsg){
            this.setState({
                error: {
                    msg: errorMsg,
                    status: 'error'
                }
            });
            return;
        }
        put(form, '/barber').then(() => {
            this.setState({
                error: {
                    msg: 'Successfully update data.',
                    status: 'success'
                },
                edit: this.state.form
            });
        }).catch(e => {
            this.setState({
                error: {
                    msg: e.message || 'Sorry! Something went wrong. Please try again!',
                    status: 'error'
                }
            });
        })
    }

    handleChange = (event) => {
        this.setState({
            form: {
                ...this.state.form,
                [event.target.name]: event.target.value
            }
        });
    }

    render(){
        let element;
        if(this.state.edit !== this.state.form){
            element = <p><FaExclamationCircle className="icon"/>This data is edited. Click edit to save.</p>
        }
        return(
            <div className="barber-edit-container">
                <form autoComplete="off" onSubmit={this.handleSubmit} className="barber-edit-form">
                    <div className={this.state.error.status}>
                        {this.state.error.msg}
                    </div>
                    <input 
                    type="text"
                    name="name"
                    className="element"
                    value={this.state.form.name}
                    onChange={this.handleChange}/>
                    <input 
                    type="text"
                    name="city"
                    className="element"
                    value={this.state.form.city}
                    onChange={this.handleChange}/>
                    <input 
                    type="text"
                    name="address"
                    className="element"
                    value={this.state.form.address}
                    onChange={this.handleChange}/>
                    <input 
                    type="text"
                    name="local"
                    className="element"
                    value={this.state.form.local}
                    onChange={this.handleChange}/>
                    <div className="barber-edit-warn">
                        {element}
                    </div>
                    <div>
                        <button className="submit" type="submit">Edit</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default BarberEdit;