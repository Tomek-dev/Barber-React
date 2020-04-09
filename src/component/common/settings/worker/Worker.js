import React, { Component } from 'react';
import { get, post } from '../../../../util/ApiUtils';
import WorkerItem from './WorkerItem';
import { FaFolder, FaCamera } from 'react-icons/fa';
import './Worker.css';

class Worker extends Component{
    constructor(props){
        super(props);
        this.state = {
            form: {
                name: ''
            },
            data: []
        }
    }

    componentDidMount(){
        get('/workers/' + this.props.id).then(response => {
            this.setState({
                ...this.state,
                data: response
            });
        }).catch(e => {
            // ??
        });
    }

    validate = (form) => {
        if(!form.name){
            return 'Name may not be empty!';
        }
        return null;
    }

    handleChange = (event) => {
        this.setState({
            ...this.state,
            form: {
                ...this.state.form,
                [event.target.name]: event.target.value
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
        post(form, '/worker/add/' + this.props.id).catch(e => {
            this.setState({
                ...this.state,
                error: e.message || 'Sorry! Something went wrong. Please try again!'
            });
        })
        this.componentDidMount();
    }

    handleError = (msg) => {
        this.setState({
            ...this.state,
            error: msg
        });
    }

    render(){
        if(this.props.display != 3){
            return null;
        }
        let elements = [];
        if(this.state.data.length > 0){
            elements = this.state.data.map((item, index) => (
                <WorkerItem service={item} key={index} onError={this.handleError}/>
            ))
        }else{
            elements = <p className="not-yet"><FaFolder className="icon" /> You don't have any workers yet</p>
        }
        return(
            <div className="workers-container">
                <div className="workers-nav-bar">
                    <div className="error">
                        {this.state.error}
                    </div>
                    <form autoComplete="off" className="worker-form" onSubmit={this.handleSubmit}>
                        <div className="worker-form-object">
                            <button className="add-image-btn"><FaCamera /></button>
                            <input 
                            placeholder="Name"
                            type="text"
                            name="name"
                            value={this.state.form.name}
                            onChange={this.onChange}
                            className="worker-form-element"
                            />
                        </div>
                        <div>
                            <button className="worker-submit" type="submit">Add</button>
                        </div>
                    </form>
                </div>
                <div className="worker-content">
                    {elements}
                </div>
            </div>
        )
    }
}

export default Worker;