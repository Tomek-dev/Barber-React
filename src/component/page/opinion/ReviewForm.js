import React, { Component } from 'react';
import { post, get } from '../../../util/ApiUtils';
import ReactModal from 'react-modal';
import Visit from './Visit';
import { FaStar, FaTimes } from 'react-icons/fa';
import { withRouter } from 'react-router-dom';
import './ReviewForm.css';
import { formatDateTime } from '../../common/DateTimeFormat';

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
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
        this.handleStar = this.handleStar.bind(this);
    }

    componentDidMount(){
        const user = this.props.currentUser;
        if(user && user.type === 'oauth'){
            const date = new Date();
            get('/oauth/visit/value?date=' + formatDateTime(date) +'&method=less').then(response => {
                this.setState({
                    isLoading: false,
                    data: response
                })
            }).catch(e => {
                this.props.history.push('/error/' + e.status);
            })
        }
    }

    handleOpen() {
        const user = this.props.currentUser;
        if(!user || (user && user.type !== 'oauth')){
            this.props.history.push('/login');
        }
        this.setState({ 
            display: true
        });
    }

    handleClose() {
        this.setState({ 
            display: false
        });
    }

    validate = (form) => {
        if(!form.review){
            return 'Review may not be empty.';
        }else if(!form.star){
            return 'Specify the number of stars.';
        }else if(!this.state.selected){
            return 'Specify visit to review.'
        }else if(!form.star){
            return 'Specify star to review.'
        }
        return null;
    }

    handleChange = (event) => {
        this.setState({
            form: {
                ...this.state.form,
                [event.target.name]: event.target.value
            }
        });
    }

    handleVisit = (object) => {
        this.setState({
            service: object.service,
            worker: object.worker
        });
    }

    handleSelect = (id) => {
        this.setState({
            selected: id
        })
    }
    
    handleStar = (value) => {
        this.setState({
            form: {
                ...this.state.form,
                star: value
            }
        })
    }

    handleSubmit = (event) =>{
        event.preventDefault();
        const form = this.state.form;
        const errorMsg = this.validate(form);
        if(errorMsg){
            this.setState({
                error: errorMsg
            });
            return;
        }
        post(form, '/oauth/reviews/add/' + this.state.selected).then(() => {
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
                error: e.message
            });
        });
    }

    render(){  
        const data = this.state.data;
        return(
            <div className="review-container-form">
                <button onClick={this.handleOpen} className="submit review-open">
                    Review
                </button>
                <ReactModal
                ariaHideApp={false}
                className="modal"
                overlayClassName="modal-overlay"
                onRequestClose={this.handleClose}
                shouldCloseOnOverlayClick={true}
                isOpen={this.state.display}>
                    <div className="review-content-modal">
                        <div>
                            <button className="close-btn" onClick={this.handleClose}><FaTimes className="icon" /></button>
                        </div>
                        <form className="review-form" onSubmit={this.handleSubmit}>
                            <div className="error">
                                {this.state.error}
                            </div>
                            <div className="review-visit">
                                {data.length > 0 ? data.map(element => (
                                    <Visit key={element.id} review={element} onClick={this.handleSelect(element.id)}/>
                                )): <p className="not-yet">Not found any visit.</p>}
                            </div>
                            <input 
                            placeholder="Review"
                            type="text"
                            name="review"
                            className="element review-element"
                            value={this.state.form.review}
                            onChange={this.handleChange}
                            />
                            <div className="review-form-star">
                                <button type="button" className="btn" onClick={()=> this.handleStar(1)}><FaStar className={`star-form ${this.state.form.star > 0 ? `star`: ``}`}/></button>
                                <button type="button" className="btn" onClick={()=> this.handleStar(2)}><FaStar className={`star-form ${this.state.form.star > 1 ? `star`: ``}`}/></button>
                                <button type="button" className="btn" onClick={()=> this.handleStar(3)}><FaStar className={`star-form ${this.state.form.star > 2 ? `star`: ``}`}/></button>
                                <button type="button" className="btn" onClick={()=> this.handleStar(4)}><FaStar className={`star-form ${this.state.form.star > 3 ? `star`: ``}`}/></button>
                                <button type="button" className="btn" onClick={()=> this.handleStar(5)}><FaStar className={`star-form ${this.state.form.star > 4 ? `star`: ``}`}/></button>
                            </div>
                            <button type="submit" className="submit">Review</button>
                        </form>
                    </div>
                </ReactModal>
            </div>
        );
    }
}

export default withRouter(ReviewForm);