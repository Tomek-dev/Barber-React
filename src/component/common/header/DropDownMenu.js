import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import './DropDownMenu.css';
import { FaUser, FaSlidersH, FaSignOutAlt, FaQuestionCircle, FaBriefcase, FaRegUserCircle } from 'react-icons/fa' 

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
        let items;
        if(this.props.currentUser.type === 'basic'){  
            items = [
                <div className="drop-down-item btn" key="business">
                    <Link className="link" to="/business"><FaBriefcase className="icon"/>Business</Link>
                </div>,
                <div className="drop-down-item btn" key="settings">
                    <Link className="link" to="/settings"><FaSlidersH className="icon"/>Settings</Link>
                </div>,
                <div className="drop-down-item btn" key="help">
                    <Link className="link" to="/help"><FaQuestionCircle className="icon"/>Help</Link>
                </div>,
                <div className="drop-down-item btn" key="logout">
                    <button onClick={this.handleLogout} className="link drop-down-logout-btn"><FaSignOutAlt className="icon"/> Logout</button>
                </div>
            ]
        }else if(this.props.currentUser.type === 'oauht'){ 
            items = [
                <div className="drop-down-item btn">
                    <Link className="link" to="/profile"><FaUser className="icon"/> Profile</Link>
                </div>,
                <div className="drop-down-item btn">
                    <Link className="link" to="/settings"><FaSlidersH className="icon"/>Settings</Link>
                </div>,
                <div className="drop-down-item btn">
                    <Link className="link"><FaSignOutAlt className="icon"/>Logout</Link>
                </div>
            ]
        }

        return(
            <div className="drop-down">
                <button className="drop-down-btn btn" onClick={this.showDropDownMenu}><FaRegUserCircle className="icon"/>Account</button>
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
    //Accoutn to username
}

export default DropDownMenu;