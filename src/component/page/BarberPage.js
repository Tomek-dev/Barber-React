import React, { Component } from 'react';
import { get } from '../../util/ApiUtils'
import ServicePanel from '../common/barber/ServicePanel';
import ReviewPanel from '../common/barber/ReviewPanel';
import Information from '../common/barber/Information';

class Barber extends Component{
    constructor(props){
        super(props);
        this.state = {
            images: [],
            barber: '',
            services: []
        }
    }

    componentDidMount(){
        get('/image/' + this.props.match.params.id).then(response => {
            this.setState({
                ...this.state,
                images: response
            });
        }).catch(error => {
            // ??
        })
        get('/barber/' + this.props.match.params.id).then(response => {
            this.setState({
                ...this.state,
                barber: response
            })
        }).catch(error => {
            // ??
        })
        get('/service/value?barber=' + this.props.match.params.id).then(response => {
            this.setState({
                ...this.state,
                services: response
            });
        }).catch(error => {
            // ??
        })
    }

    render(){
        const barber = this.state.barber;
        return(
            <div className="barber-container">
                <div className="barber-content">
                    <Images images={this.state.images}/>
                    <div className="barber-info-bar">
                        <p className="barber-name">{barber.name}</p>
                        <p className="barber-address">{barber.address}</p>
                    </div>
                    <Opinion id={this.props.match.params.id}/>
                    <ServicePanel services={this.state.services}/>
                    <ReviewPanel id={this.props.match.params.id}/>
                </div>
                <div className="barber-sidebar">
                    <Map barber={barber}/>
                    <Information id={this.props.match.params.id} barber={this.state.barber} />
                </div>
            </div>
        );
    }
}

export default BarberPage;