import React, { Component } from 'react';
import { css } from "@emotion/core";
import PulseLoader from "react-spinners/PulseLoader";
import './Loader.css';

const override = css`
  display: block;
  margin: 0 auto;
`;

class Loader extends Component{
    constructor(props){
        super(props);
        this.state ={
            isLoading: this.props.isLoading
        };
    }
    
    render(){
        return(
            <div className="loader-container">
                <PulseLoader 
                    css={override}
                    size={25}
                    color={"#362821"}
                    loading={this.state.loading}
                />
            </div>
        )
    }
}

export default Loader;