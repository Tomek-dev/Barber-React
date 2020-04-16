import React, { Component } from 'react';
import Review from './Review';
import { get } from '../../../util/ApiUtils';
import './ReviewPanel.css';

class ReviewPanel extends Component {
    constructor(props){
        super(props);
        this.state = {
            reviews: []
        }
    }

    componentDidMount(){
        get('/reviews/' + this.props.id).then(response => {
            this.setState({
                ...this.state,
                reviews: response
            })
        }).catch(e => {
            // redirect
        })
    }

    render(){
        const reviews = this.state.reviews;
        return(
            <div className="review-panel-container">
                {reviews ? (<div>
                    {reviews.map(element => (
                        <Review review={element} key={element.id}/>
                    ))}
                </div>) : <p>No reviews yet</p>}
            </div>
        )
    }
}

export default ReviewPanel;