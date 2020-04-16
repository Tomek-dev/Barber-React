import React, { Component } from 'react';
import { Map as LeafletMap, TileLayer, Marker, Popup } from 'react-leaflet';
import './Map.css';

class Map extends Component{
    constructor(props){
        super(props);
        this.state ={
            zoom: 15
        }
    }

    render(){
        const barber = this.props.barber;
        const position = [barber.latitude, barber.longitude];
        return(
            <LeafletMap center={position} zoom={this.state.zoom}>
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url='https://{s}.tile.osm.org/{z}/{x}/{y}.png'
                />
                <Marker position={position}>
                </Marker>
            </LeafletMap>
        )
    }
}
export default Map;