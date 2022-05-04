import React from 'react';

import { 
connect } from 'react-redux';

import { 
navigate,
Redirect } from '@reach/router';

import { 
loginUser, 
createUser, 
loadUsers,
lastLoggedInUser, 
loginPageError, 
loadUserByEmail } from 'services/course/actions/users';

import { 
loadMeetingsByMeetingId,  
loadMeetings,
saveMeeting  } from 'services/course/actions/meetings';

import {
autoRenewSessionPackages,  
loadSessions } from 'services/course/actions/sessions';

import {
loadSubscribedPushNotificationUsers, 
subscribePushNotificationUser,
savePushNotificationUser } from 'services/course/actions/notifications';

import {
setOperator,
setOperatorBusinessName } from 'services/course/actions/operator';

import {
encryptData,
decryptData } from 'services/course/actions/config';

import { 
getOperatorFromOperatorBusinessName, 
getUsersByOperatorId,
getCoursesByOperatorId,
getPushNotificationUsersByOperatorId } from 'services/course/selectors';

import {
handlePushNotificationSubscription } from 'services/course/helpers/PageHelpers';

import {
setUpNewUser,
directUserNavigation,
validateUseCredentialsOnlogin,
handleUserMeetingsOnLogin,
logUserSignInTime } from 'services/course/pages/LoginPage/helpers';

import {
addNewLoginSession } from 'services/course/actions/logins';
  
import useLoginPageHook from 'services/course/pages/LoginPage/hooks/useLoginPageHook';
import LoginForm from 'services/course/pages/LoginPage/components/LoginForm';
import RegistrationForm from 'services/course/pages/SignUp/RegistrationForm';
import CoursePackageRenewal from 'services/course/pages/Packages/CoursePackageRenewal';
import SiteUser from 'services/course/helpers/SiteUser';
import Swal from 'sweetalert2';
import './style.css';

const LoginPage = ({
  operatorBusinessName,
  operator,
  operators,
  encryptData,
  decryptData,
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
  lessons,
  courses,
  lessonsLoading,
  meetings,
  pushNotificationSubscribers,
  subscribePushNotificationUser,
  savePushNotificationUser,
  addNewLoginSession }) => {
  let loginPageProps = {
    operatorBusinessName,
    operator,
    loading,
    error,
    user,
    sessions,
    lessonsLoading,
    lessons,
    courses,
    autoRenewSessionPackages, 
    loadSessions, 
    loadUsers
  };

  let { 
    signUpOrLoginPreference, 
    setSignUpOrLoginInPreference
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
        let operator = operators?.find( operator => operator?._id === currentUser?.operatorId );

        if ( operator?.businessName !== operatorBusinessName ){
          Swal.fire({title: `Redirecting to ${operator?.businessName}.`, icon: 'info', text: `Please wait...` });
            navigate(`/${operator?.businessName}/login`);
            return;
        }

        if ( currentUser?.userIsVerified ) {
          loginUser( { ...currentUser, unHarshedPassword: password } )
            .then( response => {
              if ( response?.userIsValidated ) {
                logUserSignInTime( addNewLoginSession, currentUser );
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
        throw Error(`There was a problem with your sign on attempt. Please contact support. ${ error }`);
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


function setUserSignUpOrLoginInPreferenceValue () {  
  setSignUpOrLoginInPreference( !signUpOrLoginPreference ); 
}

return ( <div className="LoginPage"> 
{
  signUpOrLoginPreference ? <p> Please <button  data-cy={`signin`} className="signUp" onClick={setUserSignUpOrLoginInPreferenceValue}> log in </button> or  sign up to continue.</p>
                          : <p> Please log in or <button  data-cy={`signup`} className="signUp" onClick={setUserSignUpOrLoginInPreferenceValue}> sign up </button> to continue.</p>
} 
{
  signUpOrLoginPreference ? <RegistrationForm
                                error={error}
                                loading={loading}
                                users={users}
                                handleCreateUser={handleCreateUser}
                            />
                          : <LoginForm
                                error={error}
                                loading={loading}
                                handleLoginUser={handleLoginUser}
                            />
}
{
  ( error ) &&  <div> { error.message } {error} </div>
}
</div>);
};

const mapDispatch = { 
  setOperator,
  setOperatorBusinessName,
  encryptData,
  decryptData,
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
  savePushNotificationUser,
  addNewLoginSession
};

const mapState = ( state, ownProps )   => {
  return {
    user: state?.users?.user,
    operators: Object.values( state.operators?.operators ),
    operator: getOperatorFromOperatorBusinessName(state, ownProps),
    users: getUsersByOperatorId(state, ownProps),
    courses: getCoursesByOperatorId(state, ownProps),
    lessonsLoading: state.lessons.lessonsLoading,
    lessons: Object.values(state.lessons.lessons),
    lessonStarted: state?.lessons?.lessonStarted,
    error: state?.users?.error,
    loading: state?.users?.loading,
    sessions: Object.values(state?.sessions?.sessions)?.filter(session => session?.UserId === ownProps?.currentUser?._id),
    meetings: state.meetings.meetings,
    pushNotificationSubscribers: getPushNotificationUsersByOperatorId(state, ownProps),  
  };
};

export default connect(mapState, mapDispatch )(LoginPage);