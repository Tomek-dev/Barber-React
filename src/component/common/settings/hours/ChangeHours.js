import React, { Component } from 'react';
import { show } from './SetHours';
import HoursEdit from './HoursEdit';
import HoursItem from './HoursItem';
 
class ChangeHours extends Component{
    constructor(props){
        super(props);
        this.state = {
            data: []
        }
    }

    componentDidMount(){
        this.setState({
            data: this.props.hours
        });
    }

    render(){
        let elements = this.state.data.map(value => (
            <HoursItem name={value.day} key={value.id} hours={show(value)}><HoursEdit hours={value} onEdit={this.props.onEdit}/></HoursItem> 
        ))
        return(
            <div className="hours-change">
                {elements}
            </div>
        )
    }
}

export default ChangeHours;