import React, { Component } from 'react';

class Map extends Component{
    constructor(props){
        super(props);
        this.state ={
            zoom: 15
        }
    }

    render(){
        const position = [this.props.lat, this.props.lng];
        return(
            <LeafleatMap center={position} zoom={this.state.zoom}>
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url='https://{s}.tile.osm.org/{z}/{x}/{y}.png'
                />
                <Marker position={position}>
                    <Popup>
                        <img />
                        <div>
                            {this.props.name}
                            {this.props.address}
                        </div>
                    </Popup>
                </Marker>
            </LeafleatMap>
        )
    }
}