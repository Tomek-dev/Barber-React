import React, { Component } from 'react';

class Author extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div className="author">
                <img />
                <div className="author-props">
                    <p>{props.review.name}</p>
                    <div>
                        
                        <p>{props.review.date}</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default Author;