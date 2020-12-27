import 
React, { 
useState, 
useEffect } from 'react';

import { 
Redirect, 
navigate, 
Link } from '@reach/router';

import { 
connect } from 'react-redux';


import { 
loginUser, 
createUser, 
loadUsers,
loadSessions, 
lastLoggedInUser, 
getCreatedUser,
autoRenewSessionPackages,
loginPageError } from '../../actions';

import { 
getOperatorFromOperatorBusinessName, 
getUsersByOperatorId } from '../../Selectors';

import { 
Validations } from  '../../../../helpers/validations';

import { 
newSiteUser } from  '../../../../helpers/pageHelpers.js';

import Swal from 'sweetalert2'
import Loading from '../Components/Loading';
import LoginForm from '../Login/LoginForm';
import RegistrationForm from '../SignUp/RegistrationForm';
import CoursePackageRenewal from '../Packages/CoursePackageRenewal';

import './LoginPage.css';



// To do
// Change from token to session storage
// Security
// SALT - password /
// Jwt Token - validation on login
// Prevent non users from navigating site
// Styling
// Linting rules
// Daily automated tests 
// Plan for unit tests


const LoginPage = ({
  operatorBusinessName,
  operator,
  error, 
  loading, 
  loginUser,
  lastLoggedInUser,
  createUser, 
  loadUsers,
  loadSessions,
  user, 
  users,
  dispatch,
  autoRenewSessionPackages,
  loginPageError,
  sessions }) => {


  const [ signUpOrLoginPreference, setSignUpOrLoginInPreference ] = useState(false);

  newSiteUser.firstname = ""; 
  newSiteUser.email = "";
  newSiteUser.password = "";
  newSiteUser.token = null;
  newSiteUser.role = null;
  newSiteUser.courses = [];
  newSiteUser.numberOfCourseSessions = [];
  newSiteUser.cart = [];
  newSiteUser.cartTotal = 0;
  newSiteUser.paymentStatus = "";
  newSiteUser.userId = null;
  newSiteUser.purchaseHistoryTimeStamp = null;
  newSiteUser.inviteeSessionUrl = "";
  newSiteUser.lessonInProgress = false;
  newSiteUser.userIsValidated = false;
  newSiteUser.nameOfLessonInProgress = "";
  newSiteUser.loginCount = 0;
  newSiteUser.meetingId = "";
  newSiteUser.meetings = [];
  newSiteUser.sessions = [];
  newSiteUser.markDown = "";
  newSiteUser.avatarUrl = "";
  newSiteUser.files = [];
  newSiteUser.classRooms = [];
  newSiteUser.operatorId = "";
  newSiteUser.timeMeetingStarted = null;
  newSiteUser.timeMeetingEnded = null;

  
  let currentUser = null;

  
  useEffect(() => {

     loadUsers();
     loadSessions();

  }, []);
  
 
                                          
   if ( loading ) {

     return <Loading />
   } 


   if ( error ) {

     return <div> { error.message } </div> ;
   }  



   if ( user?.userIsValidated ) {

       if ( user?.role === "Tutor" ) {


        return <Redirect to={`/${operatorBusinessName}/classroomgroups`} noThrow />
       }


       if ( user?.role === "Student" ) {

 
         CoursePackageRenewal( user, sessions, autoRenewSessionPackages, loadSessions, loadUsers );

        return <Redirect to={`/${operatorBusinessName}/users`} noThrow />
       }
     
   }

   
  

  const handleCreateUser = (error, loading, email, password, firstname, role) => {
 

     if ( ( Validations.checkFormInputString("User Name", email  ) && 
               Validations.checkFormInputString("Password", password) ) && 
                Validations.checkFormInputString("Role", role) ) {

                  newSiteUser.email = email;
                  newSiteUser.password = password;
                  newSiteUser.firstname = firstname;
                  newSiteUser.role = role;
                  newSiteUser.operatorId = operator?._id;
     }

     createUser( newSiteUser );

    // notification.subscribeUser     
}





   const handleLoginUser = (email, password) => {

      sessionStorage.clear();

      loadUsers();

      let currentUser =  getCurrentUser(email, password);

      if ( currentUser ) {

          currentUser = { ...currentUser, operatorId: operator?._id };

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

        //notification.checkIfNewDevice

         
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
              
                CoursePackageRenewal( currentUser, sessions, autoRenewSessionPackages, loadSessions, loadUsers );
              
                directUserNavigation( currentUser );           
       }
  }





  function directUserNavigation ( loggedInUser ) {

      if ( loggedInUser?.role === "Tutor" ) {
                                          
          navigate(`/${operatorBusinessName}/classroomgroups`); 

      } else {

          navigate(`/${operatorBusinessName}/users`); 

      }
  }

  

  function setSignUpOrLoginInPreferenceValue () {
    
     setSignUpOrLoginInPreference( !signUpOrLoginPreference );
  }


  function getCurrentUser( email, password ){

    return users?.find(user => user?.email === email && user?.password === password);
  }



  return (

 
    <div className="LoginPage"> 

   {
        signUpOrLoginPreference ? <p> Please <button className="buttonTest" onClick={setSignUpOrLoginInPreferenceValue}> log in </button> or  sign up to continue.</p>
                                : <p> Please log in or <button className="buttonTest" onClick={setSignUpOrLoginInPreferenceValue}> sign up </button> to continue.</p>
   } 
    

  {
      signUpOrLoginPreference  ?     <RegistrationForm
                                            error={error}
                                            loading={loading}
                                            users={users}
                                            handleCreateUser={handleCreateUser}
                                    />
                              :     <LoginForm
                                          error={error}
                                          loading={loading}
                                          handleLoginUser={handleLoginUser}
                                    />
  }

  {
    ( error ) && <div> { error.message } {error} </div>
  }
    </div>

  );
  

}





const mapState = ( state, ownProps )   => {

  
  return {
         user: state?.users?.user,
         operator: getOperatorFromOperatorBusinessName(state, ownProps),
         users: getUsersByOperatorId(state, ownProps),
         lessonStarted: state?.lessons?.lessonStarted,
         error: state?.users?.error,
         loading: state?.users?.loading,
         sessions: Object.values(state?.sessions?.sessions)?.filter(session => session?.UserId === ownProps?.currentUser?._id)
        
  };
}

export default connect(mapState, { loginUser, createUser, loadUsers, lastLoggedInUser, getCreatedUser, autoRenewSessionPackages, loadSessions, loginPageError  })(LoginPage);