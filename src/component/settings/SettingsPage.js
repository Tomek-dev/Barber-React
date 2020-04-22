import React, { Component } from 'react';
import { FaCalendarAlt, FaStoreAlt, FaUsersCog, FaBookOpen, FaCamera } from 'react-icons/fa';
import './SettingsPage.css';
import Services from './service/Services';
import Worker from './worker/Worker'
import Barber from './barber/Barber'
import { get } from '../../util/ApiUtils'
import Loader from '../common/loader/Loader';
import CreateBarber from './CreateBarber';
import Hours from './hours/Hours';
import { withRouter } from 'react-router-dom';

class SettingsPage extends Component{
    constructor(props){
        super(props);
        this.state = {
            display: 1,
            barber: [],
            isLoading: false
        }
        this.handleClick = this.handleClick.bind(this);
    }

    fetchData = () => {
        this.setState({
            ...this.state,
            isLoading: true
        });
        get('/barber').then(response => {
            this.setState({
                ...this.state,
                barber: response,
                isLoading: false
            });
        }).catch(e => {
            this.setState({
                ...this.state,
                barber: null,
                isLoading: false
            });
            this.props.history.push('/error/' + e.status);
        })
    }

    handleEdit =() => {
        this.fetchData();
    }

    componentDidMount(){
        this.fetchData();
    }

    handleClick = (event) => {
        this.setState({
            display: event.target.value
        });
    }

    render(){
        if(this.state.isLoading){
            return <Loader isLoading={this.state.isLoading} />;
        }
        if(!this.state.barber){
            return( 
                <div className="settings-container">
                    <CreateBarber onEdit={this.handleEdit}/>
                </div>
            )
        }
        const display = this.state.display;
        let id = this.state.barber.id;
        return(
            <div className="settings-container">
                <div className="settings-content">
                    <div className="settings-nav-bar">
                        <button value="1" className={`settings-btn btn ${display == 1 ? 'display': ''}`} onClick={this.handleClick}>
                            <FaStoreAlt />
                        </button>
                        <button value="2" className={`settings-btn btn ${display == 2 ? 'display': ''}`} onClick={this.handleClick}>
                            <FaCalendarAlt />
                        </button>
                        <button value="3" className={`settings-btn btn ${display == 3 ? `display`: ``}`} onClick={this.handleClick}>
                            <FaBookOpen />
                        </button>
                        <button value="4" className={`settings-btn btn ${display == 4 ? `display`: ``}`} onClick={this.handleClick}>
                            <FaUsersCog />
                        </button>
                        <button value="5" className={`settings-btn btn ${display == 5 ? `display`: ``}`} onClick={this.handleClick}>
                            <FaCamera />
                        </button>
                    </div>
                    <div className="settings-panel">
                        <Barber currentUser={this.props.currentUser} barber={this.state.barber} id={id} display={display}/>
                        <Hours id={id} display={display}/>
                        <Services id={id} display={display}/>
                        <Worker id={id} display={display}/>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(SettingsPage);