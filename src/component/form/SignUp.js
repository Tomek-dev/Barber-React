import React, { Component } from 'react';
import { USERNAME_MIN_LENGTH, USERNAME_MAX_LENGTH, PASSWORD_MIN_LENGTH, PASSWORD_MAX_LENGTH, PASSWORD_PATTERN, EMAIL_PATTERN } from '../../constans/constant';
import { checkUsernameAvailability, signUp } from '../../util/ApiUtils';
import { store } from 'react-notifications-component';

class SignUp extends Component{
    constructor(props){
        super(props);
        this.state ={
            username: {
                value: ''
            },
            email: {
                value: ''
            },
            password: {
                value: ''
            },
            confirmPassword: {
                value: ''
            }
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.validateUsernameAvailability = this.validateUsernameAvailability.bind(this);
        this.validateEmailAvailability = this.validateEmailAvailability(this);
        this.isFormInvalid = this.isFormInvalid.bind(this);
    }

    handleChange(event, validation){
        const target = event.target;
        const inputName = target.name;
        const inputValue = target.value;

        this.setState({
            [inputName]: {
                value: inputValue,
                ...validation(inputValue)
            }
        })
    }

    handleSubmit(event){
        event.preventDefault();

        const signUpRequest = {
            username: this.state.username.value,
            email: this.state.email.value,
            password: this.state.password.value,
            confirmPassword: this.state.confirmPassword.value
        }

        signUp(signUpRequest).then(response =>{
            store.addNotification({
                title: "Success",
                message: "Thank you! You're successfully registered. Please Login to continue!",
                type: "success",
                insert: "top",
                container: "top-right",
                animationIn: ["animated", "fadeIn"],
                animationOut: ["animated", "fadeOut"],
                dismiss: {
                    duration: 5000,
                    onScreen: true
                }
            });
            this.props.history.push("/login");
        }).catch(error => {
            store.addNotification({
                title: "Success",
                message: error.message || 'Sorry! Something went wrong. Please try again!',
                type: "success",
                insert: "top",
                container: "top-right",
                animationIn: ["animated", "fadeIn"],
                animationOut: ["animated", "fadeOut"],
                dismiss: {
                    duration: 5000,
                    onScreen: true
                }
            });
        });
    }

    isFormInvalid(){
        return !(this.state.username.validationStatus === 'success' &&
            this.state.email.validationStatus === 'success' &&
            this.state.password.validationStatus === 'success' &&
            this.state.confirmPassword.validationStatus === 'success')
    }

    render(){
        return(
            <div className="signup-container">
                <div className="signup-content">
                    <form className="signup-form" onSubmit={this.handleSubmit}>
                        <input
                        type="text" 
                        name="username"
                        className="signup-form-element"
                        value={this.state.name.value}
                        onBlur={this.validateUsernameAvailability}
                        onChange={(event) => this.handleChange(event, this.validateUsername)}/>
                        <input 
                        type="text"
                        name="email"
                        className="signup-form-element"
                        value={this.state.email.value}
                        onBlur={this.validateEmailAvailability}
                        onChange={(event) => this.handleChange(event, this.validateEmail)}/>
                        <input 
                        type="password"
                        name="password"
                        className="signup-form-element"
                        value={this.state.password.value}
                        onChange={(event) => this.handleChange(event, this.validatePassword)}/>
                        <input 
                        type="password"
                        name="confirm-password"
                        className="signup-form-element"
                        value={this.state.confirmPassword.value}
                        onChange={(event) => this.handleChange(event, this.validateConfirmPassword)}
                        />
                        <button 
                        type="submit"
                        className="signup-submit"
                        disabled={this.isFormInvalid}>Sign Up</button>
                    </form>
                </div>
            </div>
        );
    }

    validateUsername = (username) => {
        if(username.length < USERNAME_MIN_LENGTH){
            return {
                validationStatus: 'error',
                errorMsg: 'Username is too short (Minimum ${USERNAME_MIN_LENGTH} characters needed).'
            }
        }
        else if(username.length > USERNAME_MAX_LENGTH){
            return{
                validationStatus: 'error',
                errorMsg: 'Username is too long (Maximum ${USERNAME_MAX_LENGTH} characters is allowed).'
            }
        }else{
            return{
                validationStatus: 'success',
                errorMsg: null
            }
        }
    }

    validateEmail = (email) => {
        const EMAIL_REGEX = RegExp(EMAIL_PATTERN);
        if(!email){
            return{
                validationStatus: 'error',
                errorMsg: 'Email may not be empty.'
            }
        }
        else if(!EMAIL_REGEX.test(email)){
            return{
                validationStatus: 'error',
                errorMsg: 'Email not valid.'
            }
        }else{
            return{
                validationStatus: 'success',
                errorMsg: null
            }
        }
    }

    validatePassword = (password) => {
        const PASSWORD_REGEX = RegExp(PASSWORD_PATTERN);
        if(password.length < PASSWORD_MIN_LENGTH){
            return{
                validationStatus: 'error',
                errorMsg: 'Password is too short (Minimum ${PASSWORD_MIN_LENGTH} characters needed).'
            }
        }else if(password.length > PASSWORD_MAX_LENGTH){
            return{
                validationStatus: 'error',
                errorMsg: 'Password is too long (Maximum ${PASSWORD_MIN_LENGTH} is allowed).'
            }
        }else if(PASSWORD_REGEX.test(password)){
            return{
                validationStatus: 'error',
                errorMsg: 'Password is not valid.'
            }
        }else{
            return{
                validationStatus: 'success',
                errorMsg: null
            }
        }
    }

    validateConfirmPassword = (confirmPassword) =>{
        if(!confirmPassword === this.state.password.value){
            return{
                validationStatus: 'error',
                errorMsg: 'Passwords not equals.'
            }
        }else{
            return{
                validationStatus: 'success',
                errorMsg: null
            }
        }
    }

    validateUsernameAvailability() {
        const username = this.state.username.value;
        const usernameValidation = this.validateUsername(username);

        if(usernameValidation.validationStatus === 'error'){
            this.setState({
                username: {
                    value: username,
                    ...usernameValidation
                }
            });
            return;
        }

        this.setState({
            username: {
                value: username,
                validationStatus: 'validating',
                errorMsg: null
            }
        });

        checkUsernameAvailability(username).then(response =>{
            if(response.available){
                this.setState({
                    username: {
                        value: username,
                        validationStatus: 'success',
                        errorMsg: null
                    }
                });
            }else{
                this.setState({
                    username: {
                        value: username,
                        validationStatus: 'error',
                        errorMsg: 'This username is already taken.'
                    }
                });
            }
        }).catch(error => {
            this.setState({
                username: {
                    username: username,
                    validationStatus: 'success',
                    errorMsg: null
                }
            })
        })
    }

    validateEmailAvailability(){
        const email = this.state.email.value;
        const emailValidation = validateEmail(email);

        if(emailValidation.validationStatus === 'error'){
            this.setState({
                email: {
                    value: email,
                    ...emailValidation
                }
            });
            return;
        }

        this.setState({
            email: {
                value: email,
                validationStatus: 'validating',
                errorMsg: null
            }
        });

        checkEmailAvailability(email).then(response =>{
            if(response.available) {
                this.setState({
                    email: {
                        value: email,
                        validationStatus: 'success',
                        errorMsg: null
                    }
                });
            }else{
                this.setState({
                    email: {
                        value: email,
                        validationStatus: 'error',
                        errorMsg: 'This email is already taken'
                    }
                });
            }
        }).catch(error => {
            this.setState({
                email:{
                    value: email,
                    validationStatus: 'success',
                    errorMsg: null
                }
            });
        });
    }
}