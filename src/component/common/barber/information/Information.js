import React, { Component } from 'react';
import Worker from './Worker';
import { get } from '../../../../util/ApiUtils';
import Day from './Day';
import Socials from './Socials';
import MiniLoader from '../../loader/MiniLoader';
import './Information.css';

class Information extends Component{
    constructor(props){
        super(props);
        this.state ={
            hours: [],
            workers: [],
            socials: [],
            isLoading: true,
        }
    }

    componentDidMount = async() => {
        this.setState({
            ...this.state,
            isLoading: true
        })
        await get('/open/week/' + this.props.id).then(response => {
            this.setState({
                ...this.state,
                hours: response
            });
        }).catch(e => {
            // redirect
        });
        await get('/workers/' + this.props.id).then(response => {
            this.setState({
                ...this.state,
                workers: response
            });
        }).catch(e => {
            // redirect
        })
        await get('/social/' + this.props.id).then(response => {
            this.setState({
                ...this.state,
                socials: response
            });
        }).catch(e => {
            // redirect
        })
        await this.setState({
            ...this.state,
            isLoading: false
        })
    }

    render(){
        const barber = this.props.barber;
        if(this.state.isLoading){
            return <div className="info-loading">
                <MiniLoader isLoading={this.state.isLoading} />
            </div>
        }
        return(
            <div className="info">
                {this.state.workers.length > 0 ? (
                    <div className="barber-worker-list">
                        <Worker workers={this.state.workers}/>
                    </div>
                ): null}
                {this.state.socials ? (
                    <div className="info-contact">
                    <p>Social media</p>
                        {this.state.socials.map(element => (
                            <Socials social={element} key={element.id} />
                        ))}
                    </div>
                ): null}
                {this.state.hours ? (
                    <div className="info-open">
                        <p className="info-open-paragraph">Opening hours</p>
                        <div className="info-open-element">
                            {this.state.hours.map(element => (
                                <Day key={element.id} hours={element}/>
                            ))}
                        </div>
                    </div>
                ): null}
            </div>
        )
    }
}

export default Information;