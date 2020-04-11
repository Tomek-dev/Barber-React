import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Bottom.css'

class Bottom extends Component{

    render(){
        return(
            <div className="bottom-container">
                <div className="bottom-element">
                    <p>© 2020 Barber</p>
                    <p>Terms</p>
                    <p>Privacy</p>
                </div>
                <div className="bottom-logo">
                    <Link className="logo-name bottom-name" to="/">Barber</Link>
                    <img alt="" src=""/>
                </div>
                <div className="bottom-element">
                    <p>Help</p>
                    <p>Contact</p>
                    <p>About</p>
                </div>
            </div>
        )
    }
}

export default Bottom;