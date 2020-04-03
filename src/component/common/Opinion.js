import React, { Component } from 'react';
import { ReviewForm } from '../form/ReviewForm';

class Opinion extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div className="opinion">
                <div className="opinion-element">
                    <p>Opinion</p>
                    <p>...</p>
                    <ReviewForm />
                </div>
                <div className="opinion-element">
                    <p><span>{this.props.opinion.stars}</span>/5</p>
                    <p></p>
                    <p>{this.props.opinion.count}</p>
                </div>
            </div>
        );
    }
}

export default Opinion;