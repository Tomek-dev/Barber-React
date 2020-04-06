import React, { Component } from 'react';
import ScrollMenu from 'react-horizontal-scrolling-menu';

const Item = (name) => {
    return(
        <div className="worker-menu-item">
            <img />
            {name}
        </div>
    )
}

export const WorkerMenu = (list) =>{
    list.map(element => {
        const name = element.name;
        return <Item name={name} key={name}/>
    });
}

class WorkerMenu extends Component{
    constructor(props){
        super(props);
        this.menuItem = WorkerMenu(this.props.workers, this.state.props[0].name);
    }

    render(){
        const menu = this.state.menuItem;
        return(
            <div className="worker-menu-scroll">
                <ScrollMenu
                    data={menu}
                />
            </div>
        )
    }
}

export default WorkerMenu;