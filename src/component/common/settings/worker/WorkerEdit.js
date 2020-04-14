import React, { Component } from 'react';
import ReactModal from 'react-modal';
import { FaEdit, FaTimes } from 'react-icons/fa';
import { put } from '../../../../util/ApiUtils';
import './WorkerEdit.css';

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
            form: {
                name: this.props.worker.name
            }
        });
    }

    validate = (form) => {
        if(!form.name){
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
            ...this.state,
            form: {
                [event.target.name]: event.target.value
            }
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
        put(form, '/worker/' + this.props.worker.id).then(() =>{
            this.setState({
                form: {
                    name: ''
                },
                error: '',
                display: false
            });
            this.props.onEdit();
        }).catch(e => {
            this.setState({
                ...this.state,
                error: e.message
            })
        });
    }

    render(){
        return(
            <div className="worker-edit-container">
                <button className="worker-edit-btn btn" onClick={this.handleOpen}><FaEdit /></button>
                <ReactModal
                ariaHideApp={false}
                className="modal"
                overlayClassName="modal-overlay"
                onRequestClose={this.handleClose}
                shouldCloseOnOverlayClick={true}
                isOpen={this.state.display}>
                <div className="worker-edit-modal">
                    <div>
                        <button className="close-btn" onClick={this.handleClose}><FaTimes /></button>
                    </div>
                    <form autoComplete="off" className="worker-edit-form" onSubmit={this.handleSubmit}>
                        <div className="error">
                            {this.state.error}
                        </div>
                        <input 
                        type="text"
                        className="element"
                        name="name"
                        placeholder="Name"
                        value={this.state.form.name}
                        onChange={this.handleChange}/>
                        <div>
                            <button type="submit" className="submit">Edit</button>
                        </div>
                    </form>
                </div>
                </ReactModal>
            </div>
        )
    }
}

export default WorkerEdit;