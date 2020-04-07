import React, { Component } from 'react';
import ReactModal from 'react-modal';
import './SearchForm.css';
import { FaSearch, FaTimes } from 'react-icons/fa'

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
        if(!form.city){
            return 'This field may not be empty.';
        }
        return null;
    }

    url = (form) => {
        let search = '/search?=' + form.city;
        if(!form.query){
            search += '&query=' + form.query;
        }
        return search;
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
        this.context.history.push(url);
    }

    render(){
        return(
            <div className="search">
                <button className="search-btn" onClick={this.handleOpen}><FaSearch /></button>
                <ReactModal 
                ariaHideApp={false}
                className="search-modal"
                overlayClassName="search-modal-overlay"
                onRequestClose={this.handleClose}
                shouldCloseOnOverlayClick={true}
                isOpen={this.state.display}>
                    <div className="search-container">
                        <div>
                            <button className="search-close-btn" onClick={this.handleClose}><FaTimes /></button>
                        </div>
                        <div className="search-content">
                            <form autocomplete="off" onSubmit={this.handleSubmit} className="search-form">
                                <div className="search-form-bar">
                                    <p className="search-paragraph">Search</p>
                                    <input 
                                    type="text"
                                    name="query"
                                    className="search-form-element"
                                    placeholder="
                                    What are you looking for?"
                                    value={this.state.form.query}
                                    onChange={this.handleChange}/>
                                    <input 
                                    placeholder="Where?"
                                    type="text"
                                    name="city"
                                    className="search-form-element"
                                    value={this.state.form.city}
                                    onChange={this.handleChange}/>
                                </div>
                                <button type="submit" className="search-btn-submit">Search</button>
                            </form>
                        </div>
                    </div>
                </ReactModal>
            </div>
        )
    }
}

export default SearchForm;