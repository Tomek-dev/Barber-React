import React, { Component } from 'react';
import ReactModal from 'react-modal';
import Hours from './Hours'
import { FaRegEdit } from 'react-icons/fa'
import './HoursPanel.css'

class HoursPanel extends Component{
    constructor(props){
        super(props);
        this.state={
            form: {
                open: '',
                close: ''
            },
            display: false
        }
        this.handleHoursPanel = this.handleHoursPanel.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleHoursPanel() {
        this.setState({ 
            ...this.state, 
            display: !this.state.display
        });
    }

    handleChange = (event) => {
        this.setState({
            ...this.state,
            form: {
                ...this.state.form,
                [event.target.name]: event.target.value
            }
        })
    }

    handleSubmit = (event) => {
        this.props.onChange(event);
    }

    render(){
        const data = this.state.form;
        return(
            <div className="hours-panel">
                <button className="hours-panel-btn" onClick={this.handleHoursPanel}><FaRegEdit /></button>
                <ReactModal 
                ariaHideApp={false}
                className="hours-modal"
                overlayClassName="hours-modal-overlay"
                onRequestClose={this.handleSearchPanel}
                shouldCloseOnOverlayClick={true}
                isOpen={this.state.display}>
                    <Hours name="open" selected={1} onSelect={this.handleChange}/>
                    <Hours name="close" selected={2} onSelect={this.handleChange}/>
                <button name={this.props.day} 
                value={this.state.form}
                onClick={this.handleSubmit}>Set</button>
                </ReactModal>
            </div>
        )
    }
}

export default HoursPanel