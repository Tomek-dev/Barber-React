import React, { Component } from 'react';
import { post } from '../../../util/ApiUtils';
import { FaExclamation, FaTimes } from 'react-icons/fa';
import ReactModal from 'react-modal';
import './Report.css';

class Report extends Component{
    constructor(props){
        super(props);
        this.state = {
            display: false,
            form: {
                reason: ''
            },
            error: ''
        }
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
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

    handleChange(event){
        this.setState({
            ...this.state,
            form: {
                reason: event.target.value
            }
        })
    }

    handleSubmit(event){
        event.preventDefault();
        const form = this.state.form;
        if(!form.reason){
            this.setState({
                ...this.state,
                error: 'Select reason!'
            })
            return;
        }
        post(form, '/report/' + this.props.id).then(() => {
            this.setState({
                display: false,
                form: {
                    reason: ''
                },
                error: ''
            })
        }).catch(e =>{
            this.setState({
                ...this.state,
                error: e.message
            })
        })
    }

    render(){
        const reason = this.state.form.reason;
        return(
            <div>
                <button onClick={this.handleOpen} className="btn review-report"><FaExclamation /></button>
                <ReactModal
                ariaHideApp={false}
                className="modal"
                overlayClassName="modal-overlay"
                onRequestClose={this.handleClose}
                shouldCloseOnOverlayClick={true}
                isOpen={this.state.display}>
                    <div className="report-modal">
                        <div>
                            <button className="close-btn" onClick={this.handleClose}><FaTimes /></button>
                        </div>
                        <div className="error">
                                {this.state.error}
                        </div>
                        <div className="report-option">
                            <button value={1} onClick={this.handleChange} className={`btn report-btn ${reason === '1'? `selected`: ``}`}>Vulgar Name</button>
                            <button value={2} onClick={this.handleChange} className={`btn report-btn ${reason === '2'? `selected`: ``}`}>Vulgar Review</button>
                            <button value={3} onClick={this.handleChange} className={`btn report-btn ${reason === '3'? `selected`: ``}`}>Other</button>
                        </div>
                        <form onSubmit={this.handleSubmit}>
                            <button className="submit">Report</button>
                        </form>
                    </div>
                </ReactModal>
            </div>
        )
    }
}

export default Report;