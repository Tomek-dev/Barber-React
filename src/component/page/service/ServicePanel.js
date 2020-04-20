import React, { Component } from 'react';
import Service from './Service';
import './ServicePanel.css';
import { get } from '../../../util/ApiUtils';

class ServicePanel extends Component {
    constructor(props){
        super(props);
        this.state={
            services: []
        }
    }

    componentDidMount(){
        get('/service/value?barber=' + this.props.id).then(response => {
            this.setState({
                ...this.state,
                services: response
            })
        }).catch(e => {
            // redirect
        })
    }

    render(){
        return(
            <div className="service-panel-container">
                <p className="service-panel-info">Services</p>
                <div className="service-panel">
                    {this.state.services.map(element => {
                        return <Service currentUser={this.props.currentUser} id={this.props.id} key={element.id} service={element}/>
                    })}
                </div>
            </div>
        )
    }
}

export default ServicePanel;