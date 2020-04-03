import React, { Component } from 'react';

class StepWorker extends Component{
    constructor(props){
        super(props);
        this.state = {
            form: {
                name: '',
            },
            error: ''
        }
    }

    handleChange = (event) => {
        this.setState({
            ...this.state,
            [event.target.name]: event.target.value
        });
    }

    //delete on barber

    handleDelete = (event) => {
        let array = [...this.props.worker];
        let index = array.indexOf(event.target.key);
        if(index > -1){
            array.splice(index, 1);
            this.props.onDelete(array);
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
        this.props.handleWorker(array)
        this.setState({
            form: {
                name: '',
            },
            error: ''
        })
    }

    render(){
        return(
            <div className="form-step-worker">
                <div className="worker-error">
                    {error}
                </div>
                <form onSubmit={this.handleSubmit}>
                    <input 
                    type="text"
                    name="name"
                    className="barber-form-element"
                    value={this.state.name}
                    onChange={this.state.handleChange}/>
                    <button type="submit">Add</button>
                </form>
                <div className="worker-list">
                    {this.props.worker.map(item, index => (
                        <Worker worker={this.props.worker} key={index} onDelete={this.handleDelete} />
                    ))}
                </div>
            </div>
        )
    }
}
export default StepWorker;