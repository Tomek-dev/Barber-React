import { Component } from "react";
import { login } from "../../util/ApiUtils";
import { ACCESS_TOKEN } from "../../constans/constant";
import { store } from 'react-notifications-component';

class Login extends Component{
    constructor(props){
        super(props);
        this.state = {
            username: {
                value: ''
            },
            password: {
                value: ''
            }
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleChange(event){
        const target = event.target;
        const inputName = target.name;
        const inputValue = target.value;
        this.setState({
            [inputName]: {
                value: inputValue,
                ...fieldsValidation(inputValue)
            }
        });
    }

    handleSubmit(event){
        event.preventDefault();
        const loginRequest = {
            username: this.state.username.value,
            password: this.state.password.value
        };
                login(loginRequest).then(response => {
                    localStorage.setItem(ACCESS_TOKEN, response.token);
                    this.props.onLogin();
                }).catch(error => {
                    if(error.status === 401){
                        store.addNotification({
                            title: "Error",
                            message: "Your Username or Password is incorrect. Please try again!",
                            type: "error",
                            insert: "top",
                            container: "top-right",
                            animationIn: ["animated", "fadeIn"],
                            animationOut: ["animated", "fadeOut"],
                            dismiss: {
                                duration: 5000,
                                onScreen: true
                            }
                        });
                    }else{
                        store.addNotification({
                            title: "Error",
                            message: error.message || 'Sorry! Something went wrong. Please try again!',
                            type: "error",
                            insert: "top",
                            container: "top-right",
                            animationIn: ["animated", "fadeIn"],
                            animationOut: ["animated", "fadeOut"],
                            dismiss: {
                                duration: 5000,
                                onScreen: true
                            }
                        });
                    }
                });
    }

    isFormInvalid(){
        return !(this.state.username.validationStatus === 'success' &&
            this.state.password.validationStatus === 'success')
    }

    render(){
        return(
            <div className="login-container">
                <div className="login-content">
                    <form className="login-form" onSubmit={this.handleSubmit}>
                        <input 
                        type="text"
                        name="username"
                        className="login-form-element"
                        value={this.state.username.value}
                        onChange={this.onChange}
                        />
                        <input 
                        type="passsword"
                        name="passsword"
                        className="login-form-element"
                        value={this.state.passsword.value}
                        onChange={this.onChange}
                        />
                        <button disabled={this.isFormInvalid}></button>
                    </form>
                </div>
            </div>
        );
    }

    fieldsValidation = (field) => {
        if(!field){
            return{
                validationStatus: 'error',
                errorMsg: 'This field may not be empty.'
            }
        }else{
            return{
                validationStatus: 'success',
                errorMsg: null
            }
        }
    }
}

export default Login;