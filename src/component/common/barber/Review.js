import React, { Component } from 'react';
import Author from '../barber/Author';
import { FaExclamation } from 'react-icons/fa';
import './Review.css';
import Report from './report/Report';

class Review extends Component{
    constructor(props){
        super(props);
        this.state = {
            displayShow: false,
        }
        this.handleShow = this.handleShow.bind(this);
    }

    handleShow(){
        this.setState({ 
            displayShow: !this.state.displayShow 
        });       
    }

    render(){
        const review = this.props.review;
        return(
            <div className="review">
                <div className="review-header">
                    <Author review={review}/>
                    <Report id={review.id}/>
                </div>
                <div className="review-content">
                    <p className="review-text">{review.review}</p>
                    <div className="review-info"> 
                        <button className="btn review-btn" onClick={this.handleShow} >
                            {this.state.displayShow ? 'Show less' : 'Show more'}
                        </button>
                        {this.state.displayShow ? (
                        <div className="review-show">
                            <p>Worker: {review.workerName}</p>
                            <p>Service: {review.serviceName}</p>
                        </div>
                        ): null}
                    </div>
                </div>
            </div>
        )
    }
}

export default Review;