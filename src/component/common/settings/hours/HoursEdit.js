import React, { Component } from 'react';
import ReactModal from 'react-modal';
import HoursList from './HoursList'
import { FaRegEdit, FaTimes } from 'react-icons/fa'
import './HoursPanel.css';
import { put } from '../../../../util/ApiUtils';

class HoursEdit extends Component{
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
            ...this.state,
            form: {
                day: this.props.hours.day,
                open: this.props.hours.open,
                close: this.props.hours.close
            }
        });
    }

    handleOpen() {
        this.setState({ 
            ...this.state, 
            display: true
        });
    }

    handleClose() {
        this.setState({ 
            ...this.state, 
            display: false
        });
    }

    handleChange = (value, name) => {
        this.setState({
            ...this.state,
            form: {
                ...this.state.form,
                [name]: value
            }
        })
    }

    setClosed (){
        this.setState({
            form: {
                day: this.props.hours.day,
                open: this.props.hours.open,
                close: this.props.hours.close
            },
            display: false,
            error: ''
        });
    }

    validate = (form) => {
        if(!form.open){
            return 'Set open!';
        }else if(!form.close){
            return 'Set close!';
        }else if(Date.parse("Thu, 01 Jan 1970 " + form.open + ":00 GMT-0400") > Date.parse("Thu, 01 Jan 1970 " + form.close + ":00 GMT-0400")){
            return 'Close hours should be higher than open.'
        }
        return null;
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const errorMsg = this.validate(this.state.form);
        if(errorMsg){
            this.setState({
                ...this.state,
                error: errorMsg
            });
            return;
        } 
        put(this.state.form, '/open/' + this.props.hours.id).then(() => {
            this.setState({
                ...this.state,
                display: false
            });
            this.props.onEdit();
        }).catch(e => {
            this.setState({
                ...this.state,
                error: e.message
            })
        })
        this.setState({
            ...this.state, 
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

export default HoursEdit;