import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import DropDownMenu from './DropDownMenu';
import Search from '../form/Search';


class Header extends Component {
    constructor(props){
        super(props);
    }

    render(){
        let menu;
        if(false){
            menu = [
                <div className="header-login" key="login">
                    <Link to="/login">Login</Link>
                </div>,
                <div className="header-businesses" key="for-businesses">
                    <Link to="/businesses">FOR BUSINESSES</Link>
                </div>
            ];
        }else{
            menu = [
                <DropDownMenu key="drop-down-menu" />
            ];
        }

        return(
            <div className="header">
                <div className="header-logo">
                    <img />
                </div>
                <div className="header-menu">
                    <Search />
                    {menu}
                </div>
            </div>
        );
    }
}

export default Header;