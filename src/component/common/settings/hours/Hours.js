import React, { Component } from 'react';
import SetHours from './SetHours';
import { get } from '../../../../util/ApiUtils';
import MiniLoader from '../../loader/MiniLoader';
import './Hours.css';
import ChangeHours from './ChangeHours';

class Hours extends Component{
    constructor(props){
        super(props);
        this.state = {
            isLoading: true,
            data: []
        }
        this.handleEdit = this.handleEdit.bind(this);
    }

    fetchData = () => {
        if(!this.props.id){
            return null;
        }
        this.setState({
            ...this.state,
            isLoading: true
        });
        get('/open/week/' + this.props.id).then(response => {
            this.setState({
                ...this.state,
                isLoading: false,
                data: response
            })
        }).catch(e => {
            this.setState({
                ...this.state,
                isLoading: false
            })
            // redirect
        })
    }

    handleEdit(){
        this.fetchData();
    }

    componentDidMount(){
        this.fetchData();
    }

    render(){
        if(this.props.display != 2){
            return null;
        }
        let elements = [];
        if(this.state.isLoading){
            elements = <MiniLoader isLoading={this.state.isLoading} />
        }else if(this.state.data.length > 0){
            elements = <ChangeHours hours={this.state.data} onEdit={this.handleEdit} />
        }else{
            elements = <SetHours onEdit={this.handleEdit} id={this.props.id}/>
        }
        return(
            <div className="hours-container">
                {elements}
            </div>
        )
    }
}

export default Hours;