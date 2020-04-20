import React, { Component } from 'react';
import { USERNAME_MIN_LENGTH, USERNAME_MAX_LENGTH, PASSWORD_MIN_LENGTH, PASSWORD_MAX_LENGTH, PASSWORD_PATTERN, EMAIL_PATTERN } from '../../constans/Constant';
import { checkUsernameAvailability, checkEmailAvailability, signUp } from '../../util/ApiUtils';
import { Link } from 'react-router-dom';
import './SignUpForm.css';

class SignUpForm extends Component{
    constructor(props){
        super(props);
        this.state ={
            form: {
                username: '',
                email: '',
                password: '',
                confirmPassword: ''
            },
            error: {
                msg: '',
                status: ''
            }
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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

    validate = (form) =>{
        const EMAIL_REGEX = RegExp(EMAIL_PATTERN);
        const PASSWORD_REGEX = RegExp(PASSWORD_PATTERN);
        if(!form.username){
            return 'Username may not be empty.';
        }else if(form.username.length < USERNAME_MIN_LENGTH){
            return 'Username is too short (Minimum ' + USERNAME_MIN_LENGTH + ' characters needed).';
        }else if(form.username.length > USERNAME_MAX_LENGTH){
            return 'Username is too long (Maximum ' + USERNAME_MAX_LENGTH + ' characters is allowed).';
        }else if(!form.email){
            return 'Email may not be empty.';
        //}else if(!EMAIL_REGEX.test(form.email)){
        //    return 'Email is invalid.';
        }else if(!form.password){
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


    handleSubmit = async(event) => {
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
            console.log(this.state);
            return;
        }
        let available = true;
        await checkUsernameAvailability(form.username).then(response => {
            if(!response.available){
                this.setState({
                    ...this.state,
                    error: {
                        msg: 'This username is already taken.',
                        status: 'error'
                    }
                });
                available = response.available;
            }
        }).catch(e => {
            this.setState({
               ...this.state,
               error: {
                   msg: e.message || 'Sorry! Something went wrong. Please try again!',
                   status: 'error' 
               }
            });
            available = false;
        })
        checkEmailAvailability(form.email).then(response => {
            if(!response.available){
                this.setState({
                    ...this.state,
                    error: {
                        msg: 'This email is already taken.',
                        status: 'error'
                    }
                });
                available = response.available;
            }
        }).catch(e => {
            this.setState({
               ...this.state,
               error: {
                   msg: e.message || 'Sorry! Something went wrong. Please try again!',
                   status: 'error' 
                }
            });
            available = false;
        })
        if(!available){
            return;
        }
        const signUpRequest = form;
        signUp(signUpRequest).then(() => {
            this.setState({
                form: {
                    username: '',
                    email: '',
                    password: '',
                    confirmPassword: ''
                },
                error: {
                    msg: 'Thank you! You\'re successfully registered. Please Login to continue!',
                    status: 'success'
                }
            });
            this.context.history.push('/login');
        }).catch(e => {
            this.setState({
                ...this.state,
                error: {
                    msg: e.message || 'Sorry! Something went wrong. Please try again!',
                    status: 'error'
                }
            });
        });
    }

    render(){
        return(
            <div className="signup-container">
                <div className="signup-content">
                    <div className="signup-text">
                        <p className="signup-text-paragraph">Get Started</p>
                        <p className="signup-text-info">Our mission is to help companies. Improve the quality of your store according to customer feedback or let them make an appointment online. Get started now, create a page and add features to it</p>
                    </div>
                    <form autoComplete="off" className="signup-form" onSubmit={this.handleSubmit}>
                        <div className={this.state.error.status}>
                            {this.state.error.msg}
                        </div>
                        <input
                        type="text" 
                        placeholder="Username"
                        name="username"
                        className="element"
                        value={this.state.form.username}
                        onChange={this.handleChange}/>
                        <input 
                        type="text"
                        placeholder="Email"
                        name="email"
                        className="element"
                        value={this.state.form.email}
                        onChange={this.handleChange}/>
                        <input 
                        placeholder="Password"
                        type="password"
                        name="password"
                        className="element"
                        value={this.state.form.password}
                        onChange={this.handleChange}/>
                        <input 
                        placeholder="Confirm password"
                        type="password"
                        name="confirmPassword"
                        className="element"
                        value={this.state.form.confirmPassword}
                        onChange={this.handleChange}
                        />
                        <div className="signup-info">
                            <p>Already have an account? <Link className="signup-link" to="/login">Login</Link></p>
                            <p>Clicking "Get Started" above to accept  <Link to="" className="signup-link">Terms of Service</Link> & <Link to="" className="signup-link">Privacy Policy.</Link></p>
                        </div>
                        <div>
                            <button 
                            type="submit"
                            className="submit"
                            >Sign Up</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default SignUpForm;