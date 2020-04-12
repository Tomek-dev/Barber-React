import React, { Component } from 'react';
import { FaPlus, FaFolder, FaTimes, FaExchangeAlt } from 'react-icons/fa';
import { get, post } from '../../../../util/ApiUtils';
import Service from './Service';
import ReactModal from 'react-modal';
import './WorkerAdd.css';

class WorkerAdd extends Component{
    constructor(props){
        super(props);
        this.state = {
            display: false,
            selected: '',
            data: [],
            error: '',
            option: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleOption = this.handleOption.bind(this);
    }

    componentDidMount(){
        this.setState({
            ...this.state,
            data: this.props.service
        });
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
        let url;
        if(this.state.option){
            url = '/worker/' + this.props.worker.id + '/add/' + this.state.selected
        }else{
            url = '/worker/' + this.props.worker.id + '/remove/' + this.state.selected
        }
        post(null, url).then(() => {
            this.setState({
                ...this.state,
                display: false,
                selected: '',
                error: ''
            });
        }).catch(e => {
            // ??
        });
    }

    handleOption=()=>{
        this.setState({
            ...this.state,
            option: !this.state.option
        });
    }

    handleChange = (select) => {
        this.setState({
            ...this.state,
            selected: select
        });
    }

    render(){
        const service = this.state.data;
        let remove = service.filter(value => value.workers.includes(this.props.worker.name));
        let add = service.filter(value => !value.workers.includes(this.props.worker.name));
        let elements = [];
        if(service.length > 0 && !this.state.option){
            elements = remove.map((item, index) => (
                <Service service={item} key={index} onClick={this.handleChange}/>
            ))
        }else if(service.length > 0 && this.state.option){
            elements = add.map((item, index) => (
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
                className="modal"
                overlayClassName="modal-overlay"
                onRequestClose={this.handleClose}
                shouldCloseOnOverlayClick={true}
                isOpen={this.state.display}>
                    <div className="worker-add-modal">
                        <div>
                            <button className="close-btn" onClick={this.handleClose}><FaTimes /></button>
                        </div>
                        <form className="worker-add-form" onSubmit={this.handleSubmit}>
                            <div className="worker-add-select">
                                <p>{this.state.option ? 'Select to add: ': 'Select to remove: '}</p>
                                <button type="button" className="btn worker-option-btn" onClick={this.handleOption}><FaExchangeAlt /></button>
                            </div>
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