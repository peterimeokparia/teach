import {
connect } from 'react-redux';

import { 
Link } from '@reach/router';

import { 
addNewLesson } from 'Services/course/Actions/Lessons';

import { 
userNavigationHistory } from 'Services/course/Actions/Users';

import {
selectCourseFromLessonPlanCourseDropDown } from 'Services/course/Actions/Courses';
            
import{
selectLessonFromLessonPlanDropDown } from 'Services/course/Actions/Lessons';
        
import {  
getListOfCoursesForTheSelectedStudent,
getListOfLessonsForTheSelectedStudent,
navigateToStudentDetailPage } from  '../../helpers';

import {  
getOperatorFromOperatorBusinessName,
getCoursesByCourseIdSelector,
getCoursesByOperatorId } from 'Services/course/Selectors';

import { 
role } from 'Services/course/helpers/PageHelpers';

import Roles from 'Services/course/Pages/Components/Roles';
import DropDown from 'Services/course/Pages/Components/DropDown';
import NewDetailedLessonPage from 'Services/course/Pages/Lessons/NewDetailedLessonPage';
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
selectLessonFromLessonPlanDropDown,
}) => {

const setCourseFromDropDown = ( selectedCourseId ) => {
    if ( selectedCourseId ) {
        try {  
            let course = courses?.find( crs => crs._id === selectedCourseId );

            selectCourseFromLessonPlanCourseDropDown( course );
        } catch (error) {
            throw Error('setCourseFromDropDown' + error);
        }
    }
};

const setLessonFromDropDown = ( selectedLessonId ) => {
    if ( selectedLessonId ) {
       try {
            let lesson = lessons?.find( lsn => lsn._id === selectedLessonId );

            selectLessonFromLessonPlanDropDown( lesson )
       
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
                    key={"_id"}
                    value={"name"}
                    optionCollection={getListOfCoursesForTheSelectedStudent( courses, currentUser, selectedUserId )}
                    setOptionSelectedValue={selectedCourse => setCourseFromDropDown(selectedCourse)} 
                />  
             </span>
             {(selectedCourseFromLessonPlanCourseDropDown) &&  
                <span className="right">
                    <DropDown
                        label={"Lessons"}
                        key={"_id"}
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
                            onSubmit={newlesson => addNewLesson( newlesson.title, newlesson.courseId, newlesson.lessonDate  ) }
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
                            <a  href onClick={() => navigateToStudentDetailPage(`/${operatorBusinessName}/student/${currentUser?._id}/course/${selectedCourseFromLessonPlanCourseDropDown?._id}/lessons/${selectedLessonFromLessonPlanDropDown?._id}`, userNavigationHistory)}> <span className="viewGradesLink"> View grades, attendance and package information. </span> </a> 
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