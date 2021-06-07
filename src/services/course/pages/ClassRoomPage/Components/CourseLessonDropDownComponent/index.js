import React from 'react';

import { 
connect } from 'react-redux';

import { 
addNewLesson } from 'Services/course/Actions/Lessons';

import { 
userNavigationHistory } from 'Services/course/Actions/Users';

import {  
navigateToStudentDetailPage } from  '../../helpers';

import { 
role } from 'Services/course/helpers/PageHelpers';

import { 
Link } from '@reach/router';

import Roles from 'Services/course/Pages/Components/Roles';
import DropDown from 'Services/course/Pages/Components/DropDown';
import NewDetailedLessonPage from 'Services/course/Pages/Lessons/NewDetailedLessonPage';

const CourseLessonDropDownComponent = ({
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
              <span className="left">   
                <DropDown
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
                    <DropDown
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
                            <a  href onClick={() => navigateToStudentDetailPage(`/${operatorBusinessName}/student/${currentUser?._id}/course/${selectedCourseFromCourseDropDrown?._id}/lessons/${selectedLessonFromLessonDropDrown?._id}`, userNavigationHistory)}> <span className="viewGradesLink"> View grades, attendance and package information. </span> </a> 
                        } 
                        </div> 
                    </Roles>        
            </div> 
      </div>
    );  
};

export default connect( null, { addNewLesson, userNavigationHistory } )(CourseLessonDropDownComponent);