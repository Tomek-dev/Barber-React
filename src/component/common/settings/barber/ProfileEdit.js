import React, { Component } from 'react';
import { post } from '../../../../util/ApiUtils';
import { FaCogs, FaTimes } from 'react-icons/fa';
import ReactModal from 'react-modal';
import { PASSWORD_MIN_LENGTH, PASSWORD_MAX_LENGTH, PASSWORD_PATTERN } from '../../../../constans/Constant';
import './ProfileEdit.css'


class ProfileEdit extends Component{
    constructor(props){
        super(props);
        this.state = {
            form: {
                password: '',
                newPass: '',
                conNewPass: ''
            },
            display: false,
            error: {
                msg: '',
                status: ''
            }
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSuccess = this.handleSuccess.bind(this);
    }

    handleOpen(){
        this.setState({
            ...this.state,
            display: true
        })
    }

    handleClose(){
        this.setState({
            form: {
                password: '',
                newPass: '',
                conNewPass: ''
            },
            display: false,
            error: {
                msg: '',
                status: ''
            }
        })
    }

    handleChange = (event) => {
        this.setState({
            form:{
                ...this.state.form,
                [event.target.name]: event.target.value
            },
            ...this.state.error
        })
    }

    validate = (form) => {
        const PASSWORD_REGEX = RegExp(PASSWORD_PATTERN);
        if(!form.password){
            return 'Password may not be empty.';
        }else if(!form.newPass){
            return 'New password may not be empty.';
        }else if(form.newPass.length < PASSWORD_MIN_LENGTH){
            return 'New password is too short (Minimum ' + PASSWORD_MIN_LENGTH + ' characters needed).';
        }else if(form.newPass.length > PASSWORD_MAX_LENGTH){
            return 'New password is too long (Maximum ' + PASSWORD_MAX_LENGTH + ' characters is allowed).';
        }else if(!PASSWORD_REGEX.test(form.password)){
            return 'New password is invalid.';
        }else if(form.conNewPass !== form.newPass){
            return 'New passwords not equals.';
        }
        return null;
    }

    handleSuccess(){
        this.setState({
            form: {
                password: '',
                newPass: '',
                conNewPass: ''
            },
            display: false,
            error: {
                msg: '',
                status: ''
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
        post(form, '/password/change').then(() => {
            this.setState({
                ...this.state,
                error: {
                    msg: 'Successfully changed password.',
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

    render(){
        let elements = [];
        if(this.state.error.status === 'success'){
            elements = <div className="profile-edit-success">
                <div className="success">
                {this.state.error.msg}
                </div>
                <button type="button" onClick={this.handleSuccess}>Ok</button>
            </div>
        }else{
            elements = <div className="profile-edit-container">
                <div>
                    <button className="close-btn" onClick={this.handleClose}><FaTimes /></button>
                </div>
                <form autoComplete="off" onSubmit={this.handleSubmit} className="profile-edit-form">
                <div className="error">
                    {this.state.error.status === 'error' ? this.state.error.msg : null}
                </div>
                <input 
                placeholder="Password"
                type="password"
                name="password"
                className="profile-edit-element"
                value={this.state.form.password}
                onChange={this.handleChange}/>
                <input 
                placeholder="New Password"
                type="password"
                name="newPass"
                className="profile-edit-element"
                value={this.state.form.newPass}
                onChange={this.handleChange}/>
                <input 
                placeholder="Confirm New Password"
                type="password"
                name="conNewPass"
                className="profile-edit-element"
                value={this.state.form.conNewPass}
                onChange={this.handleChange}/>
                <div className="profile-submit">
                    <button type="submit" className="profile-edit-submit btn">Change</button>
                </div>
                </form>
            </div>
        }
        return(
            <div className="profile-edit-container">
                <button className="profile-edit-btn btn" onClick={this.handleOpen}><FaCogs /></button>
                <ReactModal
                ariaHideApp={false}
                className="modal"
                overlayClassName="modal-overlay"
                onRequestClose={this.handleClose}
                shouldCloseOnOverlayClick={true}
                isOpen={this.state.display}>
                    {elements}
                </ReactModal>
            </div>
        )
    }

}

export default ProfileEdit;