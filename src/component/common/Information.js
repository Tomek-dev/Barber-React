import React, { Component } from 'react';
import { WorkerMenu } from './WorkerMenu';
import { get } from '../../util/ApiUtils';

class Information extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div className="info">
                <div className="info-about">
                    <p>About us</p>
                    {this.props.barber.about}
                </div>
                <WorkerMenu worker={}/>
                <div className="info-contact">
                    <p>Social media</p>
                    {this.props.barber.social}
                </div>
                <div className="info-open">
                    <p>Opening hours</p>
                    <div className="info-open-element">
                        <div className="info-open-day">
                            <p>Monday</p>
                            <p>Tuesday</p>
                            <p>Wednesday</p>
                            <p>Thursday</p>
                            <p>Friday</p>
                            <p>Saturday</p>
                            <p>Sunday</p>
                        </div>
                        <div className="info-open-hours">
                            {this.props.open.map(hour => {
                                return <p>{hour.open} - {hour.close}</p>
                            })}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Information;