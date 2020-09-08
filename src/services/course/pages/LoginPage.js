import React, { useState, useEffect } from 'react';
import { Redirect, navigate } from '@reach/router';
import { connect } from 'react-redux';
import { loginUser, createUser, loadUsers, lastLoggedInUser, getCreatedUser } from '../actions';
import { getLastUsersState } from '../api';
import { Validations } from  '../../../helpers/validations';
import Swal from 'sweetalert2'
import Loading from './Loading';
import CreateUserExtraFormFields from './CreateUserExtraFormFields';
import './LoginPage.css';
import { json } from 'body-parser';

//Security
//SALT - password /
// Jwt Token - validation on login
// Prevent non users from navigating site
// Styling
// Daily automated tests 
// Plan for unit tests


const LoginPage = ({ 
  error, 
  loading, 
  loginUser,
  lastLoggedInUser,
  createUser, 
  loadUsers,
  getCreatedUser, 
  user, 
  users,
  lessonStarted }) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [userRole, setUserRole] = useState('');
  const [accountRole, setAccountRoleDisplay] = useState(false);


  
  const newUser = {
      firstname:firstName, 
      email: email,
      password: password,
      token: null,
      role: null,
      courses: [],
      cart: [],
      cartTotal: 0,
      paymentStatus:"",
      userId: null,
      purchaseHistoryTimeStamp: null,
      inviteeSessionUrl: "",
      lessonInProgress: false,
      nameOfLessonInProgress: "",
      loginCount: 0,
      meetingId: ""
  };


  const roles = {
       Tutor: "Tutor",
       Student: "Student" 
  }
   
  
  let currentUser = null;


  useEffect(() => {

     loadUsers();

  }, []); //user, accountRole, userRole
  
 
                                          
   if ( loading ) {

     return <Loading />
   } 


   if ( error ) {

     return <div> { error.message } </div> ;
   }  


   if ( user?.email ) {

       if ( user?.role === "Tutor") {

        return <Redirect to="/mycourses" noThrow />
       }

       if ( user?.role === "Student") {

        return <Redirect to="/users" noThrow />
       }
     
   }

   
    
   if ( accountRole ) {

    CreateUserExtraFormFields(setUserRole, setFirstName); 

     setAccountRoleDisplay(false);
   }


   if ( userRole ) {

     createUserOnRoleSelection( userRole );
   }
   
  

   const handleSubmit = (e) => {
      e.preventDefault();
   }



   const handleCreateUser = (e) => {
       e.preventDefault();

        if ( ( Validations.checkFormInputString("User Name", email ) && 
                  Validations.checkFormInputString("Password", password) ) && ! ( userRole ) ) {
  
            setAccountRoleDisplay( true );    
        }
   }


   

    function createUserOnRoleSelection( role ){
        
        if ( role ) {

            newUser.role = role;

            createUser(newUser);

         } else {

            Validations.checkFormInputString("Role", role)
       }    
   }


 
   const handleLoginUser = (e) => {
      e.preventDefault();


      currentUser =  users?.find(newuser => newuser?.email === email && newuser?.password === password);


      if ( currentUser ) {

          lastLoggedInUser( currentUser );
      }

                                    
      if ( ! currentUser ) 
      {

        Validations.warn("Account does not exist. Please create a new account");

        return ( <div>Please create a new account</div>);
      }

   

       if ( Validations.checkFormInputString("User Name", email ) && 
                 Validations.checkFormInputString("Password", password) ) {

          loginUser( currentUser );
         
          if ( currentUser?.lessonInProgress ) {

                  Swal.fire({
                    title: `Please join the following lesson in progress: ${currentUser?.nameOfLessonInProgress}`,
                    icon: 'warning',
                    // html: currentUser?.cart?.map((item, index) => '<ul><li key=' + `${index}` + '>' + `${item?.name}` + '</li></ul') + "Do you still want to log out?",
                    showCancelButton: true,
                    confirmButtonText: 'Join',
                    confirmButtonColor: '#673ab7',
                    cancelButtonText: 'Next time'
                  }).then( (response) => {
        
                    if ( response?.value ) {
                      
                        navigate(currentUser?.inviteeSessionUrl);
                    
                    } else {
                      
                        directUserNavigation( currentUser ); 
                    }
      
                })       
            }
                directUserNavigation( currentUser );           
       }
  }



  function directUserNavigation ( loggedInUser ) {

      if ( loggedInUser?.role === "Tutor" ) {
                                          
          navigate('/mycourses'); 

      } else {

          navigate(`/users`); 

      }
  }


  
  return   (    
            <div className="LoginPage"> 

              <p> Please log in or sign up to continue.</p>

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

                  <div>
                                  
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

               {/* {Validations.setErrorMessageContainer()} */}
                       
            </div> 
    );

}





const mapState = (state)   => {

  
  return {
         user: state?.users?.user,
         users: Object.values(state?.users?.users),
         lessonStarted: state?.lessons?.lessonStarted,
         error: state?.users?.error,
         loading: state?.users?.loading,
        
  };
}

export default connect(mapState, { loginUser, createUser, loadUsers, lastLoggedInUser, getCreatedUser  })(LoginPage);