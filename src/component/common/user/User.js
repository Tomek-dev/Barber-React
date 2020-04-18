import React, { Component } from 'react';
import Visit from './Visit';

class User extends Component{
    constructor(props){
        super(props);
        this.state = {
            data: [],
            isLoading: true,
            error: ''
        }
    }

    fetchData(){
        this.setState({
            ...this.state,
            isLoading: true,
        })
        get('/oauth/visit').then(response => {
            this.setState({
                ...this.state,
                data: response,
                isLoading: false
            })
        }).catch(e => {
            // redirect
        })
    }

    componentDidMount(){
        this.fetchData();
    }

    handleEdit(){
        this.fetchData();
    }

    handleError(msg){
        this.setState({
            ...this.state,
            error: msg
        })
    }

    redner(){
        const currentUser = this.props.currentUser;
        if(this.state.isLoading){
            return <Loader isLoading={this.state.isLoading} />;
        }
        return(
            <div className="user-container">
                <div>
                    {currentUser.url ? (<img />):(<div className="author-image"><FaUserAlt /></div>)}
                    <div>
                        <p>{currentUser.name}</p>
                        <p>{currentUser.email}</p>
                    </div>
                </div>
                <div className="user-history">
                    {this.state.data.length > 0? (this.state.data.map(element => (
                         <Visit key={element.id} visit={element} onError={this.handleError} onEdit={this.handleEdit}/>
                    ))):(<p>Not found any visit.</p>)}
                </div>
            </div>
        )
    }
}

export default User;