import React, { Component } from 'react';
import { forgot } from '../../../util/ApiUtils';
import './Forgot.css'
import ReactModal from 'react-modal';
import { FaTimes } from 'react-icons/fa'

class ForgotForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            username: '',
            error: {
                msg: '',
                status: ''
            },
            display: false
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.hanldeChange = this.hanldeChange.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    hanldeChange = (event) => {
        this.setState({
            username: event.target.value,
            ...this.state.error
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const errorMsg = this.validate(this.state.username);
        if(!errorMsg){
            this.setState({
                ...this.state.username,
                error: {
                    msg: errorMsg,
                    status: 'error'
                }
            });
            return;
        }
        forgot(this.state.username).then(response => {
            this.setState({
                username: '',
                error: {
                    msg: 'Successfully send reset token via email!',
                    status: 'success'
                }
            });
        }).catch(e => {
            this.setState({
                username: '',
                error: {
                    msg: e.message || 'Sorry! Something went wrong. Please try again!',
                    status: 'error'
                }
            });
        });
    }

    validate = (element) => {
        if(!element){
            return 'Username may not be empty.'
        }
        return null;
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

    render(){
        return(
            <div className="forgot-container">
                <button onClick={this.handleOpen} className="forgot-btn" type="button">Forgot password</button>
                <ReactModal
                ariaHideApp={false}
                className="forgot-modal"
                overlayClassName="forgot-modal-overlay"
                onRequestClose={this.handleClose}
                shouldCloseOnOverlayClick={true}
                isOpen={this.state.display}>
                    <div className="forgot-content">
                        <div>
                            <button className="forgot-close-btn" onClick={this.handleClose}><FaTimes /></button>
                        </div>
                        <form autocomplete="off" className="forgot-form" onSubmit={this.handleSubmit}>
                            <p className="forgot-paragraph">Dont't worry. Type your email and we will send you token to reset password.</p>
                            <input
                            placeholder="Enter your email"
                            type="text"
                            name="username"
                            className="forgot-form-element"
                            value={this.state.username}
                            onChange={this.hanldeChange} />
                            <button className="forgot-submit">Send</button>
                        </form>
                    </div>
                </ReactModal>
            </div>
        )
    }
}

export default ForgotForm;