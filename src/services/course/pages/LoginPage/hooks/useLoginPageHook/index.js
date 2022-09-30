import { useEffect,useState } from 'react';
import { useDispatch } from 'react-redux';
import { Redirect } from '@reach/router';
import { setOperator, setOperatorBusinessName } from 'services/course/actions/operator';
import { loadLessons } from 'services/course/actions/lessons';
import { role } from 'services/course/helpers/PageHelpers';
import { setItemInSessionStorage } from 'services/course/helpers/ServerHelper';
import { coursePackageRenewal } from 'services/course/pages/Packages/helpers';
import Loading from 'services/course/pages/components/Loading';
import NotFoundPage from 'services/course/pages/components/NotFoundPage';

function useLoginPageHook( loginPageProps ){
    let {
        operatorBusinessName,
        operator,
        loading,
        error,
        user,
        sessions,
        lessons,
        courses,
        autoRenewSessionPackages, 
        loadSessions, 
        loadUsers
    } = loginPageProps;

    const dispatch = useDispatch();

    const [ signUpOrLoginPreference, setSignUpOrLoginInPreference ] = useState(false);

    useEffect(() => {}, [ signUpOrLoginPreference ]);

    let usersExist = user?.length > 0;

    useEffect(() => {
        if ( usersExist && user[0]?.lessonInProgress  ) {
            if ( user[0]?.course  ) {
                dispatch( loadLessons( user[0]?.course ) );
            }

            let course = courses?.find(course => course?._id === user[0]?.course );
            let lesson = lessons?.find(lesson => lesson?._id === user[0]?.lesson );
    
            if ( course?._id && lesson?._id ) {
                setItemInSessionStorage('selectedLesson', lesson );
                setItemInSessionStorage('selectedCourse', course );
            }
        }
    }, [ usersExist, dispatch, lessons, courses, user  ]);

    if ( ! operator || ! operatorBusinessName  ) {
        return <NotFoundPage />;
    }

    if ( loading ) {
        if ( operator ) {
            setOperator( operator );
        }
  
        if ( operatorBusinessName ) {
            setOperatorBusinessName( operatorBusinessName );
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
            coursePackageRenewal( user, sessions, autoRenewSessionPackages, loadSessions, loadUsers );
            return <Redirect to={`/${operatorBusinessName}/users`} noThrow />;
        }
        return <Redirect to={`/${operatorBusinessName}/login`} noThrow />;
    }
    
    function loginSignUpProcess(){
        setSignUpOrLoginInPreference( !signUpOrLoginPreference );
    }
    
return {
    signUpOrLoginPreference, 
    setSignUpOrLoginInPreference
}; };

export default useLoginPageHook;