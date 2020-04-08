import React, { Component } from 'react';
import Worker from '../barber_form/Worker'
import './StepWorker.css';

class StepWorker extends Component{
    constructor(props){
        super(props);
        this.state = {
            form: {
                name: '',
            },
            error: ''
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange = (event) => {
        this.setState({
            ...this.state,
            form: {
                [event.target.name]: event.target.value
            }
        });
    }

    //delete on barber

    handleDelete = (event) => {
        let array = [...this.props.worker];
        let index = array.indexOf(event.target.value);
        if(index > -1){
            array.splice(index, 1);
            this.props.onChange(array);
        }
    }

    validate = (form) => {
        if(!form.name){
            return 'Name may not be empty';
        }
        return null;
    }

    //images

    handleSubmit = (event) => { 
        event.preventDefault();
        const form = this.state.form;
        const errorMsg = this.validate(form);
        if(errorMsg){
            this.setState({
                ...this.state,
                error: errorMsg
            });
            return;
        }
        let array = [...this.props.worker];
        array.push(form);
        this.props.onChange(array, this.props.name)
        this.setState({
            error: '',
            form: {
                name: '',
            }
        })
    }

    render(){
        if(this.props.step !== 4){
            return null;
        }
        let data = [];
        if(this.props.worker){
            data = this.props.worker.map((item, index) => (
                <Worker worker={item} key={index} onDelete={this.handleDelete} />
            ))
        }
        return(
            <div className="step-worker-container">
                <div>
                    <p className="barber-step">Fourth Step</p>
                    <p className="barber-text-info">Add some worker.</p>
                </div>
                <div className="error">
                    {this.state.error}
                </div>
                <div className="form-step-worker">
                    <input 
                    autoComplete="off"
                    type="text"
                    name="name"
                    placeholder="Name"
                    className="worker-form-element"
                    value={this.state.form.name}
                    onChange={this.handleChange}/>
                    <div className="worker-btn-field">
                        <button className="worker-submit" onClick={this.handleSubmit} type="button">Add</button>
                    </div>
                </div>
                <div className="worker-list">
                    {data}
                </div>
            </div>
        )
    }
}
export default StepWorker;