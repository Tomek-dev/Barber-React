import React, { Component } from 'react';
import { post } from '../../util/ApiUtils';
import ReactModal from 'react-modal';

class ReviewForm extends Component{
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
            },
            display: false
        }
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.handleReviewPanel = this.handleReviewPanel.bind(this);
    }

    handleReviewPanel(){
        this.setState({ 
            ...this.state, 
            display: !this.state.display
        });
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
                <button onClick={this.handleReviewPanel}>
                    Review
                </button>
                <ReactModal
                ariaHideApp={false}
                className="search-modal"
                overlayClassName="search-modal-overlay"
                onRequestClose={this.handleReviewPanel}
                shouldCloseOnOverlayClick={true}
                isOpen={this.state.display}>
                    <div className="review-content-form">
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
                </ReactModal>
            </div>
        );
    }
}

export default ReviewForm;