c

class StepBarber extends Component{
    constructor(props){
        super(props);
    }

    render(){
        if(this.props.step !== 1){
            return null;
        }
        return(
            <div className="form-step-barber">
                <input 
                type="text"
                name="name"
                className="barber-form-element"
                value={this.props.name}
                onChange={this.props.onChange}/>
                <input 
                type="text"
                name="city"
                className="barber-form-element"
                value={this.props.city}
                onChange={this.props.onChange}/>
                <input 
                type="text"
                name="address"
                className="barber-form-element"
                value={this.props.address}
                onChange={this.props.onChange}/>
                <input 
                type="text"
                name="local"
                className="barber-form-element"
                value={this.props.local}
                onChange={this.props.onChange}/>
                <textarea 
                name="about"
                className="barber-form-textarea"
                value={this.props.about}
                onChange={this.props.onChange}/>
            </div>
        );
    }
}

export default StepBarber;