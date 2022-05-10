import {
connect } from 'react-redux';

import { 
Link } from '@reach/router';

import { 
addNewLesson } from 'services/course/actions/lessons';

import { 
userNavigationHistory } from 'services/course/actions/users';

import {
selectCourseFromLessonPlanCourseDropDown } from 'services/course/actions/courses';
            
import{
selectLessonFromLessonPlanDropDown } from 'services/course/actions/lessons';

import {  
getListOfCoursesForTheSelectedStudent,
getListOfLessonsForTheSelectedStudent,
navigateToStudentDetailPage } from  './helpers';

import { 
setItemInSessionStorage } from 'services/course/helpers/ServerHelper';

import {  
getOperatorFromOperatorBusinessName,
getCoursesByCourseIdSelector,
getCoursesByOperatorId } from 'services/course/selectors';

import { 
role } from 'services/course/helpers/PageHelpers';

import Roles from 'services/course/pages/components/Roles';
import DropDown from 'services/course/pages/components/DropDown';
import NewDetailedLessonPage from 'services/course/pages/Lessons/NewDetailedLessonPage';
import './style.css';
    
const CourseLessonDropDownComponent = ({
    currentUser,
    operator,
    operatorBusinessName,
    courses,
    lessons,
    allSessions,
    selectedUserId,
    selectedCourseFromLessonPlanCourseDropDown,
    selectedLessonFromLessonPlanDropDown,
    addNewLesson,
    userNavigationHistory,
    selectCourseFromLessonPlanCourseDropDown,
    selectLessonFromLessonPlanDropDown }) => {
const setCourseFromDropDown = ( selectedCourseId ) => {
    if ( selectedCourseId ) {
        try {  
            let course = courses?.find( crs => crs._id === selectedCourseId );

            selectCourseFromLessonPlanCourseDropDown( course );
            setItemInSessionStorage('selectedCourse', course );
        } catch (error) {
            throw Error('setCourseFromDropDown' + error);
        }
    }
};

const setLessonFromDropDown = ( selectedLessonId ) => {
    if ( selectedLessonId ) {
        try {
            let lesson = lessons?.find( lsn => lsn._id === selectedLessonId );

            selectLessonFromLessonPlanDropDown( lesson );
            setItemInSessionStorage('selectedLesson', lesson );
        } catch (error) {
            throw Error('setLessonFromDropDown' + error);
        }
    }
};

return ( 
    <div>
        <div className="dropdownComponents"> 
                <span className="left">   
                <DropDown
                    label={"Courses"}
                    value={"name"}
                    optionCollection={getListOfCoursesForTheSelectedStudent( courses, currentUser, selectedUserId )}
                    setOptionSelectedValue={selectedCourse => setCourseFromDropDown(selectedCourse)} 
                />  
                </span>
                {(selectedCourseFromLessonPlanCourseDropDown) &&  
                <span className="right">
                    <DropDown
                        label={"Lessons"}
                        value={"title"}
                        optionCollection={getListOfLessonsForTheSelectedStudent( currentUser, lessons, selectedCourseFromLessonPlanCourseDropDown )}
                        setOptionSelectedValue={selectedLesson => setLessonFromDropDown(selectedLesson)}             
                    />     
                </span>
                }
                { (selectedLessonFromLessonPlanDropDown) && 
                <div className="generated-lessonlink">    
                    <Link to={`/${operatorBusinessName}/tutor/${currentUser?._id}/courses/${selectedCourseFromLessonPlanCourseDropDown?._id}/lessons/${selectedLessonFromLessonPlanDropDown?._id}`}> 
                    <span className="viewGradesLink"> <b> { (selectedCourseFromLessonPlanCourseDropDown?._id !== selectedLessonFromLessonPlanDropDown?.courseId ) 
                        ? "" 
                        : `Go to lesson: ${selectedLessonFromLessonPlanDropDown && selectedLessonFromLessonPlanDropDown?.title}` } </b> 
                    </span> 
                    </Link>
                </div> 
                
                }  
                { 
                (selectedCourseFromLessonPlanCourseDropDown) &&  
                    <Roles
                        role={currentUser?.role === role.Tutor }
                    >
                        <NewDetailedLessonPage
                            className="add-new-lesson"
                            selectedCourse={selectedCourseFromLessonPlanCourseDropDown}
                            selectedLesson={selectedLessonFromLessonPlanDropDown} 
                            onSubmit={newlesson => addNewLesson( newlesson.title, newlesson.title, newlesson.courseId, newlesson.lessonDate, currentUser?._id  ) }
                        />
                    </Roles>
                }
                    <div>
            </div>
                    <Roles
                        role={currentUser?.role === role.Student}
                    >
                        <div className="StudentDetailPageLink">
                        {( selectedCourseFromLessonPlanCourseDropDown) && 
                            <a  href onClick={() => navigateToStudentDetailPage(`/${operatorBusinessName}/student/${currentUser?._id}/course/${selectedCourseFromLessonPlanCourseDropDown?._id}}`, userNavigationHistory)}> <span className="viewGradesLink"> View grades, attendance and package information. </span> </a> 
                        } 
                        </div> 
                    </Roles>        
            </div> 
        </div>
    );  
};

const mapDispatch = {
    userNavigationHistory, 
    addNewLesson,
    selectCourseFromLessonPlanCourseDropDown,
    selectLessonFromLessonPlanDropDown
};

const mapState = (state, ownProps) => {
    return {
        currentUser: state.users.user,
        operator: getOperatorFromOperatorBusinessName(state, ownProps),
        course: getCoursesByCourseIdSelector( state, ownProps ),
        lessons: Object.values(state.lessons.lessons),
        allSessions: Object.values(state?.sessions?.sessions),
        courses: getCoursesByOperatorId(state, ownProps),
        selectedCourseFromLessonPlanCourseDropDown: state.courses.selectedCourseFromLessonPlanCourseDropDown,
        selectedLessonFromLessonPlanDropDown: state.lessons.selectedLessonFromLessonPlanDropDown
    };
};

export default connect( mapState,  mapDispatch )(CourseLessonDropDownComponent);