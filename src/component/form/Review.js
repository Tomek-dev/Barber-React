import React, { Component } from 'react';
import { post } from '../../util/ApiUtils';

class Review extends Component{
    constructor(props){
        super(props);
        this.state = {
            form: {
                review: '',
                star: '',
                worker: '',
                service: ''
            },
            error: {
                msg: '',
                status: ''
            }
        }
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    validate = (form) => {
        if(!form.review){
            return 'Review may not be empty';
        }else if(!form.star){
            return 'Specify the number of stars';
        }
        // validate other
        return null;
    }

    handleChange = (event) => {
        this.setState({
            ...this.state,
            [event.target.name]: event.target.value
        });
    }

    handleSubmit = (event) =>{
        event.preventDefault();
        const form = this.state.form;
        const errorMsg = this.validate(form);
        if(errorMsg){
            this.setState({
                ...this.state,
                error: {
                    msg: errorMsg,
                    status: 'error'
                }
            });
            return;
        }
        post(form, '/review/').then(response => {   // set id barber
            this.setState({
                form: {
                    review: '',
                    star: '',
                    worker: '',
                    service: ''
                },
                error: {
                    msg: 'Successfully added review',
                    status: 'success'
                }
            });
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
        return(
            <div className="review-container-form">
                <form className="review-form" onSubmit={this.onSubmit}>
                    <div className="review-visit">
                        <input />
                    </div>
                    <div className="review-form-content">
                        <input 
                        type=""
                        name="review"
                        className="review-input"
                        value={this.state.form.review}
                        onChange={this.onChange}
                        />
                        <input 
                        
                        />
                        <button type="submit">Review</button>
                    </div>
                </form>
            </div>
        );
    }
}