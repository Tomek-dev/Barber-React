import React, { Component } from 'react';
import { hours } from '../../../constans/HoursConst';
import ScrollMenu from 'react-horizontal-scrolling-menu';

const HeaderItem = ({text, selected}) => {
    return <div className={`hours-item ${selected ? 'active': ''}`}>
        {text}
    </div>
}

export const HeaderMenu = (list, selected) => 
    list.map(element => {
        return <HeaderItem text={element} key={element} selected={selected}/>
    })

class Hours extends Component{
    constructor(props){
        super(props)
        this.state ={
            selected: this.props.selected
        }
        this.handleSelect = this.handleSelect.bind(this);
    }

    handleSelect = (event) =>{
        this.setState({
            selected: event.target.key
        });
        this.props.onSelect(event.target.key, event.target.name)
    }

    render(){
        const items = hours();
        return(
            <div className="header-horizontal-menu">
                <ScrollMenu
                name={this.props.name}
                data={items}
                selected={selected}
                onSelect={this.handleSelect}/>
            </div>
        )
    }
}
export default Hours;