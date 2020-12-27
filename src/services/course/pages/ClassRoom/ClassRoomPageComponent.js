import React from 'react';

import { 
connect } from 'react-redux';

import {
addNewGrade,
markAttendance,
saveAttendance,
saveGrade,     
addNewLesson,
saveUser,
createUserGeneratePassword,
toggleClassRoomCourseGradeForm,
userNavigationHistory } from '../../actions';


import { 
navigateToStudentDetailPage } from  './classRoomPageHelpers';

import {
role } from '../../../../helpers/pageHelpers';

import {
Link } from '@reach/router';

import DropDownSelectorComponent from '../Components/DropDownSelectorComponent';
import NewDetailedLessonPage from '../Lessons/NewDetailedLessonPage';
import LoginLogout from '../Login/LoginLogout';
import Roles from '../Components/roles/Role';
import CourseDetailCheckBoxComponent from '../Courses/CourseDetailCheckBoxComponent';
import AddStudentGradeComponent from '../Grades/AddStudentGradeComponent';
import MarkAttendanceComponent from '../Attendance/MarkAttendanceComponent';
import MultiInputEmailComponent from '../Email/MultiInputEmailComponent';
import NavLinks from '../Components/NavLinks';


const ClassRoomPageComponent = ({
operatorBusinessName,
operator,       
currentUser,
selectedUser,
enableTeachPlatform,
courseDetailChildren,
studentsSubscribedToThisCourse,
setListOfStudents,
selectedStudents,
sessions,
emailInputOptions,
emailMessageOptions,
currentTutor,
listOfCoursesForTheSelectedStudent,
listOfLessonsForTheSelectedStudent,
setSelectedCourseFromCourseDropDownSelector,
setSelectedLessonFromLessonDropDownSelector,
selectedCourseFromCourseDropDrown,
selectedLessonFromLessonDropDrown,
grades,
addNewLesson,
addNewGrade,
markAttendance,
toggleClassRoomCourseGradeForm,
toggleBetweenAttendanceGradeDisplay,
setDropDownDisplayOption,
dropDownDisplayOption,
displayGradeForm,
userNavigationHistory,
animateInvitationButton }) => {

let selectedStudent = selectedStudents[0];
 
return (
            <div className="CourseDetail"> 

            <header>
                
               <span>
                 <h1>{selectedUser?.firstname}</h1> 
                <button
                    className="plan-lesson-btn"
                    onClick={enableTeachPlatform}
                >
                    { currentUser?.role === role.Tutor ? "Teach"  : "Join" }
                </button>
              </span> 

                  <LoginLogout
                        operatorBusinessName={operatorBusinessName}
                        user={currentUser} 
                  />

            </header>


    <div className="content"> 

             <div className="sidebar"/> 

                <div className="lesson"> 
                 
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
                        

                             {
                                   ( displayGradeForm && ( selectedStudent !== undefined ) ) && 
                                   <Roles
                                       role={currentUser?.role === role.Tutor }
                                   >
                                     <span className="left">   
                                        <DropDownSelectorComponent
                                                label={""}
                                                key={"_id"}
                                                value={"name"}
                                                optionCollection={toggleBetweenAttendanceGradeDisplay}
                                                setOptionSelectedValue={selectedOption => setDropDownDisplayOption(selectedOption)} 
                                        />  
                                       </span>     
                                    </Roles> 
                             }
                                   
                         {
                             displayGradeForm && 
                             <span>
                             {
                               (dropDownDisplayOption === "Grade") 
                                            ? <AddStudentGradeComponent
                                                    className="add-lesson-button"
                                                    selectedCourse={selectedCourseFromCourseDropDrown}
                                                    selectedLesson={selectedLessonFromLessonDropDrown}
                                                    studentId={selectedStudent?._id}
                                                    onSubmit={newGrade => addNewGrade( newGrade  ) }
                                                />
                                            : <MarkAttendanceComponent 
                                                className="add-lesson-button"
                                                selectedCourse={selectedCourseFromCourseDropDrown}
                                                selectedLesson={selectedLessonFromLessonDropDrown}
                                                studentId={selectedStudent?._id}
                                                onSubmit={attendance => markAttendance( attendance  ) }
                                            />
                                   
                               }
                         </span>
                                   

                         } 
                         
                  </div> 

                      {/* <div>
                          
                            { courseDetailChildren }

                      </div>  */}

                         
                                     
                   </div>
               
                     <Roles
                        role={currentUser?.role === role.Tutor }
                      >
                           <div className="sidebar"> 
                                <CourseDetailCheckBoxComponent 
                                        collection={(selectedCourseFromCourseDropDrown) ? studentsSubscribedToThisCourse?.filter(student => student.courses.includes(selectedCourseFromCourseDropDrown?._id)) : selectedCourseFromCourseDropDrown}
                                        setCollection={meetingInvitees => setListOfStudents(meetingInvitees)}
                                        description={"firstname"}
                                        sessions={sessions}
                                        grades={grades}
                                        toggleClassRoomCourseGradeForm={toggleClassRoomCourseGradeForm}
                                        lessonId={selectedLessonFromLessonDropDrown?._id}
                                        courseId={selectedCourseFromCourseDropDrown?._id}
                                        operatorBusinessName={operatorBusinessName}
                                        userNavigationHistory={userNavigationHistory}
                                /> 
                           </div>
                      </Roles>
               
                    
                      <Roles
                        role={currentUser?.role === role.Student }
                      >
                           <div className="sidebar"> 
                                <MultiInputEmailComponent
                                    setLesson={currentTutor}
                                    inputFieldOptions={emailInputOptions}
                                    messageOptions={emailMessageOptions}
                                    animateInvitationButton={animateInvitationButton} 
                                />
                           </div>
                      </Roles>
                      
                </div>
        </div>

        );

}



export default connect( null, { createUserGeneratePassword, saveUser, addNewLesson, addNewGrade, markAttendance, saveAttendance, saveGrade, toggleClassRoomCourseGradeForm, userNavigationHistory } )(ClassRoomPageComponent);