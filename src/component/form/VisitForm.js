import React, { Component } from 'react';
import ReactModal from 'react-modal';
import { get } from '../../util/ApiUtils';
import { Visit } from '../common/Visit'

class VisitForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            visit: '',
            data: [],
            error: ''
        }
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount(){
        get('/oauth/visit/').then(respone => { //id
            this.setState({
                ...this.state,
                data: response
            }); 
        }).catch(e => [
            this.setState({
                ...this.state,
                error: e.message || 'Sorry! Something went wrong. Please try again!'
            })
        ]);
    }

    handleChange = ({key}) => {
        this.setState({
            ...this.state,
            form: {
                visit: key
            }
        });
    }

    render(){
        return(
            <div className="visit-form-container">
                <ReactModal
                ariaHideApp={false}
                className="hours-modal"
                overlayClassName="hours-modal-overlay"
                onRequestClose={this.handleSearchPanel}
                shouldCloseOnOverlayClick={true}
                isOpen={this.state.display}>
                    {this.state.data.map(element => {
                        return <Visit review={element} onClick={this.handleChange}/>
                    })}
                    <button onClick={this.props.onClick(form)}>Choose</button>
                </ReactModal>
            </div>
        )
    }
}

export default VisitForm;