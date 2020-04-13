import React, { Component } from 'react';
import { get, post } from '../../../../util/ApiUtils';
import WorkerItem from './WorkerItem';
import { FaFolder, FaImages } from 'react-icons/fa';
import './Worker.css';
import MiniLoader from '../../loader/MiniLoader';

class Worker extends Component{
    constructor(props){
        super(props);
        this.state = {
            form: {
                name: ''
            },
            data: [],
            services: [],
            isLoading: false,
            error: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    fetchData = () => {
        if(!this.props.id){
            return null;
        }
        this.setState({
            ...this.state,
            isLoading: true
        });
        get('/workers/' + this.props.id).then(response => {
            this.setState({
                ...this.state,
                data: response,
                isLoading: false
            });
        }).catch(e => {
            // ??
        });
        get('/service/value?barber=' + this.props.id).then(response => {
            this.setState({
                ...this.state,
                services: response
            });
        }).catch(e => {
            // ??
        });
    }

    componentDidMount(){
        this.fetchData();
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
        post(form, '/worker/add').then(() => {
            this.setState({
                ...this.state,
                form: {
                    name: ''
                },
                error: ''
            });
        }).catch(e => {
            this.setState({
                ...this.state,
                error: e.message || 'Sorry! Something went wrong. Please try again!'
            });
        })
        this.fetchData(this.props.id);
    }

    handleEdit = () => {
        this.fetchData();
    }

    handleError = (msg) => {
        this.setState({
            ...this.state,
            error: msg
        });
    }

    render(){
        if(this.props.display != 4){
            return null;
        }
        let elements = [];
        if(this.state.isLoading){
            elements = <MiniLoader isLoading={this.state.isLoading} />
        }else if(this.state.data.length > 0){
            elements = this.state.data.map((item, index) => (
                <WorkerItem worker={item} service={this.state.services} key={index} onEdit={this.handleEdit} onError={this.handleError}/>
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
                            <button className="add-image-btn btn"><FaImages /></button>
                            <input 
                            placeholder="Name"
                            type="text"
                            name="name"
                            value={this.state.form.name}
                            onChange={this.handleChange}
                            className="worker-form-element"
                            />
                        </div>
                        <div>
                            <button className="worker-submit btn" type="submit">Add</button>
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