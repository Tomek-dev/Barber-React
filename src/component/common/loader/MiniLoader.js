import React, { Component } from 'react';
import { css } from "@emotion/core";
import PulseLoader from "react-spinners/PulseLoader";
import './MiniLoader.css';

const override = css`
  display: block;
  margin: 0 auto;
`;

class MiniLoader extends Component{
    constructor(props){
        super(props);
        this.state ={
            isLoading: this.props.isLoading
        };
    }
    
    render(){
        return(
            <div className="mini-loader-container">
                <PulseLoader 
                    css={override}
                    size={15}
                    color={"#362821"}
                    loading={this.state.loading}
                />
            </div>
        )
    }
}

export default MiniLoader;