import React, { Component } from 'react';
import { FaPlus, FaFolder, FaTimes } from 'react-icons/fa';
import { post } from '../../../../util/ApiUtils';
import Service from './Service';
import ReactModal from 'react-modal';
import './WorkerAdd.css';

class WorkerAdd extends Component{
    constructor(props){
        super(props);
        this.state = {
            display: false,
            selected: [],
            error: ''
        }
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

    validate = (select) => {
        if(!select){
            return "Select service!";
        }
        return null;
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const errorMsg = this.validate(this.state.selected);
        if(errorMsg){
            this.setState({
                ...this.state,
                error: errorMsg
            });
            return;
        }
        post(null, '/worker/' + this.props.id + '/add/' + this.state.selected).then(response => {
            this.setState({
                display: false,
                selected: '',
                error: ''
            });
        }).catch(e => {
            // ??
        });
    }

    handleChange = (select) => {
        this.setState({
            ...this.state,
            selected: select
        });
    }

    render(){
        const service = this.props.service;
        let elements = [];
        if(service.length > 0){
            elements = service.map((item, index) => (
                <Service service={item} key={index} onClick={this.handleChange}/>
            ))
        }else{
            elements = <p className="not-yet"><FaFolder className="icon" /> You don't have any services yet</p>
        }
        return(
            <div className="worker-add-container">
                <button type="button" className="worker-add-btn btn" onClick={this.handleOpen}><FaPlus /></button>
                <ReactModal
                ariaHideApp={false}
                className="add-modal"
                overlayClassName="add-modal-overlay"
                onRequestClose={this.handleClose}
                shouldCloseOnOverlayClick={true}
                isOpen={this.state.display}>
                    <div className="worker-add-modal">
                        <div>
                            <button className="close-btn" onClick={this.handleClose}><FaTimes /></button>
                        </div>
                        <form className="worker-add-form" onSubmit={this.handleSubmit}>
                            <div className="worker-add-service">
                                {elements}
                            </div>
                            <button className="worker-add-submit btn" type="submit">Save</button>
                        </form>
                    </div>
                </ReactModal>
            </div>
        )
    }
}

export default WorkerAdd;