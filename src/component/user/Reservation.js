import React, { Component } from 'react';
import { get } from '../../util/ApiUtils';
import MiniLoader from '../common/loader/MiniLoader';
import { formatDateTime } from '../common/DateTimeFormat';
import Visit from './Visit';
import './Reservation.css';
import { withRouter } from 'react-router-dom';

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
            this.props.history.push('/error/' + e.status);
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

export default withRouter(Reservation);