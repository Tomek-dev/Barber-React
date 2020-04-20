import React, { Component } from 'react';
import { get } from '../../../util/ApiUtils';
import Loader from '../loader/Loader';
import BarberElement from '../main/BarberElement';
import './Search.css';

class Search extends Component{
    constructor(props){
        super(props);
        this.state = {
            data: [],
            isLoading: true,
        }
    }

    componentDidMount(){
        this.setState({
            ...this.state,
            isLoading: true
        })
        get('/search' + this.props.location.search).then(response => {
            this.setState({
                data: response,
                isLoading: false
            })
        }).catch(e => {
            // redirect
        })
    }

    render(){
        if(this.state.isLoading){
            return <Loader isLoading={this.state.isLoading} />;
        }
        return(
            <div className="search-result-container">
                <p className="search-result">Result</p>
                <div className="result-list">
                    {this.state.data.map(element => (
                        <BarberElement key={element.id} barber={element}/>
                    ))}
                </div>
            </div>
        )
    }
}

export default Search;