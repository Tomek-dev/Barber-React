import React, { Component } from 'react';
import Dots from './Dots';

class Navigation extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div className="navigation">
                <button className="navigation-next-prev" onClick={this.props.prev}>
                    &lt;
                </button>
                <Dots index={this.props.index} count={this.props.count} go={this.props.go}/>
                <button className="navigation-next-prev" onClick={this.props.next}>
                    &gt;
                </button>
            </div>
        );
    }
}
export default Navigation;