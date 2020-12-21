import React from 'react';
import { connect } from 'react-redux';
import './DropDownSelectorComponent.css';


//https://reactjs.org/docs/forms.html

class DropDownSelectorComponent extends React.Component {
  constructor( props ) {
    super( props );
    this.state = { value: 0}

    this.handleSubmit = this.handleSubmit.bind( this );
    this.handleChange = this.handleChange.bind( this );
  }


  handleSubmit(event){
    event.preventDefault();
  }


  handleChange(event){
    this.setState({ value: event.target.value });
    this.props.setOptionSelectedValue( event.target.value );
  }



  render() {
    return(
          <span className="dropDownSelector">
              <span>
                <form onSubmit={this.handleSubmit}>
                  {/* Number of sessions: */}
                  <label>
                     {this.props.label } 
                  </label>  
                  <label> 
                      <select value={this.state.value} onChange={this.handleChange.bind( this )} >
                        {
                          this.props.optionCollection?.map(( optionValue, index ) => (
                            // <option key={optionValue['_id']} value={JSON.stringify(optionValue)}> {optionValue[this.props?.value]} </option>
                            <option key={optionValue['_id']} value={optionValue['_id']}> {optionValue[this.props?.value]} </option>
                          ))
                        }
                      </select>
                    </label>
                </form>
              </span>
          </span>
    )
  }
}




export default connect(null, {} )(DropDownSelectorComponent)