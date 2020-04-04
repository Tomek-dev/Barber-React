import React, { Component } from 'react';
import ReactModal from 'react-modal';

class HoursPanel extends Component{
    constructor(props){
        super(props);
        this.state={
            form: {
                open: '',
                close: ''
            },
            display: false
        }
        this.handleHoursPanel = this.handleHoursPanel.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleHoursPanel() {
        this.setState({ 
            ...this.state, 
            display: !this.state.display
        });
    }

    handleChange = (key, name) => {
        this.setState({
            ...this.state,
            form: {
                ...this.state.form,
                [name]: key
            }
        })
    }

    render(){
        const data = this.state.form;
        return(
            <div className="hours-panel" key={this.props.day}>
                <button onClick={this.handleHoursPanel}></button>
                <ReactModal 
                ariaHideApp={false}
                className="hours-modal"
                overlayClassName="hours-modal-overlay"
                onRequestClose={this.handleSearchPanel}
                shouldCloseOnOverlayClick={true}
                isOpen={this.state.display}>
                    <Hours name="open" onSelect={this.handleChange}/>
                    <Hours name="close" onSelect={this.handleChange}/>
                <button onClick={this.props.onChange(key, data)}></button>
                </ReactModal>
            </div>
        )
    }
}

export default HoursPanel