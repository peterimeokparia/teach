import { 
connect } from 'react-redux';

import { 
Link, 
Redirect,
navigate } from '@reach/router';

import { 
openNewCourseModal, 
closeNewCourseModal } from 'services/course/actions/courses';

import { 
navContent } from  'services/course/pages/components/NavigationHelper';

import { 
getOperatorFromOperatorBusinessName, 
getUsersByOperatorId,
getCoursesByOperatorId } from 'services/course/selectors';

import { 
helpIconStyle } from 'services/course/pages/Courses/MyCoursesPage/inlineStyles';

import LoginLogout from 'services/course/pages/LoginPage/components/LoginLogout';
import CoursesComponent from 'services/course/pages/Courses/components/CoursesComponent';
import NewCoursePage from 'services/course/pages/Courses/NewCoursePage';
import MainMenu from 'services/course/pages/components/MainMenu';
import Cart from 'services/course/pages/SalesPage/Cart';
import Modal from 'react-modal';
import PostAddIcon from '@material-ui/icons/PostAdd';
import './style.css';

const MyCoursesPage = ({
    operatorBusinessName,
    operator,
    user,
    courses,
    openNewCourseModal,
    closeNewCourseModal,
    isModalOpen }) => {
    if ( ! user?.userIsValidated ){
        navigate(`/${operatorBusinessName}/login`);
    }

    if ( ! user || user?.email === undefined ){
    return <Redirect to={`/${operatorBusinessName}/login`} noThrow />;
    }

    let navigationContent = navContent( user, operatorBusinessName )?.users;
    let myCourseList = courses?.filter(course => user?.courses?.includes(course?._id));

return (    
    <div className="MyCourses">
        <header> 
            <MainMenu navContent={navigationContent} />
            <h2> You are viewing your list of courses. </h2>
            <div>  
            <LoginLogout
                operatorBusinessName={operatorBusinessName}
                user={user}
            />    
            <Cart />
            </div>
        </header>
            
    {( user?.courses?.length === 0 ) && (<div> 
        <div>
            <h3>You are not subscribed to any  <span><Link to={"/courses"}> courses. </Link></span></h3>
        </div>
        <div>   
            {(user?.role === "Tutor" ) &&   
                <PostAddIcon 
                    style={helpIconStyle()}
                    className="comment-round-button-5"
                    onClick={openNewCourseModal}
                />
            }
        </div>
            <Modal isOpen={isModalOpen} onRequestClose={closeNewCourseModal}> <NewCoursePage user={user} operatorBusinessName={operatorBusinessName}/> </Modal>
        </div>
    )}
    <br></br>   
        {( user?.role === "Tutor" ) && 
             <PostAddIcon 
                style={helpIconStyle()}
                className="comment-round-button-5"
                onClick={openNewCourseModal}
            />
        }
            <CoursesComponent
                operatorBusinessName={operatorBusinessName}
                modal={isModalOpen} 
                courses={myCourseList}
            />     
            <Modal 
                isOpen={isModalOpen} 
                onRequestClose={closeNewCourseModal}
            > 
                <NewCoursePage user={user} operatorBusinessName={operatorBusinessName}/> 
            </Modal>
    </div>
); };

const mapDispatch = {
   openNewCourseModal,
   closeNewCourseModal
};

const mapState = ( state, ownProps )  => ({
    operator: getOperatorFromOperatorBusinessName(state, ownProps),
    users: getUsersByOperatorId(state, ownProps),
    courses: getCoursesByOperatorId(state, ownProps),
    user: state?.users?.user,
    yourCourses: getCoursesByOperatorId(state, ownProps)?.filter(course => state?.users.user?.courses?.includes(course?._id)),
    coursesLoading: state?.courses?.coursesLoading,
    onCoursesError: state?.courses?.onCoursesError,
    isModalOpen: state?.courses?.isModalOpen
});

export default connect(mapState, mapDispatch)(MyCoursesPage);