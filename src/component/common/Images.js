import React, { Component } from 'react';
import Navigation from './Navigation';

class Images extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div className="barber-image">
                <img src={src} alt={alt}/>
                <div className="barber-image-option">
                    <Navigation 
                    index={index}
                    count={images.count}
                    {...navigation}
                    />
                </div>
            </div>
        )
    }
}
export default Images;