import React, { Component } from 'react';
import Navigation from '../Navigation';

class Images extends Component{
    constructor(props){
        super(props);
    }

    render(){
        let elements = [];
        const images = this.props.images;
        if(images){
            // return non image available
        }else if(images.length === 1){
            elements = [
                <img />
            ]
        }else{
            elements = [
                <img src={src} alt={alt}/>,
                <div className="barber-image-option">
                    <Navigation 
                    index={index}
                    count={images.count}
                    {...navigation}
                    />
                </div>
            ]
        }
        return(
            <div className="barber-image">
                {elements}
            </div>
        )
    }
}
export default Images;