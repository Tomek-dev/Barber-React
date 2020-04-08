import React, { Component } from 'react';
import ReactModal from 'react-modal';
import Hours from './Hours'
import { FaRegEdit, FaTimes, FaDoorClosed } from 'react-icons/fa'
import './HoursPanel.css'

class HoursPanel extends Component{
    constructor(props){
        super(props);
        this.state={
            form: {
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

    handleChange = (key, name) => {
        this.setState({
            ...this.state,
            form: {
                ...this.state.form,
                [name]: key
            }
        })
    }

    setClosed(){
        this.setState({
            form: {
                open: '00:00',
                close: '00:00'
            },
            display: false
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
        const errorMsg = this.validate(this.state.form);
        if(errorMsg){
            this.setState({
                ...this.state,
                error: errorMsg
            });
            return;
        } 
        this.props.onChange(this.props.day, this.state.form);
        this.setState({
            ...this.state, 
            display: false
        })
    }

    render(){
        const data = this.state.form;
        return(
            <div className="hours-panel">
                <button type="button" className="hours-panel-btn" onClick={this.handleOpen}><FaRegEdit /></button>
                <ReactModal 
                ariaHideApp={false}
                className="hours-modal"
                overlayClassName="hours-modal-overlay"
                onRequestClose={this.handleSearchPanel}
                shouldCloseOnOverlayClick={true}
                isOpen={this.state.display}>
                    <div className="hours-modal-container">
                        <div>
                            <button className="hours-close-btn" onClick={this.handleClose}><FaTimes /></button>
                        </div>
                        <div className="error">
                            {this.state.error}
                        </div>
                            <p className="hours-info">Open</p>
                            <Hours name="open" onSelect={this.handleChange}/>
                            <p className="hours-info">Close</p>
                            <Hours name="close" onSelect={this.handleChange}/>
                        <div className="hours-panel-btn">
                            <button type="button" 
                            onClick={this.setClosed}
                            className="hours-closed">Closed</button>
                            <button name={this.props.day} 
                            type="button"
                            className="hours-btn"
                            value={this.state.form}
                            onClick={this.handleSubmit}>Set</button>
                        </div>
                    </div>
                </ReactModal>
            </div>
        )
    }
}

//                    <Hours name="open" selected={1} onSelect={this.handleChange}/>
//                    <Hours name="close" selected={2} onSelect={this.handleChange}/>

export default HoursPanel