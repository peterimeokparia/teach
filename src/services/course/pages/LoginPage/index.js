import 
React, { 
useState, 
useEffect } from 'react';

import { 
Redirect, 
navigate } from '@reach/router';

import { 
connect } from 'react-redux';

import { 
loginUser, 
createUser, 
loadUsers,
lastLoggedInUser, 
loginPageError, 
loadUserByEmail } from 'Services/course/Actions/Users';

import { 
loadMeetingsByMeetingId,  
loadMeetings,
saveMeeting  } from 'Services/course/Actions/Meetings';

import {
autoRenewSessionPackages,  
loadSessions } from 'Services/course/Actions/Sessions';

import {
loadSubscribedPushNotificationUsers, 
subscribePushNotificationUser,
savePushNotificationUser } from 'Services/course/Actions/Notifications';

import { 
getOperatorFromOperatorBusinessName, 
getUsersByOperatorId,
getPushNotificationUsersByOperatorId } from 'Services/course/Selectors';

import { 
Validations } from 'Services/course/helpers/Validations';

import {
joinInProgressMeeting, 
getMeetings } from 'Services/course/Pages/Meeting/helpers';

import {
role,   
handlePushNotificationSubscription } from 'Services/course/helpers/PageHelpers';

import Loading from 'Services/course/Pages/Components/Loading';
import NotFoundPage from 'Services/course/Pages/Components/NotFoundPage';
import LoginForm from 'Services/course/Pages/LoginPage/Components/LoginForm';
import RegistrationForm from 'Services/course/Pages/SignUp/RegistrationForm';
import CoursePackageRenewal from 'Services/course/Pages/Packages/CoursePackageRenewal';
import SiteUser from 'Services/course/helpers/SiteUser';
import Swal from 'sweetalert2'
import './style.css';

