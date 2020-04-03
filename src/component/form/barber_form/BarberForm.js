import React, { Component } from 'react';

class BarberForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            form: {
                name: '',
                city: '',
                address: '',
                local: '',
                about: '',
                open: [],
                services: [],
                workers: [],
                images: []
            },
            error: {
                msg: '',
                status: ''
            }
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange = (event) => {
        this.state({
            ...this.state,
            [event.target.name]: event.target.value
        });
    }

    validate = (form) => {

    }

    handleSubmit = (event) => {

    }

    render(){
        return(
            <div className="barber-form-container">
                <form className="barber-form" onSubmit={this.handleSubmit}>

                </form>
            </div>
        )
    }
}

export default BarberForm;