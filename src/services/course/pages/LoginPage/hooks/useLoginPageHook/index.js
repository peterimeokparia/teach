import { 
useState, 
useEffect } from 'react';

import { 
Redirect } from '@reach/router';

import { 
useDispatch } from 'react-redux';
    
import { 
loadMeetings } from 'services/course/actions/meetings';

import {
loadSubscribedPushNotificationUsers } from 'services/course/actions/notifications';

import {
setOperator,
setOperatorBusinessName } from 'services/course/actions/operator';
    
import {
role } from 'services/course/helpers/PageHelpers';

import Loading from 'services/course/pages/components/Loading';
import NotFoundPage from 'services/course/pages/components/NotFoundPage';
import CoursePackageRenewal from 'services/course/pages/Packages/CoursePackageRenewal';

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
    }, [ loadUsers, loadSessions, loadMeetings, loadSubscribedPushNotificationUsers ]);

    if ( operatorBusinessName ) {
        dispatch(setOperatorBusinessName( operatorBusinessName ));
    }    

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
    setSignUpOrLoginInPreferenceValue:setSignUpOrLoginInPreferenceValue
}; };

export default useLoginPageHook;