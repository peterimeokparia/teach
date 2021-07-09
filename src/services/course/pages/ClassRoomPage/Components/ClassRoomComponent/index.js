import { 
connect } from 'react-redux';

import { 
markAttendance } from 'Services/course/Actions/Attendance';

import {
addNewGrade } from 'Services/course/Actions/Grades';

import {
loadMeetingsByMeetingId,
addNewMeeting,  
saveMeeting } from 'Services/course/Actions/Meetings'; 

import{
updateCurrentClassRoomLessonPlan,     
updateCurrentTutor } from 'Services/course/Actions/ClassRooms';

import { 
addNewGradesForSelectedStudents } from 'Services/course/Pages/GradesPage/Components/AddStudentGrade/helpers';

import { 
markAttendanceForSelectedStudents } from 'Services/course/Pages/AttendancePage/Components/MarkAttendanceComponent/helpers';

import { 
role } from 'Services/course/helpers/PageHelpers';

import { 
navContent } from 'Services/course/Pages/Components/NavigationHelper';

import {
sendPushNotificationMessage,
getSelectedPushNotificationUsers } from 'Services/course/Actions/Notifications';

import{
setLessonInProgressStatus } from 'Services/course/Actions/Lessons';

import{
sendEmails } from 'Services/course/Actions/Emails';

import{
updateUserInvitationUrl, 
loadUserByEmail,
getCurrentUserById,
updateCurrentUser } from 'Services/course/Actions/Users';

import {  
getUsersByOperatorId,    
getOperatorFromOperatorBusinessName,
getPushNotificationUsersByOperatorId,
getCoursesByOperatorId,
getSortedRecordsByDate } from 'Services/course/Selectors';

import { 
getLessonPlanUrls,
getSelectedUser, 
getStudentsSubscribedToCoursesByThisTutor, 
toggleBetweenAttendanceGradeDisplay,
emailInputOptions, 
emailMessageOptions,
verifyInviteeList } from  '../../helpers';

import useClassRoomComponentHook from '../../hooks/useClassRoomComponentHook';
import MainMenu from 'Services/course/Pages/Components/MainMenu';
import DropDown from 'Services/course/Pages/Components/DropDown';
import CourseLessonDropDownComponent from 'Services/course/Pages/ClassRoomPage/Components/CourseLessonDropDownComponent';
import LoginLogout from 'Services/course/Pages/LoginPage/Components/LoginLogout';
import Roles from 'Services/course/Pages/Components/Roles';
import CourseDetailCheckBoxComponent from 'Services/course/Pages/Courses/Components/CourseDetailCheckBoxComponent';
import AddStudentGradeComponent from 'Services/course/Pages/GradesPage/Components/AddStudentGrade';
import MarkAttendanceComponent from 'Services/course/Pages/AttendancePage/Components/MarkAttendanceComponent';
import MultiInputEmailComponent from 'Services/course/Pages/Email/MultiInputEmailComponent';
import './style.css';

