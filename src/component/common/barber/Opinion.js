import React, { Component } from 'react';
import { ReviewForm } from '../../form/ReviewForm';
import { get } from '../../../util/ApiUtils';

class Opinion extends Component{
    constructor(props){
        super(props);
        this.state = {
            data: ''
        }
    }

    componentDidMount(){
        get('/review/info/' + this.props.id).then(respone => {
            this.setState({
                data: respone
            }).catch(error => {
                // ??
            })
        })
    }

    render(){
        const opinion = this.state.data;
        return(
            <div className="opinion">
                <div className="opinion-element">
                    <p>Opinion</p>
                    <p>...</p>
                </div>
                <div className="opinion-element">
                    <div>
                        <p><span>{opinion.average}</span>5</p>
                        <p></p>
                        <p>{opinion.count}</p>
                    </div>
                    <ReviewForm />
                </div>
            </div>
        );
    }
}

export default Opinion;