import { 
useState } from 'react';

import {
role } from 'services/course/helpers/PageHelpers';

import './style.css';

const OperatorRegistrationForm = ({ 
  error, 
  loading,
  handleCreateUser }) => {
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ firstName, setFirstName ] = useState('');
  const [ lastName, setLastName ] = useState('');
  const [ businessName, setBusinessName ] = useState('');
  const [ phone, setPhone ] = useState('');

const handleSubmit = (e) => {
  e.preventDefault();
};

return (    
      <div className="LoginPage"> 
        <form onSubmit={ e => handleSubmit(e)}>
            <label>  
                Email
              <input
                name="email"
                type="email"
                value={email}
                onChange={ e => setEmail( e.target.value ) }
                placeholder="email"
              >
              </input>
            </label>
              <label>
                Password   
                <input
                    name="password"
                    type="password"
                    value={password}
                    onChange={ e => setPassword( e.target.value ) }
                    placeholder="password"
                >
                </input>
              </label>
              <label>
                First Name   
              <input
                  name="firstName"
                  type="text"
                  value={firstName}
                  onChange={ e => setFirstName( e.target.value ) }
                  placeholder="first name"
              >
              </input>
              </label>
              <label>
                Last Name   
                <input
                    name="lastName"
                    type="text"
                    value={lastName}
                    onChange={ e => setLastName( e.target.value ) }
                    placeholder="last name"
                >
                </input>
                </label>
                <span className="LoginPageRadioButton">
                  <span className="left">
                      <label>                         
                        School
                        <input
                          name="firstName"
                          type="radio"
                          value={role.Student}
                         // onChange={ e => setUserRole( e.target.value ) }
                          placeholder="first name"
                        >
                        </input>
                      </label>                    
                  </span>                    
                 <span className="right">
                 <label>
                    Organization
                    <input
                      name="firstName"
                      type="radio"
                      value={role.Tutor}
                      //onChange={ e => setUserRole( e.target.value ) }
                      placeholder="first name"
                    >
                    </input> 
                  </label>  
                 </span>      
                 <span className="right">
                 <label>
                    Individual
                    <input
                      name="firstName"
                      type="radio"
                      value={role.Tutor}
                      //onChange={ e => setUserRole( e.target.value ) }
                      placeholder="first name"
                    >
                    </input> 
                  </label>  
                 </span>                                              
                  </span>
                <label>
                  Business Name   
                  <input
                      name="businessName"
                      type="text"
                      value={businessName}
                      onChange={ e => setBusinessName( e.target.value ) }
                      placeholder="business name"
                  >
                  </input>
                  </label>
                  <label>
                    Phone
                    <input
                        name="phone"
                        type="phone"
                        value={phone}
                        onChange={ e => setPhone( e.target.value ) }
                        placeholder="phone"
                    >
                    </input>
                    </label>
                    <div>                            
                    </div>
                      { error  && (<div className="error"> { error.message }</div>)}
                        <div></div>                  
                      <button
                          type="submit"
                          disabled={loading}
                          onClick={e => handleCreateUser(email, password, firstName, lastName, businessName, phone)}
                      >
                        Create Service Account
                    </button>
            </form>                     
        </div> 
    );
};

export default OperatorRegistrationForm;