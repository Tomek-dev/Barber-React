import React, { Component } from 'react';
import ReactModal from 'react-modal';
import { FaEdit, FaTimes } from 'react-icons/fa';
import { put } from '../../../../util/ApiUtils';

class WorkerEdit extends Component{
    constructor(props){
        super(props);
        this.state = {
            form: {
                name: ''
            },
            error: '',
            display: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    componentDidMount(){
        this.setState({
            ...this.state,
            form: this.props.worker.name
        });
    }

    validate = (form) => {
        if(form.name){
            return 'Name may not be empty!'
        }
        return null;
    }

    handleOpen(){
        this.setState({
            ...this.state,
            display: true
        })
    }

    handleClose(){
        this.setState({
            ...this.state,
            display: false
        })
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const form = this.state.form;
        let errorMsg = this.validate(form);
        if(errorMsg){
            this.setState({
                ...this.state,
                error: errorMsg
            });
            return;
        }
        put(form, '/worker/' + this.params.barber.id).catch(e => {
            // ??
        });
    }

    render(){
        return(
            <div className="worker-edit-container">
                <button className="worker-edit-btn" onClick={this.handleOpen}><FaEdit /></button>
                <ReactModal
                ariaHideApp={false}
                className="edit-modal"
                overlayClassName="edit-modal-overlay"
                onRequestClose={this.handleClose}
                shouldCloseOnOverlayClick={true}
                isOpen={this.state.display}>
                <div className="worker-edit-modal">
                    <div>
                        <button className="worker-edit-close" onClick={this.handleClose}><FaTimes /></button>
                    </div>
                    <form autoComplete="off" onSubmit={this.handleSubmit}>
                        <input 
                        type="text"
                        className="worker-edit-element"
                        name="name"
                        placeholder="Name"
                        value={this.state.form.value}
                        onChange={this.handleChange}/>
                        <button type="submit" className="worker-edit-submit">Edit</button>
                    </form>
                </div>
                </ReactModal>
            </div>
        )
    }
}

export default WorkerEdit;