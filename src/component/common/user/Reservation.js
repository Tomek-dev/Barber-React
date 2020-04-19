import React, { Component } from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import { get, del } from '../../../util/ApiUtils';
import MiniLoader from '../loader/Loader';
import Visit from './Visit';
import { formatDate } from '../barber/Reservation';
import './Reservation.css';

export function formatDateTime(date){
    let format = new Date(date),
        hours = '' + (format.getHours()),
        minutes = '' + format.getMinutes(),
        seconds = '' + format.getSeconds();

    if(hours.length < 2) 
        hours = '0' + hours;
    if(minutes.length < 2) 
        minutes = '0' + minutes;
    if(seconds.length < 2) 
        seconds = '0' + seconds;
    return formatDate(date) + 'T' + hours + ':' + minutes + ':' + seconds+ '.0'
}

class Reservation extends Component{
    constructor(props){
        super(props);
        this.state = {
            isLoading: true,
            data: []
        }
    }

    fetchData(){
        this.setState({
            ...this.state,
            isLoading: true
        })
        const date = new Date();
        get('/oauth/visit/value?date=' + formatDateTime(date) +'&method=greater').then(response => {
            this.setState({
                isLoading: false,
                data: response
            })
        }).catch(e => {
            //redirect
        })
    }

    componentDidMount(){
        this.fetchData();
    }

    handleEdit(){
        this.fetchData();
    }

    render(){
        const data = this.state.data;
        if(this.props.display != 1){
            return null;
        }else if(this.state.isLoading){
            return <MiniLoader isLoading={this.state.isLoading} />;
        }
        return(
            <div className="reservation-list">
                {data.length ? (data.map(element => (
                    <Visit key={element.id} visit={element} onError={this.props.onError} onEdit={this.handleEdit}/>
                ))):(<p className="not-yet">Not found any reservation.</p>)}
            </div>
        )
    }
}

export default Reservation;