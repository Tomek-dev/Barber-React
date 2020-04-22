import React, { Component } from 'react';
import BarberElement from '../common/barber/BarberElement';
import { get } from '../../util/ApiUtils';
import Loader from '../common/loader/Loader';
import './Index.css';
import { withRouter } from 'react-router-dom';

class Index extends Component{
    constructor(props){
        super(props);
        this.state = {
            data: [],
            isLoading: true
        }
    }

    componentDidMount(){
        this.setState({
            ...this.state,
            isLoading: true
        })
        get('/barbers').then(response => {
            this.setState({
                isLoading: false,
                data: response
            })
        }).catch(e => {
            this.props.history.push('/error/' + e.status);
        })
    }

    render(){
        if(this.state.isLoading){
            return <Loader isLoading={this.state.isLoading} />;
        }
        return(
            <div className="index-container">
                <p className="index-popular">Most Popular</p>
                <div className="top-list">
                    {this.state.data.map(element => (
                        <BarberElement key={element.id} barber={element}/>
                    ))}
                </div>
            </div>
        )
    }
}

export default withRouter(Index);