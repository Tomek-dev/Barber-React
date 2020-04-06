import React, { Component } from 'react';
import { WorkerMenu } from './WorkerMenu';
import { get } from '../../../util/ApiUtils';

class Information extends Component{
    constructor(props){
        super(props);
        this.state ={
            data: [],
            workers: []
        }
    }

    componentDidMount(){
        get('/open/week/' + this.props.id).then(response => {
            this.setState({
                ...this.state,
                data: response
            });
        }).catch(error => {
            // ??
        });
        get('/workers/' + this.props.id).then(response => {
            this.setState({
                ...this.state,
                workers: response
            });
        })
    }

    render(){
        const barber = this.props.barber;
        return(
            <div className="info">
                <div className="info-about">
                    <p>About us</p>
                    {barber.about}
                </div>
                <WorkerMenu worker={this.state.workers}/>
                <div className="info-contact">
                    <p>Social media</p>
                    {barber.social}
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
                            {this.state.data.map(element => {
                                return <p>{element.open} - {element.close}</p>
                            })}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Information;