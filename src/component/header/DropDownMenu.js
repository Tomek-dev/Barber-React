import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import './DropDownMenu.css';
import { FaUser, FaSlidersH, FaSignOutAlt, FaBriefcase, FaRegUserCircle, FaCalendarAlt } from 'react-icons/fa' 

class DropDownMenu extends Component {
    constructor(props){
        super(props);
        this.state = {
            displayMenu: false,
        };
        this.showDropDownMenu = this.showDropDownMenu.bind(this);
        this.hideDropDownMenu = this.hideDropDownMenu.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
    }

    handleLogout(){
        this.props.onLogout();
    }

    showDropDownMenu(event) {
        event.preventDefault();
        this.setState({ displayMenu: true }, () => {
        document.addEventListener('click', this.hideDropDownMenu);
        });
      }
    
    hideDropDownMenu() {
        this.setState({ displayMenu: false }, () => {
        document.removeEventListener('click', this.hideDropDownMenu);
        });
    }

    render(){
        const currentUser = this.props.currentUser;
        let items;
        if(currentUser.type === 'basic'){  
            items = [
                <div className="drop-down-item" key="business">
                    <Link className="link" to={'/barber/' + currentUser.barberId}><FaBriefcase className="drop-icon"/>Business</Link>
                </div>,
                <div className="drop-down-item" key="settings">
                    <Link className="link" to="/settings"><FaSlidersH className="drop-icon"/>Settings</Link>
                </div>,
                <div className="drop-down-item" key="settings">
                    <Link className="link" to="/visit"><FaCalendarAlt className="drop-icon"/>Visits</Link>
                </div>,
                <div className="drop-down-item" key="logout">
                    <button onClick={this.handleLogout} className="link drop-down-logout-btn"><FaSignOutAlt className="drop-icon"/> Logout</button>
                </div>
            ]
        }else if(currentUser.type === 'oauth'){ 
            items = [
                <div className="drop-down-item">
                    <Link className="link" to="/profile"><FaUser className="icon"/> Profile</Link>
                </div>,
                <div className="drop-down-item" key="logout">
                    <button onClick={this.handleLogout} className="link drop-down-logout-btn"><FaSignOutAlt className="drop-icon"/> Logout</button>
                </div>
            ]
        }

        return(
            <div className="drop-down">
                <button className="drop-down-btn btn" onClick={this.showDropDownMenu}>{currentUser.type === 'oauth' && currentUser.imageUrl ? (<img className="profile-image" src={currentUser.imageUrl} alt={currentUser.name}/>):(<FaRegUserCircle className="icon"/>)}{currentUser.name}</button>
                <div className="drop-down-list">
                {this.state.displayMenu ? (
                    <div>
                        {items}
                    </div>
                ): null}
                </div>
            </div>
        );
    }
}

export default DropDownMenu;