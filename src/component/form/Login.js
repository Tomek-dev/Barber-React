import React, { Component } from 'react';
import { login } from "../../util/ApiUtils";
import { ACCESS_TOKEN } from "../../constans/Constant";

class Login extends Component{
    constructor(props){
        super(props);
        this.state = {
            form: {
                username: '',
                password: ''
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
                error: {
                    msg: errorMsg,
                    status: 'error'
                }
            });
            return;
        }
        const loginRequest = form;
        login(loginRequest).then(response => {
            localStorage.setItem(ACCESS_TOKEN, response.token);
        }).catch(error => {
            if(error.status === 401){
                this.setState({
                    ...this.state,
                    error: {
                        msg: errorMsg,
                        status: 'error'
                    }
                });
            }else{
                this.setState({
                    ...this.state,
                    error: {
                        msg: error.message || 'Sorry! Something went wrong. Please try again!',
                        status: 'error'
                    }
                });
            }
        });        
    }


    render(){
        return(
            <div className="login-container">
                <div className="login-content">
                    <form className="login-form" onSubmit={this.handleSubmit}>
                        <div className={this.state.error.status}>
                            {this.state.error.msg}
                        </div>
                        <input 
                        type="text"
                        name="username"
                        className="login-form-element"
                        value={this.state.form.username}
                        onChange={this.handleChange}
                        />
                        <input 
                        type="password"
                        name="password"
                        className="login-form-element"
                        value={this.state.form.password}
                        onChange={this.handleChange}
                        />
                        <button disabled={this.isFormInvalid}>Login</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default Login;