import React, { Component } from 'react';

class Dots extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div className="dots">
                {Array.from(Array(this.props.count), (_, i) => i).map(i => (
                    <button key={i} disabled={i === this.props.index} onClick={() => this.props.go(i)}></button>
                ))}
            </div>
        );
    }
}
export default Dots;