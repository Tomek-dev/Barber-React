import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { get } from '../../../util/ApiUtils';
import { FaImages, FaStar } from 'react-icons/fa';
import './BarberElement.css';

class BarberElement extends Component{
    constructor(props){
        super(props);
        this.state = {
            images: [],
            review: '',
        }
    }
    
    fetchData = () => {
        get('/image/' + this.props.barber.id).then(response => {
            this.setState({
                images: response
            })
        }).catch(e => {
            this.props.history.push('/error/' + e.status);
        })
        get('/review/info/' + this.props.barber.id).then(response => {
            this.setState({
                review: response
            })
        }).catch(e => {
            this.props.history.push('/error/' + e.status);
        })
    }

    componentDidMount(){
        this.fetchData();
    }

    render(){
        const barber = this.props.barber;
        const review = this.state.review;
        if(!review || !barber){
            return null;
        }
        return(
            <div className="barber-top">
                <Link className="barber-link barber-element-image" to={'/barber/' + this.props.barber.id}>
                    {this.state.images.length > 0 ? null : 
                    (<div className="barber-top-image">
                        <FaImages />
                    </div>)} 
                </Link>
                <div className="barber-props">
                    <div className="barber-top-element left">
                        <Link className="barber-link" to={'/barber/' + this.props.barber.id}>
                            <p className="barber-top-name">{barber.name}</p>
                            <p>{barber.address} {barber.local} {barber.city}</p>
                        </Link>
                    </div>
                    <div className="barber-top-element right">
                        <div className="barber-average-star">
                            <FaStar className={`star-barber ${review.average > 0.5 ? `star`: ``}`} />
                            <FaStar className={`star-barber ${review.average > 1.5 ? `star`: ``}`} />
                            <FaStar className={`star-barber ${review.average > 2.5 ? `star`: ``}`} />
                            <FaStar className={`star-barber ${review.average > 3.5 ? `star`: ``}`} />
                            <FaStar className={`star-barber ${review.average > 4.5 ? `star`: ``}`} />
                        </div>
                        <p>{review.count} Reviews</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(BarberElement);