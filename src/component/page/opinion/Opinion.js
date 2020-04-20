import React, { Component } from 'react';
import ReviewForm from './ReviewForm';
import { get } from '../../../util/ApiUtils';
import './Opinion.css';
import { FaStar } from 'react-icons/fa';

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
            })
        }).catch(e => {
            // redirect
        })
    }

    render(){
        const opinion = this.state.data;
        const currentUser = this.props.currentUser;
        return(
            <div className="opinion">
                <div className="opinion-element">
                    <p className="opinion-panel-info">Opinion</p>
                    <p className="opinion-about">Our opinions are 100% authentic because only customers can write reviews</p>
                    {currentUser && currentUser.type === 'oauth' ? (<ReviewForm />):null}
                </div>
                <div className="opinion-element average-info">
                    <p className="opinion-max"><span className="opinion-average">{opinion.average}</span>/5 Stars</p>
                    <div className="star-element">
                            <FaStar className={`star-icon ${opinion.average > 0.5 ? `star`: ``}`} />
                            <FaStar className={`star-icon ${opinion.average > 1.5 ? `star`: ``}`} />
                            <FaStar className={`star-icon ${opinion.average > 2.5 ? `star`: ``}`} />
                            <FaStar className={`star-icon ${opinion.average > 3.5 ? `star`: ``}`} />
                            <FaStar className={`star-icon ${opinion.average > 4.5 ? `star`: ``}`} />
                    </div>
                    <p>{opinion.count} reviews</p>
                </div>
            </div>
        );
    }
}

export default Opinion;