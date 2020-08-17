import React, { useState, useEffect } from 'react';
import { Redirect } from '@reach/router';
import { connect } from 'react-redux';
import { loginUser, createUser, loadUsers } from '../actions';
import { getLastUsersState } from '../api';
import { Validations } from  '../../../helpers/validations';
import Loading from './Loading';
import './LoginPage.css';


const LoginPage = ({ error, loading, loginUser, createUser, loadUsers, user, users }) => {

  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [userRole, setUserRole] = useState('');
  const [currentAccount, setAccountIfAccounExists] = useState(false)

  
  const newUser = {
      username: userName,
      password: password,
      token: null,
      role: null,
      courses: [],
      cart: [],
      cartTotal: 0,
      paymentStatus:"",
      userId: null,
      purchaseHistoryTimeStamp: null
  };

  const usersRole = {
       Tutor: "Tutor",
       Student: "Student" 
  }
   


  useEffect(() => {
     loadUsers();

  }, [])


  const currentUser =  () => {
    return (user?.username === userName && user?.password === password);
  }  


  const currentUserFromUsers = () => {
    return (users?.find(newuser => newuser?.username === userName && newuser?.password === password));
  }


  if ( currentUser() ){  
     
    return <Redirect to="/" noThrow />
  }

  
   if ( loading ) {

     return <Loading />
   } 


   if ( error ) {

     return <div> { error.message } </div> ;
   }  

  

   const handleSubmit = (e) => {
      e.preventDefault();
   }


   const handleCreateUser = (e) => {
       e.preventDefault();

       if ( Validations.checkFormInputString("User Name", userName ) && 
                Validations.checkFormInputString("Password", password)) {

                  setAccountIfAccounExists( true );    
       }  
   }


   const handleLoginOnRoleSelection = ( role ) => {
        
        setUserRole(role);
        
        if ( role ) {

            newUser.role = role;

            createUser(newUser);

         } else {

            Validations.checkFormInputString("Role", role)
        
       }
        
   }

   
   const handleLoginUser = (e) => {
      e.preventDefault();

      if ( !(currentUser()) && 
            !(currentUserFromUsers()) && 
              ! getLastUsersState())
      {

        Validations.warn("Account does not exist. Please create a new account");

        return ( <div>Please create a new account</div>);

      }

   

      if ( currentUserFromUsers() || getLastUsersState() ) {
 
        let currentUser = getLastUsersState() ? getLastUsersState() : currentUserFromUsers();

        newUser.courses = currentUser?.courses;
        newUser.userId = currentUser?.id;
        newUser.userRole = currentUser?.role;

       }

       if ( Validations.checkFormInputString("User Name", userName ) && 
                 Validations.checkFormInputString("Password", password) ) {

          loginUser(newUser);

       }
      
  }

  
  return   (    
            <div className="LoginPage"> 

              <p> Please log in or sign up to continue.</p>

              <form onSubmit={ e => handleSubmit(e)}>

                  <label>  

                    UserName

                    <input
                        name="username"
                        value={userName}
                        onChange={ e => setUserName( e.target.value ) }
                        placeholder="username"
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

                  <div>
                    { currentAccount && 
                        <span> 

                           <label>
        
                                  Tutor   
        
                                  <input
                                      type="radio"
                                      value={usersRole.Tutor}
                                      onChange={ e => handleLoginOnRoleSelection( e.target.value ) }
                                      checked={userRole === usersRole.Tutor}
                                  >
                                  </input>
                              </label>
        
        
                              <label> 
        
                                    Student   
        
                                    <input
                                        type="radio"
                                        value={usersRole.Student}
                                        onChange={ e => handleLoginOnRoleSelection( e.target.value ) }
                                        checked={userRole === usersRole.Student}
                                    >
                                    </input>
                                   </label>
                                </span>
                    }
                  
                  </div>

                    { error  && (<div className="error"> { error.message }</div>)}
                     <div></div>
                     <button
                             type="submit"
                             disabled={loading}
                             onClick={e => handleLoginUser(e)}
                         >
   
                             Sign In
   
                         </button>
                      
                        <button
                             type="submit"
                             disabled={loading}
                             onClick={e => handleCreateUser(e)}
                         >
   
                            Create User
   
                         </button>
               </form> 

               {Validations.setErrorMessageContainer()}
                       
            </div> 
    );

}





const mapState = (state)   => {

  
  return {
         user: state.users.user,
         usersFromLogin: state.users.login,
         users: state.users.users,
         error: state.users.error,
         loading: state.users.loading,
        
  };
}



export default connect(mapState, { loginUser, createUser, loadUsers  })(LoginPage);