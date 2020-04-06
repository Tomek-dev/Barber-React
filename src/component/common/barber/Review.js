import React, { Component } from 'react';
import { Author } from './Author';

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
        return(
            <div className="review">
                <div className="review-header">
                    <Author review={this.props.review}/>
                    <button className="review-report">Report</button>
                </div>
                <div className="review-content">
                    {this.props.review.review}
                    <div className="review-info"> 
                        <button onClick={this.handleShow} className="review-show-button">
                            {this.state.displayShow ? 'Show less' : 'Show more'}
                        </button>
                        {displayShow ? (
                        <div className="review-show">
                            <p>Worker: {this.props.review.worker}</p>
                            <p>Service: {this.props.review.service}</p>
                        </div>
                        ): null}
                    </div>
                </div>
            </div>
        )
    }
}

export default Review;