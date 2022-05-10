import { 
connect } from 'react-redux';

import { 
navContent } from  'services/course/pages/components/NavigationHelper';

import { 
getCoursesByOperatorId,
getOperatorFromOperatorBusinessName } from 'services/course/selectors';

import { 
useUserVerificationHook } from 'services/course/helpers/Hooks/useUserVerificationHook';

import { 
useOnLoadingHook } from 'services/course/helpers/Hooks/useOnLoadingHook';

import CourseListComponent from 'services/course/pages/Courses/components/CourseListComponent';
import LoginLogout from 'services/course/pages/LoginPage/components/LoginLogout';
import Cart from 'services/course/pages/SalesPage/Cart';
import MainMenu from 'services/course/pages/components/MainMenu';

const CourseListPage = ({ 
    operatorBusinessName,
    operator,
    user,
    courses,
    coursesLoading,
    onCoursesError }) => {

    useUserVerificationHook( user, operatorBusinessName );

    useOnLoadingHook( coursesLoading , onCoursesError );
    
return (
    <div className="MyCourses">
    <header> 
        <MainMenu navContent={ navContent( user, operatorBusinessName ).users } />
        <h2> You are viewing all courses. </h2>
        <div>      
        <LoginLogout
            operatorBusinessName={operatorBusinessName}
            user={user} 
        />
        <Cart />
        </div>
    </header>
        <CourseListComponent 
            operatorBusinessName={operatorBusinessName}
            user={user}
            courses={courses}
        />
    </div>
); };

const mapState = (state, ownProps) => ({
    courses: getCoursesByOperatorId(state, ownProps),
    operator: getOperatorFromOperatorBusinessName(state, ownProps),
    user: state?.users?.user,
    coursesLoading: state?.courses?.coursesLoading,
    onCoursesError: state?.courses?.onCoursesError
});

export default connect(mapState, null)(CourseListPage);