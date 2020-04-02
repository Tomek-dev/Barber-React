import React, { Component } from 'react';

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
                    <p><span>{this.props.opinion.stars}</span>/5</p>
                    <p></p>
                    <p>{this.props.opinion.count}</p>
                </div>
            </div>
        );
    }
}

export default Opinion;