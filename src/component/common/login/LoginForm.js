import React, { Component } from 'react';
import { login } from "../../../util/ApiUtils";
import { ACCESS_TOKEN } from "../../../constans/Constant";
import { Link } from 'react-router-dom';
import './LoginForm.css';
import ForgotForm from '../forgot/ForgotForm';

class LoginForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            form: {
                username: '',
                password: ''
            },
            error: ''
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

    validate = (form) => {
        if(!form.username){
            return 'Username may not be empty.';
        }else if(!form.password){
            return 'Password may not be empty.';
        }
        return null;
    }

    handleSubmit(event){
        event.preventDefault();
        const form = this.state.form;
        const errorMsg = this.validate(form);
        if(errorMsg){
            this.setState({
                ...this.state,
                error: ''
            });
            return;
        }
        const loginRequest = form;
        login(loginRequest).then(response => {
            localStorage.setItem(ACCESS_TOKEN, response.token);
            this.props.onLogin();
            this.setState({
                form: {
                    username: '',
                    password: ''
                },
                error: ''
            });
        }).catch(e => {
            if(e.status === 401){
                this.setState({
                    ...this.state,
                    error: 'Your Username or Password is incorrect. Please try again!'
                });
            }else{
                this.setState({
                    ...this.state,
                    error: e.message || 'Sorry! Something went wrong. Please try again!'
                });
            }
        });        
    }


    render(){
        return(
            <div className="login-container">
                <p className="login-paragraph">Login as employer</p>
                <div className="login-content">
                    <form autoComplete="off" className="login-form" onSubmit={this.handleSubmit}>
                        <div className="error">
                            {this.state.error}
                        </div>
                        <input 
                        placeholder="Username"
                        type="text"
                        name="username"
                        className="element"
                        value={this.state.form.username}
                        onChange={this.handleChange}
                        />
                        <input 
                        placeholder="Password"
                        type="password"
                        name="password"
                        className="element"
                        value={this.state.form.password}
                        onChange={this.handleChange}
                        />
                        <div className="login-info">
                            <p>Don't have an account?</p>
                            <Link className="account-link" to="/register">Create account</Link>
                            <p>Any trouble with login? <ForgotForm /></p> 
                        </div>
                        <div>
                            <button type="submit" className="submit">Login</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default LoginForm;