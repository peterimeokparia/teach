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
setOperator,
setOperatorBusinessName } from 'Services/course/Actions/Operator';

import { 
getOperatorFromOperatorBusinessName, 
getUsersByOperatorId,
getPushNotificationUsersByOperatorId } from 'Services/course/Selectors';

import {
handlePushNotificationSubscription } from 'Services/course/helpers/PageHelpers';

import {
setUpNewUser,
directUserNavigation,
validateUseCredentialsOnlogin,
handleUserMeetingsOnLogin } from 'Services/course/Pages/LoginPage/helpers';

import useLoginPageHook from 'Services/course/Pages/LoginPage/hooks/useLoginPageHook'
import LoginForm from 'Services/course/Pages/LoginPage/Components/LoginForm';
import RegistrationForm from 'Services/course/Pages/SignUp/RegistrationForm';
import CoursePackageRenewal from 'Services/course/Pages/Packages/CoursePackageRenewal';
import SiteUser from 'Services/course/helpers/SiteUser';
import Swal from 'sweetalert2';
import './style.css';

const LoginPage = ({
  operatorBusinessName,
  operator,
  setOperator,
  setOperatorBusinessName,
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

  let loginPageProps = {
    operatorBusinessName,
    operator,
    loading,
    error,
    user,
    sessions,
    autoRenewSessionPackages, 
    loadSessions, 
    loadUsers
  };

  let { 
    signUpOrLoginPreference, 
    setSignUpOrLoginInPreferenceValue,
  } = useLoginPageHook( loginPageProps );

const handleCreateUser = ( newSiteUser ) => {
  createUser( setUpNewUser({ ...newSiteUser, operator, siteUser: new SiteUser() }) )
  .then( resp => {
  if ( resp ) {
      Swal.fire({title: 'Your account has been created.', icon: 'info', text: `Kindly check your email.` });
  } }).catch( error => { 
    throw Error(` handleCreateUser: There was a problem with creating your account. ${error}`); 
  });   
};

function handleLoginUser( email, password ) { 
  getCurrentUser( email?.toLowerCase(), password )
    .then( currentUser => 
      {
        validateUseCredentialsOnlogin( currentUser, operatorBusinessName, email, password );
        if ( currentUser?.userIsVerified ) {
          loginUser( { ...currentUser, unHarshedPassword: password, operatorId: operator?._id } )
            .then( response => {
              if ( response?.userIsValidated ) {
                handlePushNotificationSubscription(pushNotificationSubscribers, currentUser, subscribePushNotificationUser, savePushNotificationUser ); 
                handleUserMeetingsOnLogin( currentUser, operatorBusinessName, loadMeetingsByMeetingId, saveMeeting, lastLoggedInUser );
                CoursePackageRenewal( currentUser, sessions, autoRenewSessionPackages, loadSessions, loadUsers );
                directUserNavigation( currentUser, operatorBusinessName );
              }
          }).catch( error => { 
            throw Error(` loginUser: There is a problem with your login. ${error}`); 
          });
        }
      }).catch( error => {
        throw Error(`There was a problem with your sign on attempt. Please contact support. ${ error }`)
  });
}

async function getCurrentUser( email, password ){
  return loadUserByEmail( { email, password } )
    .then(user => {
      return user[0];
    }).catch(error => {
      return error;
  });
};
  
return (
  <div className="LoginPage"> 
    {
        signUpOrLoginPreference ? <p> Please <button  data-cy={`signin`} className="buttonTest" onClick={setSignUpOrLoginInPreferenceValue}> log in </button> or  sign up to continue.</p>
                                : <p> Please log in or <button  data-cy={`signup`} className="buttonTest" onClick={setSignUpOrLoginInPreferenceValue}> sign up </button> to continue.</p>
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
      ( error ) &&  <div> { error.message } {error} </div>
    }
      </div>
    );
  };

  const mapDispatch = { 
    setOperator,
    setOperatorBusinessName,
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
  };

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
};

export default connect(mapState, mapDispatch )(LoginPage);