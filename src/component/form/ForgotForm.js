import React, { Component } from 'react';
import { forgot } from '../../util/ApiUtils';

class ForgotForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            username: '',
            error: {
                msg: '',
                status: ''
            }
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.hanldeChange = this.hanldeChange.bind(this);
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

    render(){
        return(
            <div className="forgot-container">
                <div className="forgot-content">
                    <form className="forgot-form" onSubmit={this.handleSubmit}>
                        <input
                        type="text"
                        name="username"
                        value={this.state.username}
                        onChange={this.hanldeChange} />
                        <button className="forgot-submit">Send</button>
                    </form>
                </div>
            </div>
        )
    }
}

export default ForgotForm;