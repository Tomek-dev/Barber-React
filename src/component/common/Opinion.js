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
                </div>
                <div className="opinion-element">
                    <div>
                        <p><span>{this.props.opinion.average}</span>5</p>
                        <p></p>
                        <p>{this.props.opinion.count}</p>
                    </div>
                    <ReviewForm />
                </div>
            </div>
        );
    }
}

export default Opinion;