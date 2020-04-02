import React, { Component } from 'react';
import { get } from '../../util/ApiUtils';
import ReactModal from 'react-modal';

class Search extends Component{
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
        this.showSearchPanel = this.showSearchPanel.bind(this);
        this.hideSearchPanel = this.hideSearchPanel.bind(this);
    }

    showSearchPanel() {
        this.setState({ 
            ...this.state, 
            display: true
        });
      }
    
    hideSearchPanel() {
        this.setState({ 
            ...this.state, 
            display: false 
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
        get(url).ther(response => {
            // ??
            this.context.history.push(url);
        }).catch(e => {
            this.setState({
                ...this.state,
                error: {
                    msg: e.message || 'Sorry! Something went wrong. Please try again!',
                    status: 'error'
                }
            });
        });
    }

    render(){
        const element = 
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

        return(
            <div className="search">
                <button onClick={this.showSearchPanel}>Search</button>
                <ReactModal 
                ariaHideApp={false}
                className="search-modal"
                overlayClassName="search-modal-overlay"
                onRequestClose={this.hideSearchPanel}
                isOpen={this.state.display}>
                    {element}
                </ReactModal>
            </div>
        )
    }
}

export default Search;