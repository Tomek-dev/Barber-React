import React, { Component } from 'react';
import { hours } from '../../../constans/HoursConst';
import ScrollMenu from 'react-horizontal-scrolling-menu';
import './HoursList.css';

const HourItem = ({text, selected}) => {
    return <div className={`hours-item ${selected ? 'active': ''}`}>
        {text}
    </div>
}

export const HoursMenu = (list, selected) => 
    list.map(element => {
        return <HourItem text={element} key={element} name={element} selected={selected}/>
    })

class HoursList extends Component{
    constructor(props){
        super(props)
        this.state ={
            selected: this.props.selected,
            menu: HoursMenu(hours(), this.props.selected)
        }
    }

    handleSelect = (value) => {
        this.setState({
            selected: value
        });
        this.props.onSelect(value, this.props.name)
    }

    render(){
        const items = this.state.menu;
        return(
            <div className="hours-horizontal-menu">
                <ScrollMenu
                alignCenter={false}
                name={this.props.name}
                data={items}
                transition="0.8"
                value={this.state.selected}
                selected={this.state.selected}
                onSelect={this.handleSelect}/>
            </div>
        )
    }
}
export default HoursList;