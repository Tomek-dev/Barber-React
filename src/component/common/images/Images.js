import React, { Component } from 'react';
import Navigation from './Navigation';
import { FaCamera } from 'react-icons/fa';
import { useStep } from 'react-hooks-helper';

const Images = ({images, initalStep}) => {
    const { step, navigation, index, isPaused, autoAdvanceDuration } = useStep({
        initalStep,
        autoAdvanceDuration: 5000,
        steps: images
    });
    const {src, alt=''} = step;

    const elements = [];
    const list = this.props.images;
    if(list){
        elements =
        <div>
            <div className="image-not-found">
                <p><FaCamera /></p>
                <p>Images not found.</p>
            </div>
        </div>
    }else if(list.length === 1){
        elements = [
            <img src={list.src}/>
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
    );

}

export default Images;