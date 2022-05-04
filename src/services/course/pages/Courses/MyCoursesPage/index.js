import { 
connect } from 'react-redux';

import { 
Link, 
Redirect,
navigate } from '@reach/router';

import { 
navContent } from  'services/course/pages/components/NavigationHelper';

import { 
getMyCourseList,
getOperatorFromOperatorBusinessName, 
getUsersByOperatorId,
getCoursesByOperatorId } from 'services/course/selectors';

import CourseListComponent from 'services/course/pages/Courses/components/CourseListComponent';
import LoginLogout from 'services/course/pages/LoginPage/components/LoginLogout';
import MainMenu from 'services/course/pages/components/MainMenu';
import Cart from 'services/course/pages/SalesPage/Cart';
import './style.css';

const MyCoursesPage = ({
    operatorBusinessName,
    operator,
    user,
    myCourseList }) => {
    if ( ! user?.userIsValidated ){
        navigate(`/${operatorBusinessName}/login`);
    }

    if ( ! user || user?.email === undefined ){
        return <Redirect to={`/${operatorBusinessName}/login`} noThrow />;
    }

return (    
    <div className="MyCourses">
        <header> 
            <MainMenu navContent={navContent( user, operatorBusinessName )?.users} />
            <h2> You are viewing your list of courses. </h2>
            <div>  
            <LoginLogout
                operatorBusinessName={operatorBusinessName}
                user={user}
            />    
            <Cart />
            </div>
        </header>     
        {( user?.courses?.length === 0 ) &&
         (<div> 
            <div>
                <h3>You are not subscribed to any  <span><Link to={`/${operatorBusinessName}/courses`}> courses. </Link></span></h3>
            </div>
            </div>
        )}
        {  <CourseListComponent 
                operatorBusinessName={operatorBusinessName}
                user={user}
                courses={myCourseList}
            />
        }
        
    </div>
); };

const mapState = ( state, ownProps )  => ({
    operator: getOperatorFromOperatorBusinessName(state, ownProps),
    users: getUsersByOperatorId(state, ownProps),
    courses: getCoursesByOperatorId(state, ownProps),
    myCourseList: getMyCourseList(state, ownProps),
    user: state?.users?.user,
    yourCourses: getCoursesByOperatorId(state, ownProps)?.filter(course => state?.users.user?.courses?.includes(course?._id)),
    coursesLoading: state?.courses?.coursesLoading,
    onCoursesError: state?.courses?.onCoursesError,
});

export default connect( mapState, null )(MyCoursesPage);