const ClassRoomComponent = ({
    selectedUserId,
    operator,
    operatorBusinessName,
    currentUser,
    allSessions,
    users,
    grades,
    courses,
    markAttendance,
    addNewGrade,
    toggleSideBarDisplay,
    pushNotificationSubscribers,
    selectedCourseFromLessonPlanCourseDropDown, 
    selectedLessonFromLessonPlanDropDown, 
    updateUserInvitationUrl,
    addNewMeeting,
    saveMeeting,
    updateCurrentUser,
    getCurrentUserById,
    sendPushNotificationMessage,
    getSelectedPushNotificationUsers,
    setLessonInProgressStatus,
    loadMeetingsByMeetingId,
    sendEmails,
    loadUserByEmail }) => {
             
    const selectedUser = getSelectedUser( users, selectedUserId );
    const currentGrades = grades?.filter(grd => grd?.courseId === selectedCourseFromLessonPlanCourseDropDown?._id);
    const url = getLessonPlanUrls( operatorBusinessName, selectedUserId );
    const sessions = allSessions?.filter( usersession => usersession?.courseId === selectedCourseFromLessonPlanCourseDropDown?._id);

    let {
        setListOfStudents,
        setDropDownDisplayOption,
        setAnimationForEmailInvitationEffect,
        setNewMeetingTimerHandle,
        dropDownDisplayOption, 
        listOfStudents,
        animateInvitationButton,
        setUpdateUserTimerHandle
    } = useClassRoomComponentHook(selectedUser, "boomingllc" );

    const pushNotificationUsers = pushNotificationSubscribers?.filter(pushuser => listOfStudents?.find(student => student?._id === pushuser?.userId));
    
    let teachPlatformProps = { 
        listOfStudents, 
        sessions, 
        currentUser, 
        operatorBusinessName, 
        selectedUserId, 
        selectedCourseFromLessonPlanCourseDropDown, 
        selectedLessonFromLessonPlanDropDown, 
        addNewMeeting,
        updateUserInvitationUrl,
        saveMeeting,
        pushNotificationSubscribers,
        users,
        pushNotificationSubscribers,
        users,
        setUpdateUserTimerHandle,
        setNewMeetingTimerHandle,
        setAnimationForEmailInvitationEffect, 
        updateCurrentUser,
        getCurrentUserById, 
        sendPushNotificationMessage,
        getSelectedPushNotificationUsers,
        setLessonInProgressStatus,
        updateCurrentTutor,
        loadMeetingsByMeetingId,
        sendEmails,
        loadUserByEmail
    };

return (
    <div className="ClassRoomDetail"> 
            <header>
                <div>
                    <h1>  <span className="multiColor"> {selectedUser?.firstname} </span></h1> 
                    <span className="header-left">
                    <MainMenu 
                        navContent={navContent( currentUser, operatorBusinessName, currentUser?.role,  "Student" ).users}
                    />
                    </span>
                </div>
                <span>   
                    <button
                        className="plan-lesson-btn"
                        onClick={() => verifyInviteeList(teachPlatformProps)}
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
                <div className="sidebar">
                {( ( toggleSideBarDisplay ) || dropDownDisplayOption ) && (listOfStudents?.length > 0) && 
                    <Roles
                        role={currentUser?.role === role.Tutor }
                    >
                        <span className="left">   
                        <DropDown
                            label={""}
                            key={"_id"}
                            value={"name"}
                            optionCollection={toggleBetweenAttendanceGradeDisplay()}
                            setOptionSelectedValue={selectedOption => setDropDownDisplayOption(selectedOption)} 
                        />  
                        </span>     
                    </Roles> 
                }
                </div> 
                 <div className="class"> 
                <div>
                    {( dropDownDisplayOption === "Courses" || 
                        dropDownDisplayOption === "" ) &&  
                        <CourseLessonDropDownComponent
                            className="add-class-button"
                            operatorBusinessName={operatorBusinessName}
                            selectedUserId={selectedUserId}     
                        />
                    }
                    {( dropDownDisplayOption === "Grade" ) &&  
                        <div className="AddStudentGradeComponent"> 
                        <AddStudentGradeComponent
                            className="add-class-button"
                            selectedStudents={listOfStudents}
                            onSubmit={newGrade => addNewGradesForSelectedStudents( pushNotificationUsers, selectedCourseFromLessonPlanCourseDropDown, newGrade, currentGrades, addNewGrade  ) }
                        />
                        </div>    
                    }
                    {( dropDownDisplayOption === "Attendance" ) &&    
                        <div className="MarkAttendanceComponent">   
                        <MarkAttendanceComponent 
                            className="add-class-button"
                            selectedStudents={listOfStudents}
                            onSubmit={attendance => markAttendanceForSelectedStudents( pushNotificationUsers, selectedCourseFromLessonPlanCourseDropDown, attendance, markAttendance  ) }
                        />
                        </div>    
                    }
                </div>
                </div>
                <Roles
                    role={ currentUser?.role === role.Tutor }
                >
                    <div className="sidebar"> 
                        <CourseDetailCheckBoxComponent 
                            collection={(selectedCourseFromLessonPlanCourseDropDown) ? getStudentsSubscribedToCoursesByThisTutor( users, courses, selectedUserId )?.filter(student => student.courses.includes(selectedCourseFromLessonPlanCourseDropDown?._id)) : selectedCourseFromLessonPlanCourseDropDown}
                            setCollection={meetingInvitees => setListOfStudents(meetingInvitees)}
                            description={"firstname"}
                            operatorBusinessName={operatorBusinessName}
                        />     
                    </div>
                </Roles>
                <Roles
                    role={ currentUser?.role === role.Student }
                >
                <div className="sidebar"> 
                    <MultiInputEmailComponent
                        setLesson={selectedUser}
                        inputFieldOptions={emailInputOptions}
                        messageOptions={emailMessageOptions(currentUser, url?.lessonPageUrl)}
                        animateInvitationButton={animateInvitationButton} 
                    />
                </div>
                      </Roles>
                </div>
        </div>
    );
};

const mapDispatch = {
    updateCurrentUser,
    getCurrentUserById,
    addNewMeeting,
    updateUserInvitationUrl,
    saveMeeting,
    markAttendance, 
    addNewGrade,
    updateCurrentTutor,
    updateCurrentClassRoomLessonPlan,
    sendPushNotificationMessage,
    getSelectedPushNotificationUsers,
    setLessonInProgressStatus,
    loadMeetingsByMeetingId,
    sendEmails,
    loadUserByEmail
};

const mapState = (state, ownProps) => {
    return {
        operator: getOperatorFromOperatorBusinessName(state, ownProps),
        pushNotificationSubscribers: getPushNotificationUsersByOperatorId(state, ownProps),
        currentUser: state.users.user,
        users: getUsersByOperatorId(state, ownProps),
        courses: getCoursesByOperatorId(state, ownProps),
        grades:  getSortedRecordsByDate(Object.values(state?.grades?.grades), 'testDate'),
        toggleSideBarDisplay: state.classrooms.displaySideBarDropDown,
        allSessions: Object.values(state?.sessions?.sessions),
        selectedLessonFromLessonPlanDropDown: state.lessons.selectedLessonFromLessonPlanDropDown,
        selectedCourseFromLessonPlanCourseDropDown: state.courses.selectedCourseFromLessonPlanCourseDropDown,
    };
};

export default connect( mapState, mapDispatch )(ClassRoomComponent);