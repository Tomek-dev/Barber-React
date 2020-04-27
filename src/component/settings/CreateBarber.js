import React, { Component } from 'react';
import { post } from '../../util/ApiUtils';
import { FaPlus, FaTimes } from 'react-icons/fa';
import ReactModal from 'react-modal';
import './CreateBarber.css';

class CreateBarber extends Component{
    constructor(props){
        super(props);
        this.state = {
            form: {
                name: '',
                city: '',
                address: '',
                local: ''
            },
            error: '',
            display: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    handleOpen(){
        this.setState({
            display: true
        })
    }

    handleClose(){
        this.setState({
            form: {
                name: '',
                city: '',
                address: '',
                local: ''
            },
            error: '',
            display: false
        })
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
                error: errorMsg
            });
            return;
        }
        post(form, '/barber/add').then(response => {
            this.setState({
                display: false
            });
            this.props.onEdit();
        }).catch(e => {
            this.setState({
                error: e.message || 'Sorry! Something went wrong. Please try again!'
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
        return(
            <div>
                <div className="create-barber-btn-container">
                    <button className="create-barber-btn btn" onClick={this.handleOpen}><FaPlus /> Create barbershop</button>
                </div>
                <ReactModal
                ariaHideApp={false}
                className="modal"
                overlayClassName="modal-overlay"
                onRequestClose={this.handleClose}
                shouldCloseOnOverlayClick={true}
                isOpen={this.state.display}>
                <div className="barber-create-container">
                    <div>
                        <button className="close-btn" onClick={this.handleClose}><FaTimes className="icon" /></button>
                    </div>
                    <form autoComplete="off" onSubmit={this.handleSubmit} className="barber-create-form">
                        <div className={this.state.error.status}>
                            {this.state.error.msg}
                        </div>
                        <input 
                        placeholder="Name"
                        type="text"
                        name="name"
                        className="element"
                        value={this.state.form.name}
                        onChange={this.handleChange}/>
                        <input 
                        placeholder="City"
                        type="text"
                        name="city"
                        className="element"
                        value={this.state.form.city}
                        onChange={this.handleChange}/>
                        <input 
                        placeholder="Address"
                        type="text"
                        name="address"
                        className="element"
                        value={this.state.form.address}
                        onChange={this.handleChange}/>
                        <input 
                        placeholder="Local"
                        type="text"
                        name="local"
                        className="element"
                        value={this.state.form.local}
                        onChange={this.handleChange}/>
                        <div>
                            <button className="submit" type="submit">Create</button>
                        </div>
                    </form>
                </div>
                </ReactModal>
            </div>
        )
    }
}

export default CreateBarber;