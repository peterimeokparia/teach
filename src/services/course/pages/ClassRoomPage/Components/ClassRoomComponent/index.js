import React from 'react';

import { 
connect } from 'react-redux';

import { 
navigate } from '@reach/router';

import { 
userNavigationHistory } from 'Services/course/Actions/Users';

import { 
markAttendance } from 'Services/course/Actions/Attendance';

import {
addNewGrade } from 'Services/course/Actions/Grades';

import { 
role } from 'Services/course/helpers/PageHelpers';

import { 
navContent } from 'Services/course/Pages/Components/NavigationHelper';

import MainMenu from 'Services/course/Pages/Components/MainMenu';
import DropDown from 'Services/course/Pages/Components/DropDown';
import CourseLessonDropDownComponent from 'Services/course/Pages/ClassRoomPage/Components/CourseLessonDropDownComponent';
import LoginLogout from 'Services/course/Pages/LoginPage/Components/LoginLogout';
import Roles from 'Services/course/Pages/Components/Roles';
import CourseDetailCheckBoxComponent from 'Services/course/Pages/Courses/Components/CourseDetailCheckBoxComponent';
import AddStudentGradeComponent from 'Services/course/Pages/GradesPage/Components/AddStudentGrade';
import MarkAttendanceComponent from 'Services/course/Pages/AttendancePage/Components/MarkAttendanceComponent';
import MultiInputEmailComponent from 'Services/course/Pages/Email/MultiInputEmailComponent';

const ClassRoomComponent = ({
config,
markAttendance,
addNewGrade,
userNavigationHistory }) => {
if ( ! config.currentUser?.userIsValidated || ! config.operator ){
    navigate(`/${config.operatorBusinessName}/login`);
}

let navigationContent = navContent( config.currentUser, config.operatorBusinessName, config.currentUser?.role,  "Student" ).users;    
let pushNotificationUsers = config.pushNotificationSubscribers?.filter(pushuser => config.selectedStudents?.find(student => student?._id === pushuser?.userId));

return (
    <div className="CourseDetail"> 
            <header>
                <div>
                    <h1>{config.selectedUser?.firstname}</h1> 
                    <span className="header-left">
                    <MainMenu 
                        navContent={navigationContent}
                    />
                    </span>
                </div>
                <span>   
                    <button
                        className="plan-lesson-btn"
                        onClick={config.enableTeachPlatform}
                    >
                        { config.currentUser?.role === role.Tutor ? "Teach"  : "Join" }
                    </button>
                </span>  
                  <LoginLogout
                        operatorBusinessName={config.operatorBusinessName}
                        user={config.currentUser} 
                  />
            </header>
        <div className="content"> 
            <div className="sidebar">
                {
                    ( ( config.toggleSideBarDisplay ) || config.dropDownDisplayOption ) && 
                        <Roles
                            role={config.currentUser?.role === role.Tutor }
                        >
                            <span className="left">   
                            <DropDown
                                label={""}
                                key={"_id"}
                                value={"name"}
                                optionCollection={config.toggleBetweenAttendanceGradeDisplay}
                                setOptionSelectedValue={selectedOption => config.setDropDownDisplayOption(selectedOption)} 
                            />  
                            </span>     
                        </Roles> 
                    }
               </div> 
                 <div className="lesson"> 
                        <div>
                            {( config.dropDownDisplayOption === "Courses" || 
                                    config.dropDownDisplayOption === "" ) &&  
                                    <CourseLessonDropDownComponent
                                        className="add-lesson-button"
                                        currentUser={config.currentUser}
                                        operatorBusinessName={config.operatorBusinessName}
                                        selectedCourseFromCourseDropDrown={config.selectedCourseFromCourseDropDrown} 
                                        selectedLessonFromLessonDropDrown={config.selectedLessonFromLessonDropDrown}
                                        listOfCoursesForTheSelectedStudent={config.listOfCoursesForTheSelectedStudent}
                                        listOfLessonsForTheSelectedStudent={config.listOfLessonsForTheSelectedStudent}
                                        setSelectedCourseFromCourseDropDownSelector={config.setSelectedCourseFromCourseDropDownSelector}
                                        setSelectedLessonFromLessonDropDownSelector={config.setSelectedLessonFromLessonDropDownSelector}      
                                    />
                            }
                            {
                                ( config.dropDownDisplayOption === "Grade" ) &&  
                                    <AddStudentGradeComponent
                                        className="add-lesson-button"
                                        selectedCourse={config.selectedCourseFromCourseDropDrown}
                                        selectedLesson={config.selectedLessonFromLessonDropDrown}
                                        selectedStudents={config.selectedStudents}
                                        onSubmit={newGrade => config.addNewGradesForSelectedStudents( pushNotificationUsers, config.selectedCourseFromCourseDropDrown, newGrade, config.grades, addNewGrade  ) }
                                    />
                            }
                            {  
                                ( config.dropDownDisplayOption === "Attendance" ) &&    
                                    <MarkAttendanceComponent 
                                            className="add-lesson-button"
                                            selectedCourse={config.selectedCourseFromCourseDropDrown}
                                            selectedLesson={config.selectedLessonFromLessonDropDrown}
                                            selectedStudents={config.selectedStudents}
                                            onSubmit={attendance => config.markAttendanceForSelectedStudents( pushNotificationUsers, config.selectedCourseFromCourseDropDrown, attendance, markAttendance  ) }
                                    />
                            }
                        </div>
                      </div>
                        <Roles
                            role={ config.currentUser?.role === role.Tutor }
                        >
                            <div className="sidebar"> 
                                <CourseDetailCheckBoxComponent 
                                    collection={(config.selectedCourseFromCourseDropDrown) ? config.studentsSubscribedToThisCourse?.filter(student => student.courses.includes(config.selectedCourseFromCourseDropDrown?._id)) : config.selectedCourseFromCourseDropDrown}
                                    setCollection={meetingInvitees => config.setListOfStudents(meetingInvitees)}
                                    description={"firstname"}
                                    sessions={config.sessions}
                                    grades={config.grades}
                                    lessonId={config.selectedLessonFromLessonDropDrown?._id}
                                    courseId={config.selectedCourseFromCourseDropDrown?._id}
                                    operatorBusinessName={config.operatorBusinessName}
                                    userNavigationHistory={userNavigationHistory}
                                    toggleClassRoomSideBarDropDownDisplay={config.toggleClassRoomSideBarDropDownDisplay}
                                />     
                            </div>
                      </Roles>
                      <Roles
                        role={ config.currentUser?.role === role.Student }
                      >
                        <div className="sidebar"> 
                            <MultiInputEmailComponent
                                setLesson={config.currentTutor}
                                inputFieldOptions={config.emailInputOptions}
                                messageOptions={config.emailMessageOptions}
                                animateInvitationButton={config.animateInvitationButton} 
                            />
                        </div>
                      </Roles>
                </div>
        </div>
    );
};

export default connect( null, { userNavigationHistory, markAttendance, addNewGrade } )(ClassRoomComponent);