import React, { Component } from 'react';
import { get } from '../../util/ApiUtils';
import Visit from '../common/visit/Visit';
import MiniLoader from '../common/loader/MiniLoader';
import { formatDateTime } from '../common/DateTimeFormat';
import './History.css';
import { withRouter } from 'react-router-dom';

class History extends Component{
    constructor(props){
        super(props);
        this.state = {
            isLoading: true,
            data: []
        }
    }

    componentDidMount(){
        this.setState({
            isLoading: true
        })
        const date = new Date();
        get('/oauth/visit/value?date=' + formatDateTime(date) +'&method=less').then(response => {
            this.setState({
                isLoading: false,
                data: response
            })
        }).catch(e => {
            this.props.history.push('/error/' + e.status);
        })
    }

    render(){
        if(this.props.display != 2){
            return null;
        }else if(this.state.isLoading){
            return <MiniLoader isLoading={this.state.isLoading} />;
        }
        return(
            <div className="history-list">
                {this.state.data.length ? (this.state.data.map(element => (
                    <Visit key={element.id} visit={element}/>
                ))):(<p className="not-yet">Not found any visit.</p>)}
            </div>
        )
    }
}

export default withRouter(History);