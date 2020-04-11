import React, { Component } from 'react';
import { put } from '../../../../util/ApiUtils';
import { FaEdit, FaTimes } from 'react-icons/fa';
import ReactModal from 'react-modal';
import './ServiceEdit.css';

class ServiceEdit extends Component{
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
            display: false
        }
    }

    componentDidMount(){
        this.setState({
            ...this.state,
            form: this.props.service
        });
    }

    handleOpen(){
        this.setState({
            ...this.state,
            display: true
        })
    }

    handleClose(){
        this.setState({
            ...this.state,
            display: false
        })
    }

    handleChange = (event) => {
        this.setState({
            ...this.state,
            [event.target.name]: event.target.value
        });
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
        put(form, '/service/' ).then(response => {
            this.setState({
                form: {
                    name: '',
                    description: '',
                    price: '',
                    time: ''
                },
                error: '',
                display: false
            });
            this.props.edit();
        }).catch(e => {
            // ??
        });
    }

    render(){
        return(
            <div>
                <button className="service-edit-btn btn" onClick={this.handleOpen}><FaEdit /></button>
                <ReactModal
                ariaHideApp={false}
                className="edit-modal"
                overlayClassName="edit-modal-overlay"
                onRequestClose={this.handleClose}
                shouldCloseOnOverlayClick={true}
                isOpen={this.state.display}>
                    <div className="service-edit-modal">
                    <div>
                        <button className="close-btn" onClick={this.handleClose}><FaTimes /></button>
                    </div>
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
                            <button type="submit" className="service-submit" onClick={this.handleSubmit}>Add</button>
                        </div>
                    </form>
                    </div>
                </ReactModal>
            </div>
        )
    }
}

export default ServiceEdit;