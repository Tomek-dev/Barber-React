import React, { Component } from 'react';
import { get } from '../../../../util/ApiUtils';
import MiniLoader from '../../../common/loader/MiniLoader';
import Social from './Social';
import { FaFolder } from 'react-icons/fa';
import SocialAdd from './SocialAdd';
import './BarberSocial.css';
import { withRouter } from 'react-router-dom';

class BarberSocial extends Component{
    constructor(props){
        super(props);
        this.state = {
            data: [],
            isLoading: false,
            error: ''
        }
        this.handleEdit = this.handleEdit.bind(this);
        this.handleError = this.handleError.bind(this);
    }

    fetchData = () => {
        if(!this.props.id){
            return null;
        }
        this.setState({
            isLoading: true
        });
        get('/social/' + this.props.id).then(response => {
            this.setState({
                data: response,
                isLoading: false
            })
        }).catch(e => {
            this.props.history.push('/error/' + e.status);
        })
    }

    handleError = (msg) => {
        this.setState({
            error: msg
        })
    }

    componentDidMount(){
        this.fetchData();
    }

    handleEdit = () => {
        this.fetchData();
    }

    render(){
        let elements = [];
        if(this.state.isLoading){
            elements = <MiniLoader isLoading={this.state.isLoading} />
        }else if(this.state.data.length > 0){
            elements = this.state.data.map(item => (
                <Social key={item.id} social={item} onError={this.handleError} onEdit={this.handleEdit} onError={this.handleError}/>
            ))
        }else{
            elements = <p className="not-yet"><FaFolder className="icon" /> You don't have any socials yet</p>
        }
        return(
            <div className="social-container">
                <div className="social-info">
                    <p>Add new social</p>
                    <SocialAdd onEdit={this.handleEdit} />
                </div>
                <div className="social-list">
                    {elements}
                </div>
            </div>
        )
    }

}

export default withRouter(BarberSocial);