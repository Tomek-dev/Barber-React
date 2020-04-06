import React, { Component } from 'react';
import Service from './Service';

class ServicePanel extends Component {
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div className="service-panel-container">
                <p>Services</p>
                <div className="service-panel">
                    {this.props.services.map(element => {
                        return <Service service={element}/>
                    })}
                </div>
            </div>
        )
    }
}

export default ServicePanel;