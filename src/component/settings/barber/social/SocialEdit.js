import React, { Component } from 'react';
import { put } from '../../../../util/ApiUtils';
import ReactModal from 'react-modal';
import { FaTimes, FaEdit } from 'react-icons/fa';
import './SocialEdit.css';

class SocialEdit extends Component{
    constructor(props){
        super(props);
        this.state = {
            url: '',
            error: '',
            display: false
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
    }

    handleOpen(){
        this.setState({
            display: true
        })
    }

    handleClose(){
        this.setState({
            url: '',
            error: '',
            display: false
        })
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    
    componentDidMount(){
        this.setState({
            url: this.props.social.url
        })
    }

    validate = (url) => {
        if(!url){
            return 'Url may not be empty.';
        }
        return null;
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const url = this.state.url;
        const errorMsg = this.validate(url);
        if(errorMsg){
            this.setState({
                error: errorMsg
            });
            return;
        }
        put(url,'/social/' + this.props.social.id).then(() => {
            this.props.onEdit();
            this.setState({
                url: '',
                error: '',
                display: false
            });
        }).catch(e => {
            this.setState({
                error: e.message
            })
        });
    }

    render(){
        return(
            <div className="social-edit-container">
                <button onClick={this.handleOpen} className="social-edit-btn btn"><FaEdit /></button>
                <ReactModal
                ariaHideApp={false}
                className="modal"
                overlayClassName="modal-overlay"
                onRequestClose={this.handleClose}
                shouldCloseOnOverlayClick={true}
                isOpen={this.state.display}>
                    <div className="social-edit-modal">
                        <div>
                            <button className="close-btn" onClick={this.handleClose}><FaTimes /></button>
                        </div>
                        <form autoComplete="off" className="social-edit-form" onSubmit={this.handleSubmit}>
                            <input 
                            type="text"
                            className="element"
                            name="url"
                            placeholder="Url"
                            value={this.state.url}
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

export default SocialEdit;