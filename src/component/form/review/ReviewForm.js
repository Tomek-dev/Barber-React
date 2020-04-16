import React, { Component } from 'react';
import { post, get } from '../../../util/ApiUtils';
import ReactModal from 'react-modal';
import Visit from './Visit';

class ReviewForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            form: {
                review: '',
                star: '',
            },
            selected: '',
            data: [],
            error: '',
            display: false
        }
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
    }

    componentDidMount(){
        get('/oauth/visit').then(response => { 
            this.setState({
                ...this.state,
                data: response
            }); 
        }).catch(e => [
            this.setState({
                ...this.state,
                error: e.message || 'Sorry! Something went wrong. Please try again!'
            })
        ]);
    }

    handleOpen() {
        this.setState({ 
            ...this.state, 
            display: true
        });
    }

    handleClose() {
        this.setState({ 
            ...this.state, 
            display: false
        });
    }

    validate = (form) => {
        if(!form.review){
            return 'Review may not be empty.';
        }else if(!form.star){
            return 'Specify the number of stars.';
        }else if(!form.worker || !form.service){
            return 'Specify visit to review.'
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

    handleVisit = (object) => {
        this.setState({
            ...this.state,
            service: object.service,
            worker: object.worker
        });
    }

    handleSelect = (id) => {
        this.setState({
            ...this.state,
            selected: id
        })
    }

    handleSubmit = (event) =>{
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
        post(form, '/review/' + this.state.selected).then(response => {
            this.setState({
                form: {
                    review: '',
                    star: '',
                },
                error: '',
                display: false
            });
        }).catch(e => {
            this.setState({
                ...this.state,
                error: e.message
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
                className="modal"
                overlayClassName="modal-overlay"
                onRequestClose={this.handleReviewPanel}
                shouldCloseOnOverlayClick={true}
                isOpen={this.state.display}>
                    <div className="review-content-form">
                        <form className="review-form" onSubmit={this.onSubmit}>
                            <div className="review-visit">
                                {this.state.data.map(element => (
                                    <Visit review={element} onClick={this.handleSelect}/>
                                ))}
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