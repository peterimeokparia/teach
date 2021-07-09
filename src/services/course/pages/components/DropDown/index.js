import { Component } from 'react';
import { connect } from 'react-redux';
import Select from '@material-ui/core/Select';
import './style.css';

class DropDown extends Component {

  constructor( props ) {
    super( props );
    this.state = { value: 0};
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
                  <label>
                    <span className="main-title">
                    {this.props.label } 
                    </span>
                 
                  </label>  
                  <label> 
                      <Select 
                        value={this.state.value} 
                        onChange={this.handleChange.bind( this )} 
                        inputProps={{ 'aria-label': 'Without label' }}
                        className={'space-between-select'}
                      >
                        {( this.props.optionCollection.length > 0 ) &&
                          this.props.optionCollection?.map(( optionValue, index ) => (
                            <option 
                              key={optionValue['_id']} 
                              value={optionValue['_id']}
                              className={'space-between-select'}
                            > 
                            { optionValue[ this.props?.value ] }  
                            </option>
                          ))
                        }
                      </Select>
                    </label>
                </form>
              </span>
          </span>
    );
  }
  
};

export default connect(null, {} )(DropDown);