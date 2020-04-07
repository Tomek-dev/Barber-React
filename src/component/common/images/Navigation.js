import React, { Component } from 'react';
import Dots from './Dots';
import { FaAngleLeft, FaAngleRight} from 'react-icons/fa';

const Navigation = ({
    index,
    count,
    next,
    previous,
    go,
}) => {
    return(
        <div className="navigation">
            <button className="navigation-next-prev" onClick={previous}>
                <FaAngleRight />
            </button>
            <Dots index={index} count={count} go={go}/>
            <button className="navigation-next-prev" onClick={next}>
                <FaAngleLeft />
            </button>
        </div>
    );
}

export default Navigation;