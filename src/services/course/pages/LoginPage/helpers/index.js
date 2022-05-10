import { 
navigate } from '@reach/router';

import { 
Validations } from 'services/course/helpers/Validations';

import {
role } from 'services/course/helpers/PageHelpers';

import {
joinInProgressMeeting, 
getMeetings } from 'services/course/pages/Meeting/helpers';

import {
updateUser } from 'services/course/api';

import Swal from 'sweetalert2';

export function setUpNewUser( newSiteUserProps ){
    let { 
        email, 
        password, 
        firstName, 
        role, 
        operator, 
        siteUser 
    } = newSiteUserProps;

    siteUser.email = email.toLowerCase();
    siteUser.password = password;
    siteUser.firstname = firstName; 
    siteUser.role = role;
    siteUser.operatorId = operator?._id;
    return siteUser;
};

export function directUserNavigation ( loggedInUser, operatorBusinessName ) {
    if ( loggedInUser?.role === role.Tutor ) {
        navigate(`/${operatorBusinessName}/mycourses`);                              
    } else {
        navigate(`/${operatorBusinessName}/mycourses`); 
    }
};

export function handleUserMeetingsOnLogin( currentUser, operatorBusinessName, loadMeetingsByMeetingId, saveMeeting, lastLoggedInUser ) {
    if ( currentUser?.lessonInProgress ) {
        getMeetings(currentUser, loadMeetingsByMeetingId)
        .then( currentMeeting => { 
            if ( currentMeeting ) { 
                Swal.fire({
                  title: `Please join the following lesson in progress: ${currentUser?.nameOfLessonInProgress}`,
                  icon: 'warning',
                  showCancelButton: true,
                  confirmButtonText: 'Join',
                  confirmButtonColor: '#673ab7',
                  cancelButtonText: 'Next time'
              }).then( (response) => {
                  if ( response?.value ) {
                      joinInProgressMeeting( currentUser, currentMeeting, saveMeeting, undefined );
                      navigate( `${currentUser?.inviteeSessionUrl}/${currentMeeting?._id}` );
                  } else { 
                      directUserNavigation( currentUser, operatorBusinessName ); 
                  }
              });  
          } else {
              Swal.fire({title: 'Your meeting can not be found.', icon: 'info', text: `Kindly contact your teacher or the administrator.` });
              let inviteeSessionUrl = "", nameOfLessonInProgress = "", lessonInProgress = false, meetingId = undefined;
      
              currentUser = { ...currentUser, timeMeetingEnded: Date.now() , inviteeSessionUrl, nameOfLessonInProgress, lessonInProgress, meetingId } ;
              updateUser( currentUser );
              lastLoggedInUser( currentUser );
          } 
        })
        .catch(error => {
        throw Error(`There was a problem getting your meeting. Please contact support. ${ error }`);
        });  
    }
};

export function validateUseCredentialsOnlogin( currentUser, operatorBusinessName, email, password  ){
    try {
        sessionStorage.clear();
        Validations.checkFormInputString("User Name", email );
        if ( ! currentUser ) {
          Validations.warn("Account does not exist. Please create a new account");
          return ( <div>Please create a new account.</div>);
        }
        if ( ! currentUser?.userIsVerified ) {
          Swal.fire({title: 'Your account has not been verified.', icon: 'info', text: `Kindly check your email.` });
          return ( <div>Please check your email.</div>);
        }
        if ( email && !password ) {
          navigate(`/${operatorBusinessName}/passwordreset/${currentUser?._id}`); 
        }
    } catch (error) {
        throw Error(`There was a problem with your login attempt ${ error }`);
    }   
};

export const logUserSignInTime = ( loginAction, user ) => {
    let loginConfig = { 
        userId: user?._id,
        logInTime: Date.now()
      };
      
      loginAction( loginConfig );
};
