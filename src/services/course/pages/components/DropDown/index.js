import React from 'react';

import { 
Component } from 'react';

import { 
connect } from 'react-redux';

import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import './style.css';

class DropDown extends Component {

  constructor( props ) {
    super( props );
    this.state = { value: this.props.initialValue};
    this.handleSubmit = this.handleSubmit.bind( this );
    this.handleChange = this.handleChange.bind( this );
  }

  styles = {
    button: {
      // background: 'linear-gradient(45deg,  red 30%,  green 50%, orange 50%)',
      border: 0,
      color: 'green',
      padding: '0 30px',
      boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
      fontSize:'30px',
      fontFamily: 'Courier New, Courier, monospace'
    },
    buttonBlue: {
      background: 'linear-gradient(45deg, #2196f3 30%, #21cbf3 90%)',
      boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .30)',
    },
  };

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
                        {( this.props.optionCollection?.length > 0 ) &&
                          this.props.optionCollection?.map(( optionValue, index ) => (
                            <MenuItem 
                              key={optionValue['_id']} 
                              value={optionValue['_id']}
                              className={'space-between-select'}
                              style={{
                                ...this.styles.button,
                                // ...(color === 'blue' ? this.styles.buttonBlue : {}),
                              }}
                            > 
                           <p> { optionValue[ this.props?.value ] } </p> 
                            </MenuItem> 
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