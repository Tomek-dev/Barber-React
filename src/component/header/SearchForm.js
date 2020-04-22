import React, { Component } from 'react';
import ReactModal from 'react-modal';
import './SearchForm.css';
import { FaSearch, FaTimes } from 'react-icons/fa'
import { withRouter } from 'react-router-dom';

class SearchForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            display: false,
            form: {
                query: '',
                city: '',
            },
            error: {
                msg: '',
                status: ''
            }
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
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

    handleChange = (event) => {
        this.setState({
            form:{
                ...this.state.form,
                [event.target.name]: event.target.value
            },
            ...this.state.error
        })
    }

    validate = (form) => {
        if(!form.city && !form.query){
            return 'This fields may not be empty.';
        }
        return null;
    }

    url = (form) => {
        let params;
        if(!form.query){
            params += '&query=' + form.query;
        }else if(!form.city){
            params += '&city=' + form.city;
        }
        return params.substring(0, 1);
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const form = this.state.form;
        const errorMsg = this.validate(form);
        if(errorMsg){
            this.setState({
                ...this.state.form,
                error: {
                    msg: errorMsg,
                    status: 'error'
                }
            });
            return;
        }
        let url = this.url(form);
        this.props.history.push(url);
    }

    render(){
        return(
            <div className="search">
                <button className="search-btn" onClick={this.handleOpen}><FaSearch /></button>
                <ReactModal 
                ariaHideApp={false}
                className="modal"
                overlayClassName="modal-overlay"
                onRequestClose={this.handleClose}
                shouldCloseOnOverlayClick={true}
                isOpen={this.state.display}>
                    <div className="search-container">
                        <div>
                            <button className="close-btn" onClick={this.handleClose}><FaTimes /></button>
                        </div>
                        <div className="search-content">
                            <form autoComplete="off" onSubmit={this.handleSubmit} className="search-form">
                                <div className="search-form-bar">
                                    <p className="search-paragraph">Search</p>
                                    <input 
                                    type="text"
                                    name="query"
                                    className="element"
                                    placeholder="What are you looking for?"
                                    value={this.state.form.query}
                                    onChange={this.handleChange}/>
                                    <input 
                                    placeholder="Where?"
                                    type="text"
                                    name="city"
                                    className="element"
                                    value={this.state.form.city}
                                    onChange={this.handleChange}/>
                                </div>
                                <button type="submit" className="submit">Search</button>
                            </form>
                        </div>
                    </div>
                </ReactModal>
            </div>
        )
    }
}

export default withRouter(SearchForm);