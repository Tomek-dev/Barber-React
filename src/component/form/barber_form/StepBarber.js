c

class SetpBarber extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div className="form-step-barber">
                <input 
                type="text"
                name="name"
                className="barber-form-element"
                value={this.props.name}
                onChange={this.props.handleChange}/>
                <input 
                type="text"
                name="city"
                className="barber-form-element"
                value={this.props.city}
                onChange={this.props.handleChange}/>
                <input 
                type="text"
                name="address"
                className="barber-form-element"
                value={this.props.address}
                onChange={this.props.handleChange}/>
                <input 
                type="text"
                name="local"
                className="barber-form-element"
                value={this.props.local}
                onChange={this.props.handleChange}/>
                <textarea 
                name="about"
                className="barber-form-textarea"
                value={this.props.about}
                onChange={this.props.handleChange}/>
            </div>
        );
    }
}

export default SetpBarber;