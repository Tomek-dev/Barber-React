import React, { Component } from 'react';
import { FaCalendarAlt, FaStoreAlt, FaUsersCog, FaBookOpen, FaCamera } from 'react-icons/fa';
import './SettingsPage.css';
import Services from './service/Services';
import Worker from './worker/Worker'

class SettingsPage extends Component{
    constructor(props){
        super(props);
        this.state = {
            display: 1
        }
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick = (event) => {
        this.setState({
            display: event.target.value
        });
    }

    render(){
        const display = this.state.display;
        const id = this.props.match.params.id;
        return(
            <div className="settings-container">
                <div className="settings-content">
                    <div className="settings-nav-bar">
                        <button value="1" className={`settings-btn ${display == 1 ? 'display': ''}`} onClick={this.handleClick}>
                            <FaStoreAlt />
                        </button>
                        <button value="2" className={`settings-btn ${display == 2 ? 'display': ''}`} onClick={this.handleClick}>
                            <FaCalendarAlt />
                        </button>
                        <button value="3" className={`settings-btn ${display == 3 ? `display`: ``}`} onClick={this.handleClick}>
                            <FaBookOpen />
                        </button>
                        <button value="4" className={`settings-btn ${display == 4 ? `display`: ``}`} onClick={this.handleClick}>
                            <FaUsersCog />
                        </button>
                        <button value="5" className={`settings-btn ${display == 5 ? `display`: ``}`} onClick={this.handleClick}>
                            <FaCamera />
                        </button>
                    </div>
                    <div className="settings-panel">
                        <Services id={id} display={display}/>
                        <Worker id={id} display={display}/>
                    </div>
                </div>
            </div>
        )
    }
}

export default SettingsPage;