import React, { Component } from 'react';
import { FaHistory, FaCalendarAlt } from 'react-icons/fa';
import { FaUserAlt } from 'react-icons/fa';
import Reservation from './Reservation';
import History from './History';
import './User.css';

class User extends Component{
    constructor(props){
        super(props);
        this.state = {
            error: '',
            display: 1
        }
        this.handleError = this.handleError.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handleError(msg){
        this.setState({
            ...this.state,
            error: msg
        })
    }

    handleClick = (event) => {
        this.setState({
            display: event.target.value
        });
    }

    render(){
        const currentUser = this.props.currentUser;
        const display = this.state.display;
        return(
            <div className="user-container">
                <div className="user-sidebar">
                    <div className="user-props">
                        {currentUser.url ? (<img />):(<div className="user-image"><FaUserAlt /></div>)}
                        <div>
                            <p>{currentUser.name}</p>
                            <p>{currentUser.email}</p>
                        </div>
                    </div>
                    <div className="user-option">
                        <button value={1} className={`user-btn btn ${display == 5 ? `display`: ``}`} onClick={this.handleClick}><FaCalendarAlt className="icon" />Reservation</button>
                        <button value={2} className={`user-btn btn ${display == 5 ? `display`: ``}`} onClick={this.handleClick}><FaHistory className="icon" />History</button>
                    </div>
                    <div className="error">
                        {this.state.error}
                    </div>
                </div>
                <div className="user-content">
                    <History display={this.state.display}/>
                    <Reservation onError={this.handleError} display={this.state.display}/>
                </div>
            </div>
        )
    }
}

export default User;