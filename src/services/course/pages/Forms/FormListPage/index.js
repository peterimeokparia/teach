import { connect } from 'react-redux';
import { toggleCourseModal } from 'services/course/actions/courses';
import { navContent } from  'services/course/pages/components/NavigationHelper';
import { getCoursesByOperatorId, getPublishedForms  } from 'services/course/selectors';
import { helpIconStyle } from './inlineStyles';
import { useUserVerificationHook } from 'services/course/helpers/Hooks/useUserVerificationHook';
import { useOnLoadingHook } from 'services/course/helpers/Hooks/useOnLoadingHook';
import { role } from 'services/course/helpers/PageHelpers';
import Roles from 'services/course/pages/components/Roles';
import LoginLogout from 'services/course/pages/LoginPage/components/LoginLogout';
import FormsComponent from 'services/course/pages/Forms/components/FormsComponent';
import NewFormPage from 'services/course/pages/Forms/NewFormPage';
import Cart from 'services/course/pages/SalesPage/Cart';
import MainMenu from 'services/course/pages/components/MainMenu';
import PostAddIcon from '@material-ui/icons/PostAdd';
import Modal from 'react-modal';

const FormListPage = ({ 
    operatorBusinessName,
    user,
    publishedForms,
    formType,
    coursesLoading,
    onCoursesError,
    toggleCourseModal,
    isModalOpen
}) => {
    useUserVerificationHook( user, operatorBusinessName );
    useOnLoadingHook( coursesLoading , onCoursesError );

return (
    <div className="MyCourses">
    <header> 
        <MainMenu navContent={ navContent( user, operatorBusinessName ).users } />
        <h2> {`You are viewing all ${formType} forms.`} </h2>
        <div>      
        <LoginLogout
            operatorBusinessName={operatorBusinessName}
            user={user} 
        />
        <Cart />
        </div>
    </header>
    <br></br>   
        <Roles role={ user?.role === role.Tutor }>
        { 
            <PostAddIcon 
                style={helpIconStyle()}
                className="comment-round-button-1"
                onClick={toggleCourseModal}
            />
        }
        </Roles>
        <FormsComponent
            operatorBusinessName={operatorBusinessName} 
            user={user} 
            forms={publishedForms}
        />     
        <Modal isOpen={isModalOpen} onRequestClose={toggleCourseModal}> <NewFormPage user={user} operatorBusinessName={operatorBusinessName}/> </Modal>
    </div>
); };

const mapDispatch = {
    toggleCourseModal
};

const mapState = (state, ownProps) => ({
    publishedForms: getPublishedForms(state, ownProps)?.filter(form => form?.formType === ownProps?.formType ),
    courses: getCoursesByOperatorId(state, ownProps),
    user: state?.users?.user,
    coursesLoading: state?.courses?.coursesLoading,
    onCoursesError: state?.courses?.onCoursesError,
    isModalOpen: state?.courses?.isModalOpen
});

export default connect(mapState, mapDispatch)(FormListPage);