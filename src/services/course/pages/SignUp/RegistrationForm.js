import React, { 
useState } from 'react';

import { 
Validations } from  '../../../../helpers/validations';

import { 
toast } from 'react-toastify';

import './LoginPage.css';



const RegistrationForm = ({ 
error, 
loading,
handleCreateUser, 
users }) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [userRole, setUserRole] = useState('');
  const [ displayOtherFormFields, setToDisplayOtherFormFields ] = useState(false);


  const roles = {
       Tutor: "Tutor",
       Student: "Student" 
  }
   
  
  let currentUser = null;


   const handleSubmit = (e) => {
      e.preventDefault();
   }


   const getOtherFormFields = () => {

      if ( email ) {

          if ( users?.find(user => user?.email === email ) === undefined ) {

               setToDisplayOtherFormFields( true );
  
             
          } else {

              toast.error("Account already exists in our system.");
              return;


          }
     
      }
     
   }

  
  return   (    
            <div className="LoginPage"> 

              <form onSubmit={ e => handleSubmit(e)}>
             {
                  <>
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

                          {

                              ( displayOtherFormFields ) ? ""

                                                         : <button
                                                              type="submit"
                                                              disabled={loading}
                                                              onClick={getOtherFormFields}
                                                          >
                                                                Next

                                                          </button>     


                          }
                                            
                                             
              </>


             }
                 
              {
                ( displayOtherFormFields ) &&  <>
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

    
                  <span className="LoginPageRadioButton">

                  <span className="left">

                      <label> 
                        
                        Student

                      <input
                            name="firstName"
                            type="radio"
                            value={roles.Student}
                            onChange={ e => setUserRole( e.target.value ) }
                            placeholder="first name"
                        >
                        </input>
                      </label>
                    
                  </span>  

                  
                 <span className="right">

                 <label>

                    Tutor

                    <input
                        name="firstName"
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
  
                        <div></div>
                        
                          <button
                                type="submit"
                                disabled={loading}
                                onClick={e => handleCreateUser(error, loading, email, password, firstName, userRole)}
                            >
      
                              Create User
      
                            </button>

                  </>
              }

                  
               </form> 

              {Validations.setErrorMessageContainer()} 
                       
            </div> 
    );

}



export default RegistrationForm;