const LoginPage = ({
  operatorBusinessName,
  operator,
  error, 
  loading, 
  loginUser,
  lastLoggedInUser,
  createUser,
  loadMeetingsByMeetingId,
  loadMeetings,
  saveMeeting, 
  loadUsers,
  loadUserByEmail,
  loadSessions,
  loadSubscribedPushNotificationUsers,
  user, 
  users,
  dispatch,
  autoRenewSessionPackages,
  loginPageError,
  sessions,
  meetings,
  pushNotificationSubscribers,
  subscribePushNotificationUser,
  savePushNotificationUser }) => {

  const [ signUpOrLoginPreference, setSignUpOrLoginInPreference ] = useState(false);

  let newSiteUser = new SiteUser(), currentUser = null;

    useEffect(() => {
      loadUsers();
      loadSessions();
      loadMeetings();
      loadSubscribedPushNotificationUsers();
    }, [loadUsers, loadSessions, loadMeetings, loadSubscribedPushNotificationUsers]);

    if ( ! operator  ) {
      return <NotFoundPage />
    }

    if ( loading ) {
      return <Loading />
    } 

    if ( error ) {
      return <div> { error.message } </div> ;
    }
  
    if ( user?.userIsValidated ) {

      loadUsers();

      if ( user?.role === role.Tutor ) {
        return <Redirect to={`/${operatorBusinessName}/users`} noThrow />
      }

      if ( user?.role === role.Student ) {
        CoursePackageRenewal( user, sessions, autoRenewSessionPackages, loadSessions, loadUsers );
        return <Redirect to={`/${operatorBusinessName}/users`} noThrow />
      }
      return <Redirect to={`/${operatorBusinessName}/login`} noThrow />
    } 

    const handleCreateUser = (error, loading, email, password, firstname, role) => {

      if (( Validations.checkFormInputString("User Name", email  ) && 
            Validations.checkFormInputString("Password", password) ) && 
            Validations.checkFormInputString("Role", role) ) {
            newSiteUser.email = email.toLowerCase();
            newSiteUser.password = password;
            newSiteUser.firstname = firstname;
            newSiteUser.role = role;
            newSiteUser.operatorId = operator?._id;
      }
      createUser( newSiteUser )
      .then( resp => {

      if ( resp ) {
          Swal.fire({title: 'Your account has been created.', icon: 'info', text: `Kindly check your email.` });
      }}).catch( error => {console.log( error ) })   
    }

    async function handleLoginUser( email, password ) {
      sessionStorage.clear();
      currentUser = await getCurrentUser( email.toLowerCase(), password );
      let currentMeeting = await getMeetings(currentUser, loadMeetingsByMeetingId);

      if ( currentUser ) {
        currentUser = { ...currentUser, operatorId: operator?._id };
        lastLoggedInUser( currentUser );
      }

      if ( ! currentUser ) {
        Validations.warn("Account does not exist. Please create a new account");
        return ( <div>Please create a new account.</div>);
      }

      if ( ! currentUser?.userIsVerified ) {
        Swal.fire({title: 'Your account has not been verified.', icon: 'info', text: `Kindly check your email.` });
        return ( <div>Please check your email.</div>);
      }

      Validations.checkFormInputString("User Name", email );

      if ( email && !password ) {
          navigate(`/${operatorBusinessName}/passwordreset/${currentUser?._id}`); 
      } 

      if ( ( email && password ) ) {
        loginUser( { ...currentUser, unHarshedPassword: password } )
          .then( response => {
          
            if ( response?.userIsValidated ) {
              handlePushNotificationSubscription(pushNotificationSubscribers, currentUser, subscribePushNotificationUser, savePushNotificationUser ); 
            }
            
        }).catch( error => { console.log( error ) });

        if ( currentUser?.lessonInProgress ) {
            Swal.fire({
              title: `Please join the following lesson in progress: ${currentUser?.nameOfLessonInProgress}`,
              icon: 'warning',
              showCancelButton: true,
              confirmButtonText: 'Join',
              confirmButtonColor: '#673ab7',
              cancelButtonText: 'Next time'
          }).then( (response) => {

            if ( response?.value ) {

                if ( currentMeeting ) {
                   joinInProgressMeeting( currentUser, currentMeeting, role, saveMeeting );    
                }

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

    if ( loggedInUser?.role === role.Tutor ) {
        navigate(`/${operatorBusinessName}/users`);                              
    } else {
        navigate(`/${operatorBusinessName}/users`); 
    }
  }

  function setSignUpOrLoginInPreferenceValue () {  
    setSignUpOrLoginInPreference( !signUpOrLoginPreference );
  }

  async function getCurrentUser( email, password  ){
    return loadUserByEmail( { email, password } )
     .then(user => {
        return user[0];
     }).catch(error => {
        return error;
    });
  }

  return (
    <div className="LoginPage"> 
    {
        signUpOrLoginPreference ? <p> Please <button className="buttonTest" onClick={setSignUpOrLoginInPreferenceValue}> log in </button> or  sign up to continue.</p>
                                : <p> Please log in or <button className="buttonTest" onClick={setSignUpOrLoginInPreferenceValue}> sign up </button> to continue.</p>
    } 
    {
        signUpOrLoginPreference  ? <RegistrationForm
                                      error={error}
                                      loading={loading}
                                      users={users}
                                      handleCreateUser={handleCreateUser}
                                    />
                                :   <LoginForm
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

  const mapDispatch = { 
    loginUser, 
    createUser, 
    loadUsers,
    loadUserByEmail,
    loadMeetingsByMeetingId,
    loadMeetings,
    saveMeeting, 
    lastLoggedInUser, 
    autoRenewSessionPackages, 
    loadSessions, 
    loginPageError, 
    loadSubscribedPushNotificationUsers,
    subscribePushNotificationUser,
    savePushNotificationUser
  }

  const mapState = ( state, ownProps )   => {
  return {
    user: state?.users?.user,
    operator: getOperatorFromOperatorBusinessName(state, ownProps),
    users: getUsersByOperatorId(state, ownProps),
    lessonStarted: state?.lessons?.lessonStarted,
    error: state?.users?.error,
    loading: state?.users?.loading,
    sessions: Object.values(state?.sessions?.sessions)?.filter(session => session?.UserId === ownProps?.currentUser?._id),
    meetings: state.meetings.meetings,
    pushNotificationSubscribers: getPushNotificationUsersByOperatorId(state, ownProps),  
  };
}

export default connect(mapState, mapDispatch )(LoginPage);