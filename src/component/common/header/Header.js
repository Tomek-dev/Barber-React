import React, { Component } from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import DropDownMenu from './DropDownMenu';
import SearchForm from './SearchForm';
import { FaRegUserCircle } from 'react-icons/fa'

class Header extends Component {
    constructor(props){
        super(props);
    }

    render(){
        let menu;
        if(!this.props.currentUser){ 
            menu = [
                <div className="header-login" key="login">
                    <Link to="/login" className="login-link"><FaRegUserCircle className="icon"/> Login</Link>
                </div>,
                <div className="header-businesses" key="for-businesses">
                    <Link to="/businesses" className="businesses-link">Businesses</Link>
                </div>
            ];
        }else{
            menu = [
                <DropDownMenu onLogout={this.props.onLogout} currentUser={this.props.currentUser} key="drop-down-menu" />
            ];
        }

        return(
            <div className="header">
                <div className="header-logo">
                    <Link className="logo-name" to="/">Barber</Link>
                    <img alt="" src=""/>
                </div>
                <div className="header-menu">
                    <SearchForm />
                    {menu}
                </div>
            </div>
        );
    }
}

export default Header;