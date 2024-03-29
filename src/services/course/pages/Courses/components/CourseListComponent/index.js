import { useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { toggleCourseModal } from 'services/course/actions/courses';
import { helpIconStyle } from 'services/course/pages/Courses/MyCoursesPage/inlineStyles';
import { COURSES } from 'services/course/actions/courses';
import FullTextSearchComponentTest from 'services/course/pages/components/FullTextSearchComponentTest';
import CoursesComponent from 'services/course/pages/Courses/components/CoursesComponent';
import NewCoursePage from 'services/course/pages/Courses/NewCoursePage';
import Modal from 'react-modal';
import PostAddIcon from '@material-ui/icons/PostAdd';

const CourseListComponent = ({
    operatorBusinessName,
    user,
    courses,
    toggleCourseModal,
    isModalOpen,
    isFormModalOpen 
}) => {
    const dispatch = useDispatch();
    const [ toggleMainContent, setToggleMainContent ] = useState( false );

    const handleSearchOnClick = (e) => {
        setToggleMainContent( true );
    };

    const handleSearchOnBlur = (e) => {
        setToggleMainContent( false );
    };

    const handleSearch = (search) => {
        dispatch({ type: COURSES,  payload: {...search, operatorBusinessName } });
    };

return (    
    <div>      
        {( user?.role === "Tutor" ) && 
            <PostAddIcon 
                style={helpIconStyle()}
                className="comment-round-button-5"
                onClick={toggleCourseModal}
            />
        }
        {<div onClick={handleSearchOnClick} onBlur={handleSearchOnBlur}>
            <FullTextSearchComponentTest 
                searchContent={courses}
                searchKeysPropArray={[ 'name', 'description' ]}
                handleSearch={handleSearch}
                searchKeys={[ 'name', 'description', 'createdBy' ]}
            />
         </div>
        }
        {  (!toggleMainContent) &&
            <>
                <CoursesComponent
                    operatorBusinessName={operatorBusinessName}
                    modal={isModalOpen} 
                    courses={courses}
                />     
                <Modal 
                    isOpen={isModalOpen} 
                    onRequestClose={toggleCourseModal}
                > 
                    <NewCoursePage user={user} operatorBusinessName={operatorBusinessName}/> 
                </Modal>
            </>
        }
    </div>
); };

const mapDispatch = {
    toggleCourseModal
};

const mapState = ( state, ownProps )  => ({
    isModalOpen: state?.courses?.isModalOpen,
    isFormModalOpen: state?.formBuilders?.isFormModalOpen,
});

export default connect(mapState, mapDispatch)(CourseListComponent);