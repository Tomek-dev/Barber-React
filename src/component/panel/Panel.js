import React, { Component } from 'react';
import Visit from '../common/visit/Visit';
import { get } from '../../util/ApiUtils';
import Loader from '../common/loader/Loader';
import './Panel.css';
import { FaCalendarAlt } from 'react-icons/fa';
import { withRouter } from 'react-router-dom';

class Panel extends Component{
    constructor(props){
        super(props);
        this.state = {
            data: [],
            isLoading: true
        }
    }

    componentDidMount(){
        this.setState({
            isLoading: true,
        })
        get('/visits').then(response => {
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
            <div className="panel-container">
                <p className="visit-paragraph">Visits: </p>
                {this.state.data.length > 0 ? this.state.data.map(element => (
                    <Visit key={element.id} visit={element}/>
            )): (<div className="panel-center"><p className="not-yet"><FaCalendarAlt className="icon" />Not found any visit.</p></div>)}
            </div>
        )
    }
}

export default withRouter(Panel);