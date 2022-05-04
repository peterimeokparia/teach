import { 
useState } from 'react';

import { 
Validations } from  'services/course/helpers/Validations';

import { 
toast } from 'react-toastify';

import './style.css';

const RegistrationForm = ({ 
  error, 
  loading,
  handleCreateUser, 
  users }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState(''); // change firstname to firstName on reseeding db
  const [userRole, setUserRole] = useState('');
  const [ displayOtherFormFields, setToDisplayOtherFormFields ] = useState(false);

const roles = {
  Tutor: "Tutor",
  Student: "Student" 
};

const handleSubmit = (e) => {
  e.preventDefault();
};

const getOtherFormFields = () => {
    if ( email ) {
        if ( users?.find(user => user?.email === email ) === undefined ) {
            setToDisplayOtherFormFields( true );
        } else {
            toast.error("Account already exists in our system.");
          return;
        }
    } 
};

return (    
          <div className="LoginPage"> 
              <form onSubmit={ e => handleSubmit(e)}>
             {
                <>
                  <label>  
                    Email
                    <input
                        data-cy={`email`}
                        name="email"
                        type="email"
                        value={email}
                        onChange={ e => setEmail( e.target.value ) }
                        placeholder="email"
                    >
                    </input>
                  </label>
                  {( displayOtherFormFields ) 
                      ? ""
                      : <button
                          data-cy={`submit`}
                          type="submit"
                          disabled={loading}
                          onClick={getOtherFormFields}
                      >
                        Next
                      </button>     
                  }                                                                                         
                </>
             }  
              {( displayOtherFormFields ) &&  <>
                   <label>
                    Password   
                  <input
                    data-cy={`password`}
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
                      data-cy={`firstName`}
                      name="firstName"
                      type="text"
                      value={firstName}
                      onChange={ e => setFirstName( e.target.value ) }
                      placeholder="first name"
                    >
                    </input>
                  </label>
                  <span className="LoginPageRadioButton">
                  <span className="leftRadioButton">
                      <label>                         
                        Student
                        <input
                          data-cy={`radio-student`}
                          name="firstName"
                          type="radio"
                          value={roles.Student}
                          onChange={ e => setUserRole( e.target.value ) }
                          placeholder="first name"
                        >
                        </input>
                      </label>                    
                  </span>                    
                 <span className="rightRadioButton">
                 <label>
                    Tutor
                    <input
                      data-cy={`radio-Tutor`}
                      name="Tutor"
                      type="radio"
                      value={roles.Tutor}
                      onChange={ e => setUserRole( e.target.value ) }
                      placeholder="first name"
                    >
                    </input> 
                  </label>  
                 </span>                                   
                  </span>
                  <div>                                
                    </div>
                      { error  && (<div className="error"> { error.message }</div>)}
                      { error  && (<div className="error"> { error }</div>)}
                        <div></div>                       
                          <button
                              data-cy={`submit`}
                              type="submit"
                              disabled={loading}
                              onClick={e => handleCreateUser({ error, loading, email, password, firstName, role: userRole })} // change firstname to firstName on reseeding db
                            >
                              Create User
                            </button>
                            { error  && (<div className="error"> { error.message }</div>)}
                            { error  && (<div className="error"> { error }</div>)}
                  </>
              }
               </form> 
              {Validations.setErrorMessageContainer()}                  
            </div> 
    );
};

export default RegistrationForm;