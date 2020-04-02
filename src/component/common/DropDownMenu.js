import React, { Component } from 'react';
import { Link } from 'react-router-dom'

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
        return(
            <div className="drop-down">
                <button onClick={this.showDropDownMenu}>Profil</button>
                <div className="drop-down-list">
                {this.state.displayMenu ? (
                    <div className="drop-down-menu">
                        <div className="drop-drop-item">
                            <Link to="/business">Business</Link>
                        </div>
                        <div className="drop-drop-item">
                            <Link to="/settings">Settings</Link>
                        </div>
                        <div className="drop-drop-item">
                            <Link to="/help">Help</Link>
                        </div>
                        <div className="drop-drop-item">
                            <Link to="logout">Logout</Link>
                        </div>
                    </div>
                ): null}
                </div>
            </div>
        );
    }
}

export default DropDownMenu;