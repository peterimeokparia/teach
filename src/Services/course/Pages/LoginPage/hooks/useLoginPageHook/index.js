import { 
useState, 
useEffect } from 'react';

import { 
Redirect } from '@reach/router';

import { 
useDispatch } from 'react-redux';
    
import { 
loadMeetings } from 'Services/course/Actions/Meetings';

import {
loadSubscribedPushNotificationUsers } from 'Services/course/Actions/Notifications';

import {
setOperator,
setOperatorBusinessName } from 'Services/course/Actions/Operator';
    
import {
role } from 'Services/course/helpers/PageHelpers';

import Loading from 'Services/course/Pages/Components/Loading';
import NotFoundPage from 'Services/course/Pages/Components/NotFoundPage';
import CoursePackageRenewal from 'Services/course/Pages/Packages/CoursePackageRenewal';

function useLoginPageHook( loginPageProps ){
    const dispatch = useDispatch();

    let {
        operatorBusinessName,
        operator,
        loading,
        error,
        user,
        sessions,
        autoRenewSessionPackages, 
        loadSessions, 
        loadUsers
    } = loginPageProps;

    const [ signUpOrLoginPreference, setSignUpOrLoginInPreference ] = useState(false);

    useEffect(() => {
        if ( operator ) {
          setOperator( operator );
        }
        if ( operatorBusinessName ) {
            dispatch(setOperatorBusinessName( operatorBusinessName ));
        }    
    }, [ loadUsers, loadSessions, loadMeetings, loadSubscribedPushNotificationUsers ]);

    if ( ! operator || ! operatorBusinessName  ) {
        return <NotFoundPage />;
    }
    if ( loading ) {
        return <Loading />;
    } 
    if ( error ) {
        return <div> { error.message } </div> ;
    }
    if ( user?.userIsValidated ) {
        // dispatch(loadUsers());
        if ( user?.role === role.Tutor ) {
            return <Redirect to={`/${operatorBusinessName}/users`} noThrow />;
        }
        if ( user?.role === role.Student ) {
            CoursePackageRenewal( user, sessions, autoRenewSessionPackages, loadSessions, loadUsers );
            return <Redirect to={`/${operatorBusinessName}/users`} noThrow />;
        }
        return <Redirect to={`/${operatorBusinessName}/login`} noThrow />;
    } 

function setSignUpOrLoginInPreferenceValue () {  
  setSignUpOrLoginInPreference( !signUpOrLoginPreference );
}

return {
    signUpOrLoginPreference, 
    setSignUpOrLoginInPreferenceValue:() => setSignUpOrLoginInPreferenceValue()
}};

export default useLoginPageHook;