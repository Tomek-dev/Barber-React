import React, { Component } from 'react';
import { post } from '../../../util/ApiUtils';
import { FaCalendarAlt, FaTimes } from 'react-icons/fa';
import ReactModal from 'react-modal';
import HoursItem from './HoursItem';
import HoursPanel from './HoursPanel';
import './SetHours.css';

export function show(object){
    if(!object){
        return <p className="hours-step-hours">Not specified</p>
    }else if(object.open === '00:00' && object.close === '00:00'){
        return <p className="hours-step-hours">Closed</p>
    }else{
        return <p className="hours-step-hours">{object.open} - {object.close}</p>
    }
}

class SetHours extends Component{
    constructor(props){
        super(props);
        this.state ={
            form: {
                monday: '',
                tuesday: '',
                wednesday: '',
                thursday: '',
                friday: '',
                saturday: '',
                sunday: ''
            },
            error: '',
            display: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    handleOpen(){
        this.setState({
            display: true
        })
    }

    handleClose(){
        this.setState({
            display: false
        })
    }

    validate = (form) => {
        if(!form.monday){
            return 'Set monday!';
        }else if(!form.tuesday){
            return 'Set tuesday!';
        }else if(!form.wednesday){
            return 'Set wednesday!';
        }else if(!form.thursday){
            return 'Set thursday!';
        }else if(!form.friday){
            return 'Set friday!';
        }else if(!form.saturday){
            return 'Set saturday!';
        }else if(!form.sunday){
            return 'Set sunday!';
        }
        return null;
    }

    handleChange = (name, value) => {
        this.setState({
            form:{
                ...this.state.form,
                [name]: value
            }
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const errorMsg = this.validate(this.state.form)
        if(errorMsg){
            this.setState({
                error: errorMsg
            });
            return;
        }
        let form = Object.values(this.state.form);
        post(form, '/open/add/' + this.props.id).then(() => {
            this.setState({
                display: false,
            })
            this.props.onEdit();
        }).catch(e => {
            this.setState({
                error: e.message
            })
        })
    }

    show = (object) => {
        if(!object){
            return <p className="hours-step-hours">Not specified</p>
        }else if(object.open === '00:00' && object.close === '00:00'){
            return <p className="hours-step-hours">Closed</p>
        }else{
            return <p className="hours-step-hours">{object.open} - {object.close}</p>
        }
    }

    render(){
        return(
            <div className="set-hours-container">
                <button onClick={this.handleOpen} className="btn set-btn"><FaCalendarAlt className="icon" />Set Opening hours</button>
                <ReactModal 
                ariaHideApp={false}
                className="modal"
                overlayClassName="modal-overlay"
                onRequestClose={this.handleSearchPanel}
                shouldCloseOnOverlayClick={true}
                isOpen={this.state.display}>
                    <div className="set-hours-modal">
                        <div>
                            <button className="close-btn" onClick={this.handleClose}><FaTimes className="icon" /></button>
                        </div>
                        <form onSubmit={this.handleSubmit} className="set-hours-form">
                            <div className="error">
                                {this.state.error}
                            </div>
                            <div>
                                <HoursItem name="monday" hours={show(this.state.form.monday)}><HoursPanel day="monday" onChange={this.handleChange}/></HoursItem>
                                <HoursItem name="tuesday" hours={show(this.state.form.tuesday)}><HoursPanel day="tuesday" onChange={this.handleChange}/></HoursItem>
                                <HoursItem name="wednesday" hours={show(this.state.form.wednesday)}><HoursPanel day="wednesday" onChange={this.handleChange}/></HoursItem>
                                <HoursItem name="thursday" hours={show(this.state.form.thursday)}><HoursPanel day="thursday" onChange={this.handleChange}/></HoursItem>
                                <HoursItem name="friday" hours={show(this.state.form.friday)}><HoursPanel day="friday" onChange={this.handleChange}/></HoursItem>
                                <HoursItem name="saturday" hours={show(this.state.form.saturday)}><HoursPanel day="saturday" onChange={this.handleChange}/></HoursItem>
                                <HoursItem name="sunday" hours={show(this.state.form.sunday)}><HoursPanel day="sunday" onChange={this.handleChange}/></HoursItem> 
                            </div>
                            <div>
                                <button type="submit" className="submit" onClick={this.handleSubmit}>Set</button> 
                            </div>
                        </form>   
                    </div>
                </ReactModal> 
            </div>
        )
    }
}

export default SetHours;