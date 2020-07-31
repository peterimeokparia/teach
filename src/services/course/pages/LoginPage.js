import React, { useState, useEffect } from 'react';
import { Redirect } from '@reach/router';
import { connect } from 'react-redux';
import { loginUser, createUser, loadUsers } from '../actions';
import { getLastUsersState } from '../api';
import Loading from './Loading';
import './LoginPage.css';


const LoginPage = ({ error, loading, loginUser, createUser, loadUsers, user, users }) => {

  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [userRole, setUserRole] = useState('');

  
  const newUser = {
               username: userName,
               password: password,
               token: null,
               role: userRole,
               courses: [],
               cart: [],
               cartTotal: 0,
               paymentStatus:"",
               userId: null,
               purchaseHistoryTimeStamp: null
  };
   


  useEffect(() => {
     loadUsers();

  }, [])


  const currentUser =  () => {
    return (user?.username === userName && user?.password === user?.password);
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
       createUser(newUser);
   }



   const handleloginUser = (e) => {
      e.preventDefault();

      if ( !(currentUser()) && 
            !(currentUserFromUsers()) && 
              ! getLastUsersState())
      {

        alert("Account does not exist. Please create a new account"); // change from alert to inline div

        return (<div>Please create a new account</div>);

      }


      if(currentUserFromUsers() || getLastUsersState()){
 
        let currentUser = getLastUsersState() ? getLastUsersState() : currentUserFromUsers();

        newUser.courses = currentUser?.courses;
        newUser.userId = currentUser?.id;
        newUser.userRole = userRole ? userRole : currentUser?.role;
       }


      loginUser(newUser);
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
                  <span>
                  <label>

                          Tutor   

                          <input
                              type="radio"
                              value="Tutor"
                              onChange={ e => setUserRole( e.target.value ) }
                              checked={userRole === "Tutor"}
                          >
                          </input>
                          </label>


                          <label>

                            Student   

                            <input
                                type="radio"
                                value="Student"
                                onChange={ e => setUserRole( e.target.value ) }
                                checked={userRole === "Student"}
                            >
                            </input>
                            </label>
                         </span>
                         </div>

                    { error  && (<div className="error"> { error.message }</div>)}
                     <div></div>
                      <button
                          type="submit"
                          disabled={loading}
                          onClick={e => handleCreateUser(e)}
                      >

                       Create User

                      </button>

                      <button
                          type="submit"
                          disabled={loading}
                          onClick={e => handleloginUser(e)}
                      >

                       Sign in

                      </button>

               </form> 
                       
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