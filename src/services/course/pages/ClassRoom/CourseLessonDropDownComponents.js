import React from 'react';

import { 
connect } from 'react-redux';

import {
addNewLesson,
userNavigationHistory } from '../../actions';

import { 
navigateToStudentDetailPage } from  './classRoomPageHelpers';

import {
role } from '../../../../helpers/pageHelpers';

import {
Link } from '@reach/router';

import Roles from '../Components/roles/Role';
import DropDownSelectorComponent from '../Components/DropDownSelectorComponent';
import NewDetailedLessonPage from '../Lessons/NewDetailedLessonPage';


const CourseLessonDropDownComponents = ({
currentUser,
operatorBusinessName,
selectedCourseFromCourseDropDrown, 
selectedLessonFromLessonDropDrown,
addNewLesson,
userNavigationHistory,
listOfCoursesForTheSelectedStudent,
listOfLessonsForTheSelectedStudent,
setSelectedCourseFromCourseDropDownSelector,
setSelectedLessonFromLessonDropDownSelector   
}) => {

return (
      
    <div>

        <div className="dropdownComponents"> 

              <span className="left">   <DropDownSelectorComponent
                                            label={"Courses"}
                                            key={"_id"}
                                            value={"name"}
                                            optionCollection={listOfCoursesForTheSelectedStudent}
                                            setOptionSelectedValue={selectedCourse => setSelectedCourseFromCourseDropDownSelector(selectedCourse)} 
                                        />  
             </span>
             {
                 selectedCourseFromCourseDropDrown &&  
                              <span className="right">
                                    <DropDownSelectorComponent
                                        label={"Lessons"}
                                        key={"_id"}
                                        value={"title"}
                                        optionCollection={listOfLessonsForTheSelectedStudent}
                                        setOptionSelectedValue={selectedLesson => setSelectedLessonFromLessonDropDownSelector(selectedLesson)}             
                                    />     
                                </span>
             }

             {
                (selectedCourseFromCourseDropDrown && 
                  selectedLessonFromLessonDropDrown?.title === undefined) && 
                            <Roles
                                role={currentUser?.role === role.Tutor }
                            >
                                <NewDetailedLessonPage
                                    className="add-lesson-button"
                                    selectedCourse={selectedCourseFromCourseDropDrown}
                                    selectedLesson={selectedLessonFromLessonDropDrown}
                                    onSubmit={newlesson => addNewLesson( newlesson.title, newlesson.courseId, newlesson.lessonDate  ) }
                                />

                            </Roles>
             }
                         <div>
                         {
                            (selectedLessonFromLessonDropDrown) && 
                            <Link to={`/${operatorBusinessName}/courses/${selectedCourseFromCourseDropDrown?._id}/lessons/${selectedLessonFromLessonDropDrown?._id}`}> <span className="viewGradesLink"> <b> { (selectedCourseFromCourseDropDrown?._id !== selectedLessonFromLessonDropDrown?.courseId ) ? "" : `Go to lesson: ${selectedLessonFromLessonDropDrown && selectedLessonFromLessonDropDrown?.title}` } </b> </span> </Link>
                         }  
                         </div>

                         <Roles
                            role={currentUser?.role === role.Student}
                         >
                         <div className="StudentDetailPageLink">
                         {
                                
                            (selectedCourseFromCourseDropDrown) && 
                            <a onClick={() => navigateToStudentDetailPage(`/${operatorBusinessName}/student/${currentUser?._id}/course/${selectedCourseFromCourseDropDrown?._id}/lessons/${selectedLessonFromLessonDropDrown?._id}`, userNavigationHistory)}> <span className="viewGradesLink"> View grades, attendance and package information. </span> </a> 
                         } 
                         </div> 
                         </Roles>
                    
                  </div> 
      </div>
    );  
}

export default connect( null, { addNewLesson, userNavigationHistory } )(CourseLessonDropDownComponents);