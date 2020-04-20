import React, { Component } from 'react';
import { post } from '../../../../util/ApiUtils';
import ReactModal from 'react-modal';
import { FaTimes, FaPlus, FaFacebookMessenger, FaTwitterSquare, FaInstagram, FaFacebook } from 'react-icons/fa';
import './SocialAdd.css';

class SocialAdd extends Component{
    constructor(props){
        super(props);
        this.state = {
            form: {
                url: '',
                socialType: ''
            },
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
            ...this.state,
            display: true
        })
    }

    handleClose(){
        this.setState({
            form: {
                url: '',
                socialType: ''
            },
            error: '',
            display: false
        })
    }

    handleChange = (event) => {
        this.setState({
            ...this.state,
            form: {
                ...this.state.form,
                [event.target.name]: event.target.value
            }
        });
    }

    validate = (form) => {
        if(!form.url){
            return 'Url may not be empty.';
        }else if(!form.socialType){
            return 'Select social type.';
        }
        return null;
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const form = this.state.form;
        const errorMsg = this.validate(form);
        if(errorMsg){
            this.setState({
                ...this.state,
                error: errorMsg
            });
            return;
        }
        post(form, '/social/add').then(() => {
            this.setState({
                form: {
                    url: '',
                    socialType: ''
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
        })
    }

    render(){
        const type = this.state.form.socialType;
        return(
            <div className="social-add-container">
                <button onClick={this.handleOpen} className="social-add-btn btn"><FaPlus /></button>
                <ReactModal
                ariaHideApp={false}
                className="modal"
                overlayClassName="modal-overlay"
                onRequestClose={this.handleClose}
                shouldCloseOnOverlayClick={true}
                isOpen={this.state.display}>
                    <div className="social-add-modal">
                        <div>
                            <button className="close-btn" onClick={this.handleClose}><FaTimes /></button>
                        </div>
                        <form autoComplete="off" className="social-add-form" onSubmit={this.handleSubmit}>
                            <div className="error">
                                {this.state.error}
                            </div>
                            <div className="social-type-option">
                                <button className={`btn social-type-btn ${type == 'messenger' ? `messenger`: ``}`} 
                                name="socialType" 
                                value="messenger" onClick={this.handleChange} type="button">
                                    <FaFacebookMessenger />
                                </button>
                                <button className={`btn social-type-btn ${type == 'twitter' ? `twitter`: ``}`} 
                                name="socialType" 
                                value="twitter" onClick={this.handleChange} type="button">
                                    <FaTwitterSquare />
                                </button>
                                <button className={`btn social-type-btn ${type == 'instagram' ? `instagram`: ``}`} 
                                name="socialType" 
                                value="instagram" onClick={this.handleChange} type="button">
                                    <FaInstagram />
                                </button>
                                <button className={`btn social-type-btn ${type == 'facebook' ? `facebook`: ``}`} 
                                name="socialType" 
                                value="facebook" onClick={this.handleChange} type="button">
                                    <FaFacebook />
                                </button>
                            </div>
                            <input 
                            type="text"
                            className="element"
                            name="url"
                            placeholder="Url"
                            value={this.state.url}
                            onChange={this.handleChange}/>
                            <div>
                                <button type="submit" className="submit">Add</button>
                            </div>
                        </form>
                    </div>
                </ReactModal>
            </div>
        )
    }
}

export default SocialAdd;