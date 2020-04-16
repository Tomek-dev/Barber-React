import React, { Component } from 'react';
import Map from './Map';
import Information from './information/Information';
import ReviewPanel from './ReviewPanel';
import Opinion from './Opinion';
import { get } from '../../../util/ApiUtils';
import { FaImages } from 'react-icons/fa';
import Loader from '../loader/Loader';
import './Barber.css';
import ServicePanel from './ServicePanel';

class Barber extends Component{
    constructor(props){
        super(props);
        this.state = {
            barber: '',
            images: [],
            isLoading: true
        }
    }

    componentDidMount = async() =>{
        this.setState({
            ...this.state,
            isLoading: true
        });
        await get('/barber/' + this.props.match.params.id).then(response => {
            this.setState({
                ...this.state,
                barber: response
            })
        }).catch(e => {
            // redirect
        })
        await get('/image/' + this.props.match.params.id).then(response => {
            this.setState({
                ...this.state,
                images: response
            })
        }).catch(e => {
            // redirect
        })
        await this.setState({
            ...this.state,
            isLoading: false
        })
    }

    render(){
        const barber = this.state.barber;
        if(this.state.isLoading){
            return <Loader isLoading={this.state.isLoading} />
        }
        return(
            <div className="barber-container">
                <div className="barber-navbar">
                    <Map barber={barber} />
                    <Information id={this.props.match.params.id}/>
                </div>
                <div className="barber-content">
                    {this.state.images.length > 0 ? null : 
                    (<div className="barber-image">
                        <FaImages />
                    </div>)}
                    <div className="barber-info">
                        <p className="barber-name">{barber.name}</p>
                        <p>{barber.address} {barber.local} {barber.city}</p>
                    </div>
                    <ServicePanel id={this.props.match.params.id}/>
                    <Opinion id={this.props.match.params.id} currentUser={this.props.currentUser}/>
                    <ReviewPanel id={this.props.match.params.id}/>
                </div>
            </div>
        )
    }
}

export default Barber;