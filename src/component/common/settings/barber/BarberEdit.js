import React, { Component } from 'react';
import { post } from '../../../../util/ApiUtils';
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
            }
        }
    }

    componentDidMount(){
        this.setState({
            ...this.state,
            form: this.props.barber
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
                ...this.state,
                error: {
                    msg: errorMsg,
                    status: 'error'
                }
            });
            return;
        }
        post(form, '/barber/').then(() => {
            this.setState({
                ...this.state,
                error: {
                    msg: 'Successfully update data.',
                    status: 'success'
                }
            });
        }).catch(e => {
            this.setState({
                ...this.state,
                error: {
                    msg: e.message || 'Sorry! Something went wrong. Please try again!',
                    status: 'error'
                }
            });
        })
    }

    handleChange = (event) => {
        this.setState({
            ...this.state,
            form: {
                [event.target.name]: event.target.value
            }
        });
    }

    render(){
        let element;
        if(this.props.barber !== this.state.form){
            element = <p><FaExclamationCircle className="icon"/>This data is edited. Click edit to save.</p>
        }
        return(
            <div className="barber-edit-container">
                <form onSubmit={this.handleSubmit} className="barber-edit-form">
                    <input 
                    type="text"
                    name="name"
                    className="barber-edit-element"
                    value={this.state.form.name}
                    onChange={this.handleChange}/>
                    <input 
                    type="text"
                    name="city"
                    className="barber-edit-element"
                    value={this.state.form.city}
                    onChange={this.handleChange}/>
                    <input 
                    type="text"
                    name="address"
                    className="barber-edit-element"
                    value={this.state.form.address}
                    onChange={this.handleChange}/>
                    <input 
                    type="text"
                    name="local"
                    className="barber-edit-element"
                    value={this.state.form.local}
                    onChange={this.handleChange}/>
                    <div className="barber-edit-warn">
                        {element}
                    </div>
                    <div>
                        <button className="barber-edit-submit btn" type="submit">Edit</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default BarberEdit;