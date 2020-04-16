import React, { Component } from 'react';
import './Reservation.css';
import { get, post } from './../../../util/ApiUtils';
import { FaTimes, FaUserAlt } from 'react-icons/fa';
import ReactModal from 'react-modal';
import MiniLoader from '../loader/MiniLoader'

export function formatDate(date) {
    var format = new Date(date),
        month = '' + (format.getMonth() + 1),
        day = '' + format.getDate(),
        year = format.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}

class Reservation extends Component{
    constructor(props){
        super(props);
        this.state ={
            display: false,
            date: new Date(),
            form: {
                date: '',
                name: '',
                service: this.props.service,
                worker: ''
            },
            list: [],
            available: [],
            isLoading: true,
            error: ''
        }
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleOpen() {
        this.setState({ 
            ...this.state, 
            display: true
        });
    }

    fetchData = async() => {
        this.setState({
            ...this.state,
            isLoading: true
        })
        await get('/visit?id=' + this.props.id + '&date=' + formatDate(this.state.date)).then(response => {
            this.setState({
                ...this.state,
                available: response,
            })
        }).catch(e => {
            // redirect
        })
        await get('/worker/value?service=' + this.props.service).then(response => {
            this.setState({
                ...this.state,
                list: response
            });
        }).catch(e => {
            // redirect
        })
        await this.setState({
            ...this.state,
            isLoading: false
        })
    }

    handleClose() {
        this.setState({ 
            ...this.state, 
            display: false
        });
    }

    componentDidMount(){
        this.fetchData();
    }

    handleChange(event){
        this.setState({
            ...this.state,
            form: {
                ...this.state.form,
                [event.target.name]: event.target.value
            }
        })
    }

    validate = (form) => {
        if(!form.date){
            return 'Select date!';
        }else if(!form.name){
            return 'Name may not be empty';
        }else if(!form.worker){
            return 'Select worker!';
        }
        return null;
    }
 
    handleSubmit(event){
        event.preventDefault();
        const form = this.state.form;
        const errorMsg = this.validate(form);
        if(errorMsg){
            this.setState({
                ...this.state,
                error: errorMsg
            })
            return;
        }
        console.log(form)
        form.date = this.state.date + 'T' + form.date + ':00.0';
        console.log(form)
        post(form, '/oauth/visit/add').then(() => {
            this.setState({
                ...this.state,
                display: false,
                form: {
                    date: '',
                    name: '',
                    service: this.props.service,
                    worker: ''
                },
                error: ''
            })
            this.fetchData();
        }).catch(e => {
            this.setState({
                ...this.state,
                error: e.message
            })
        })
    }

    render(){
        let element;
        if(this.state.isLoading){
            element = <div className="reservation-loading">
                <MiniLoader isLoading={this.state.isLoading} />
            </div>
        }else{
            const available = this.state.available;
            const list = this.state.list;
            element = <div className="hours-modal-container">
                        <div>
                            <button className="close-btn" onClick={this.handleClose}><FaTimes /></button>
                        </div>
                        <div className="error">
                            {this.state.error}
                        </div>
                        <div className="date-list">
                            {available.length > 0 ? available.map(element => (
                                <button name="date" className={`btn date-btn ${this.state.form.date === element.time? `selected`:``}`} type="button" value={element.time} onClick={this.handleChange}>
                                    {element.time}
                                </button>
                            )): <p>Not found any available time</p> }
                        </div>
                        <div className="list-list">
                            {list.length > 0 ? list.map(element => (
                                <button name="worker" className="btn list-btn" type="button" value={element.id} onClick={this.handleChange}>
                                    {!element.url ? (<div className="worker-resercation-image"><FaUserAlt /></div>):(<img />)}
                                    <p>{element.name}</p>
                                </button>
                            )): <p>Not found any worker</p> } 
                        </div>
                        <form className="reservation-form" onSubmit={this.handleSubmit}>
                            <input 
                            placeholder="Your Name"
                            type="text"
                            name="name"
                            className="element"
                            onChange={this.handleChange}
                            value={this.state.form.name}/>
                            <button className="submit" type="submit">Visit</button>
                        </form>
                    </div>
        }
        return(
            <div>
                <button onClick={this.handleOpen} className="submit reservation-submit">Visit</button>
                <ReactModal 
                ariaHideApp={false}
                className="modal"
                overlayClassName="hours-modal-overlay"
                onRequestClose={this.handleSearchPanel}
                shouldCloseOnOverlayClick={false}
                isOpen={this.state.display}>
                    {element}
                </ReactModal>
            </div>
        )
    }
}

export default Reservation;