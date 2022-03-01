import { 
connect } from 'react-redux';

import {
elementMeta } from 'services/course/pages/QuestionsPage/helpers';

import { 
openNewCourseModal, 
closeNewCourseModal } from 'services/course/actions/courses';

import { 
navContent } from  'services/course/pages/components/NavigationHelper';

import { 
getCoursesByOperatorId,
getOperatorFromOperatorBusinessName,
getPublishedForms  } from 'services/course/selectors';

import { 
helpIconStyle } from './inlineStyles';

import { 
useUserVerificationHook } from 'services/course/helpers/Hooks/useUserVerificationHook';

import { 
useOnLoadingHook } from 'services/course/helpers/Hooks/useOnLoadingHook';

import { 
role } from 'services/course/helpers/PageHelpers';
    
import Roles from 'services/course/pages/components/Roles';
import Loading from 'services/course/pages/components/Loading';
import LoginLogout from 'services/course/pages/LoginPage/components/LoginLogout';
import FormsComponent from 'services/course/pages/Forms/components/FormsComponent';
import NewFormPage from 'services/course/pages/Forms/NewFormPage';
import Cart from 'services/course/pages/SalesPage/Cart';
import MainMenu from 'services/course/pages/components/MainMenu';
import PostAddIcon from '@material-ui/icons/PostAdd';
import Modal from 'react-modal';

const FormListPage = ({ 
    operatorBusinessName,
    operator,
    user,
    formBuilders,
    publishedForms,
    formType,
    coursesLoading,
    onCoursesError,
    openNewCourseModal,
    closeNewCourseModal,
    isModalOpen }) => {

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
                onClick={openNewCourseModal}
            />
        }
        </Roles>
        <FormsComponent
            operatorBusinessName={operatorBusinessName} 
            user={user} 
            forms={publishedForms}
        />     
        <Modal isOpen={isModalOpen} onRequestClose={closeNewCourseModal}> <NewFormPage user={user} operatorBusinessName={operatorBusinessName}/> </Modal>
    </div>
); };

const mapDispatch = {
    openNewCourseModal,
    closeNewCourseModal
};

const mapState = (state, ownProps) => ({
    publishedForms: getPublishedForms(state, ownProps)?.filter(form => form?.formType === ownProps?.formType ),
    courses: getCoursesByOperatorId(state, ownProps),
    operator: getOperatorFromOperatorBusinessName(state, ownProps),
    user: state?.users?.user,
    coursesLoading: state?.courses?.coursesLoading,
    onCoursesError: state?.courses?.onCoursesError,
    isModalOpen: state?.courses?.isModalOpen
});

export default connect(mapState, mapDispatch)(FormListPage);