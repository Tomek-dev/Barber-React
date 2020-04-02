import React, { Component } from 'react';
import { change } from '../../util/ApiUtils';
import { PASSWORD_MIN_LENGTH, PASSWORD_MAX_LENGTH, PASSWORD_PATTERN } from '../../constans/Constant';


class Change extends Component{
    constructor(props){
        super(props);
        this.state = {
            form: {
                password: '',
                confirmPassword: ''
            },
            error:{
                msg: '',
                status: ''
            }
        }
    }

    handleChange = (event) => {
        this.setState({
            form: {
                ...this.state.form,
                [event.target.name]: event.target.value
            },
            ...this.state.error
        });
    }

    validate = (form) => {
        const PASSWORD_REGEX = RegExp(PASSWORD_PATTERN);
        if(!form.password){
            return 'Password may not be empty.';
        }else if(form.password.length < PASSWORD_MIN_LENGTH){
            return 'Password is too short (Minimum ' + PASSWORD_MIN_LENGTH + ' characters needed).';
        }else if(form.password.length > PASSWORD_MAX_LENGTH){
            return 'Password is too long (Maximum ' + PASSWORD_MAX_LENGTH + ' characters is allowed).';
        }else if(!PASSWORD_REGEX.test(form.password)){
            return 'Password is invalid.';
        }else if(form.confirmPassword !== form.password){
            return 'Passwords not equals.';
        }else{
            return null;
        }
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
        const changeRequest = form;
        change(changeRequest).then(response => {
            this.setState({
                form: {
                    password: '',
                    confirmPassword: ''
                },
                error: {
                    msg: 'Successfully changed password. Please Login to continue!',
                    status: 'success'
                }
            });
        }).catch(e => {
            this.setState({
                ...this.state,
                error:{
                    msg: e.message || 'Sorry! Something went wrong. Please try again!',
                    status: 'error'
                }
            });
        })
    }

    render(){
        return(
            <div className="change-container">
                <div className="change-content">
                    <form className="change-form" onSubmit={this.handleSubmit}>
                        <div className={this.state.error.status}>
                            {this.state.error.msg}
                        </div>
                        <input 
                        type="password"
                        name="password"
                        className="change-form-element"
                        value={this.state.form.password}
                        onChange={this.handleChange}
                        />
                        <input 
                        type="password"
                        name="confirmPassword"
                        className="change-form-element"
                        value={this.state.form.confirmPassword}
                        onChange={this.handleChange}
                        />
                        <button type="submit" className="change-submit">Change</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default Change;