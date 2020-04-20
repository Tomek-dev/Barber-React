import React, { Component } from 'react';
import { FaUserAlt, FaStar } from 'react-icons/fa';
import './Author.css';

class Author extends Component{
    constructor(props){
        super(props);
    }

    render(){
        const review = this.props.review;
        return(
            <div className="author">
                {review.url ? (<img />):(<div className="author-image"><FaUserAlt /></div>)}
                <div className="author-props">
                    <p>{this.props.review.ownerName}</p>
                    <div>
                        <div className="review-star">
                            <FaStar className={`star-review ${review.star > 0.5 ? `star`: ``}`} />
                            <FaStar className={`star-review ${review.star > 1.5 ? `star`: ``}`} />
                            <FaStar className={`star-review ${review.star > 2.5 ? `star`: ``}`} />
                            <FaStar className={`star-review ${review.star > 3.5 ? `star`: ``}`} />
                            <FaStar className={`star-review ${review.star > 4.5 ? `star`: ``}`} />
                        </div>
                        <p>{this.props.review.date}</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default Author;