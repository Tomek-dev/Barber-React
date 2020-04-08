import React, { Component } from 'react';
import { hours } from '../../../constans/HoursConst';
import ScrollMenu from 'react-horizontal-scrolling-menu';
import './Hours.css'

const HeaderItem = ({text, selected}) => {
    return <div className={`hours-item ${selected ? 'active': ''}`}>
        {text}
    </div>
}

export const HeaderMenu = (list, selected) => 
    list.map(element => {
        return <HeaderItem text={element} key={element} name={element} selected={selected}/>
    })

class Hours extends Component{
    constructor(props){
        super(props)
        this.state ={
            selected: this.props.selected,
            menu: HeaderMenu(hours(), this.props.selected)
        }
    }

    handleSelect = (key) => {
        this.setState({
            selected: key
        });
        this.props.onSelect(key, this.props.name)
    }

    render(){
        const items = this.state.menu;
        return(
            <div className="hours-horizontal-menu">
                <ScrollMenu
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
export default Hours;