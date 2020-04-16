import React, { Component } from 'react';
import './Reservation.css';

class Reservation extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div>
                <button className="submit reservation-submit">Visit</button>
            </div>
        )
    }
}

export default Reservation;