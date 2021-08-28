import { 
useState, 
useEffect } from 'react';

import { 
Redirect } from '@reach/router';

import { 
useDispatch } from 'react-redux';
    
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

    if ( ! operator || ! operatorBusinessName  ) {
        return <NotFoundPage />;
    }

    if ( loading ) {
        if ( operator ) {
            setOperator( operator );
        }
  
        if ( operatorBusinessName ) {
            dispatch(setOperatorBusinessName( operatorBusinessName ));
        }   
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

return {
    signUpOrLoginPreference, 
    setSignUpOrLoginInPreference,
}; };

export default useLoginPageHook;