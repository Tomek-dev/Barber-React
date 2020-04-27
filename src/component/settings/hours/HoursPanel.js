import React, { Component } from 'react';
import ReactModal from 'react-modal';
import HoursList from './HoursList'
import { FaRegEdit, FaTimes } from 'react-icons/fa'
import './HoursPanel.css';
import { withRouter } from 'react-router-dom';

class HoursPanel extends Component{
    constructor(props){
        super(props);
        this.state={
            form: {
                day: '',
                open: '',
                close: ''
            },
            display: false,
            error: ''
        }
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.setClosed = this.setClosed.bind(this);
    }

    componentDidMount(){
        this.setState({
            form: {
                ...this.state.form,
                day: this.props.day
            }
        });
    }

    handleOpen() {
        this.setState({ 
            display: true
        });
    }

    handleClose() {
        this.setState({ 
            display: false
        });
    }

    handleChange = (value, name) => {
        this.setState({
            form: {
                ...this.state.form,
                [name]: value
            }
        })
    }

    setClosed (){
        this.setState({
            form: {
                ...this.state.form,
                open: '00:00',
                close: '00:00'
            },
            display: false,
            error: ''
        }, function () {
            this.props.onChange(this.props.day, this.state.form);
        });
    }

    validate = (form) => {
        if(!form.open){
            return 'Set open!';
        }else if(!form.close){
            return 'Set close!';
        }
        return null;
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const errorMsg = this.validate(this.state.form);
        if(errorMsg){
            this.setState({
                error: errorMsg
            });
            return;
        } 
        this.props.onChange(this.props.day, this.state.form);
        this.setState({
            display: false
        })
    }

    render(){
        return(
            <div className="hours-panel">
                <button type="button" className="btn hours-btn" onClick={this.handleOpen}><FaRegEdit /></button>
                <ReactModal 
                ariaHideApp={false}
                className="modal"
                overlayClassName="hours-modal-overlay"
                onRequestClose={this.handleSearchPanel}
                shouldCloseOnOverlayClick={false}
                isOpen={this.state.display}>
                    <div className="hours-modal-container">
                        <div>
                            <button className="close-btn" onClick={this.handleClose}><FaTimes /></button>
                        </div>
                        <div className="error">
                            {this.state.error}
                        </div>
                            <p className="hours-info">Open</p>
                            <HoursList name="open" onSelect={this.handleChange}/>
                            <p className="hours-info">Close</p>
                            <HoursList name="close" onSelect={this.handleChange}/>
                        <div className="hours-panel-btn">
                            <button type="button" 
                            onClick={this.setClosed}
                            className="hours-closed btn">Closed</button>
                            <button name={this.props.day} 
                            type="button"
                            className="submit"
                            value={this.state.form}
                            onClick={this.handleSubmit}>Set</button>
                        </div>
                    </div>
                </ReactModal>
            </div>
        )
    }
}

export default withRouter(HoursPanel)