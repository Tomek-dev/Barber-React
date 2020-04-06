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
    }

    handleMenuClick({ key }){
        if(key === "logout"){
            this.props.onLogout();
        }
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
        if(true){   //this.props.user.auth = 'busisness'
            items = [
                <div className="drop-down-item" key="business">
                    <Link className="link" to="/business"><FaBriefcase className="icon"/>Business</Link>
                </div>,
                <div className="drop-down-item" key="settings">
                    <Link className="link" to="/settings"><FaSlidersH className="icon"/>Settings</Link>
                </div>,
                <div className="drop-down-item" key="help">
                    <Link className="link" to="/help"><FaQuestionCircle className="icon"/>Help</Link>
                </div>,
                <div className="drop-down-item" key="logout">
                    <Link className="link" to="logout"><FaSignOutAlt className="icon"/> Logout</Link>
                </div>
            ]
        }else if(false){ //this.props.user.auth = 'user'
            items = [
                <div className="drop-down-item">
                    <Link className="link" to="/profile"><FaUser className="icon"/> Profile</Link>
                </div>,
                <div className="drop-down-item">
                    <Link className="link" to="/settings"><FaSlidersH className="icon"/>Settings</Link>
                </div>,
                <div className="drop-down-item">
                    <Link className="link" to="logout"><FaSignOutAlt className="icon"/>Logout</Link>
                </div>
            ]
        }

        return(
            <div className="drop-down">
                <button className="drop-down-btn" onClick={this.showDropDownMenu}><FaRegUserCircle className="icon"/>Account</button>
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