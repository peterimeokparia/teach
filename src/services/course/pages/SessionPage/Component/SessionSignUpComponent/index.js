import { 
Component } from 'react';

class SessionSignUpComponent extends Component {

    constructor(props){
    super(props);
    this.state = {
        autoRenew : false,
        numberOfSessions: 1
    };
    this.handleChange = this.handleChange.bind(this);
}

handleChange(event){
    if ( event.target.name === "AutoRenew" ) {
        this.props.setAutoRenewValue( event.target.checked );
        this.setState({ autoRenew: event.target.checked });
    } else {
        this.props.setNumberOfSessionsValue( event.target.value );
        this.setState({ numberOfSessions: event.target.value });
    }
}

render(){
    return (<div>
              <div>
                  <form>
                       <label>
                        Number of sessions:
                       <input
                            type="number"
                            name={"NumberOfSessions"}
                            value={this.state.numberOfSessions}
                            onChange={this.handleChange.bind(this)}
                            min="1"
                            max="10"  
                       />
                       </label>
                        <br></br>
                        <label>
                        Auto Renew:
                        <input
                            type="checkbox"
                            name={"AutoRenew"}
                            checked={this.state.autoRenew}
                            onChange={this.handleChange.bind(this)} 
                       />
                       </label>
                  </form>
              </div>
            </div>
    ); };

};

export default SessionSignUpComponent;