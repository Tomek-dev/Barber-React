import React, { Component } from 'react';
import ReactModal from 'react-modal';

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
        this.handleSearchPanel = this.handleSearchPanel.bind(this);
    }

    handleSearchPanel() {
        this.setState({ 
            ...this.state, 
            display: !this.state.display
        });
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
                <button onClick={this.handleSearchPanel}>Search</button>
                <ReactModal 
                ariaHideApp={false}
                className="search-modal"
                overlayClassName="search-modal-overlay"
                onRequestClose={this.handleSearchPanel}
                shouldCloseOnOverlayClick={true}
                isOpen={this.state.display}>
                    <div className="search-container">
                        <button onClick={this.hideSearchPanel}>Close</button>
                        <div className="search-content">
                            <form onSubmit={this.handleSubmit} className="search-form">
                                <div className="search-form-bar">
                                    <input 
                                    type="text"
                                    name="query"
                                    className="search-form-element"
                                    value={this.state.form.query}
                                    onChange={this.handleChange}/>
                                    <input 
                                    type="text"
                                    name="city"
                                    className="search-form-element"
                                    value={this.state.form.city}
                                    onChange={this.handleChange}/>
                                </div>
                            </form>
                        </div>
                    </div>
                </ReactModal>
            </div>
        )
    }
}

export default SearchForm;