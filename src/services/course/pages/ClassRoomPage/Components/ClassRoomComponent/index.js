import { 
connect } from 'react-redux';

import { 
markAttendance } from 'teach/src/services/course/actions/attendance';

import {
addNewGrade } from 'teach/src/services/course/actions/grades';

import{
enableTeachPlatform } from 'teach/src/services/course/actions/classrooms';

import { 
addNewGradesForSelectedStudents } from 'teach/src/services/course/pages/GradesPage/components/AddStudentGrade/helpers';

import { 
markAttendanceForSelectedStudents } from 'teach/src/services/course/pages/AttendancePage/components/MarkAttendanceComponent/helpers';

import { 
role } from 'teach/src/services/course/helpers/PageHelpers';

import { 
navContent } from 'teach/src/services/course/pages/components/NavigationHelper';

import {  
getUsersByOperatorId,    
getOperatorFromOperatorBusinessName,
getPushNotificationUsersByOperatorId,
getCoursesByOperatorId,
getSortedRecordsByDate } from 'teach/src/services/course/selectors';

import { 
getLessonPlanUrls,
getSelectedUser, 
getStudentsSubscribedToCoursesByThisTutor, 
toggleBetweenAttendanceGradeDisplay,
emailInputOptions, 
emailMessageOptions } from  '../CourseLessonDropDownComponent/helpers';

import { 
openNewCourseModal, 
closeNewCourseModal } from 'teach/src/services/course/actions/courses';

import { 
helpIconStyle } from './inlineStyles';
    
import NewCoursePage from 'teach/src/services/course/pages/Courses/NewCoursePage';
import useClassRoomComponentHook from '../../hooks/useClassRoomComponentHook';
import MainMenu from 'teach/src/services/course/pages/components/MainMenu';
import DropDown from 'teach/src/services/course/pages/components/DropDown';
import CourseLessonDropDownComponent from 'teach/src/services/course/pages/ClassRoomPage/components/CourseLessonDropDownComponent';
import LoginLogout from 'teach/src/services/course/pages/LoginPage/components/LoginLogout';
import Roles from 'teach/src/services/course/pages/components/Roles';
import CourseDetailCheckBoxComponent from 'teach/src/services/course/pages/Courses/components/CourseDetailCheckBoxComponent';
import AddStudentGradeComponent from 'teach/src/services/course/pages/GradesPage/components/AddStudentGrade';
import MarkAttendanceComponent from 'teach/src/services/course/pages/AttendancePage/tests/MarkAttendanceComponent';
import MultiInputEmailComponent from 'teach/src/services/course/pages/Email/MultiInputEmailComponent';
import Modal from 'react-modal';
import PostAddIcon from '@material-ui/icons/PostAdd';
import Swal from 'sweetalert2';
import './style.css';

const ClassRoomComponent = ({
    enableTeachPlatform,
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
    isModalOpen,
    openNewCourseModal,
    closeNewCourseModal }) => {
    const selectedUser = getSelectedUser( users, selectedUserId );
    const currentGrades = grades?.filter(grd => grd?.courseId === selectedCourseFromLessonPlanCourseDropDown?._id);
    const url = getLessonPlanUrls( operatorBusinessName, selectedUserId );
    const sessions = allSessions?.filter( usersession => usersession?.courseId === selectedCourseFromLessonPlanCourseDropDown?._id);

    let {
        setListOfStudents,
        setDropDownDisplayOption,
        dropDownDisplayOption, 
        listOfStudents,
    } = useClassRoomComponentHook(operatorBusinessName, selectedUser );

    const pushNotificationUsers = pushNotificationSubscribers?.filter(pushuser => listOfStudents?.find(student => student?._id === pushuser?.userId));
    
    function enableTeachCoursePlatform( ) {
        if ( ( !listOfStudents ) || ( listOfStudents?.length === 0 ) ) {
            Swal.fire({
                title: `Please invite students before starting a new teaching session.`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Invite.',
                confirmButtonColor: '#673ab7',
                cancelButtonText: 'Not now.'
            }).then( (response) => {
              if ( response?.value ) {
                  return;
              } else { 
                  enableTeachPlatform({ listOfStudents, selectedUserId, operatorBusinessName, sessions, operator } );
              }
            }); 
    } else {
        enableTeachPlatform({ listOfStudents, selectedUserId, operatorBusinessName, sessions, operator });
    }
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
                        onClick={() => enableTeachCoursePlatform()}
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
                {( courses?.filter( course => course?.createdBy === selectedUserId)?.length === 0 && ( currentUser?.role === role.Tutor ) ) 
                    ? <div> 
                        { ( currentUser?.role === role.Tutor ) && 
                            <PostAddIcon 
                                style={helpIconStyle()}
                                className="comment-round-button-5"
                                onClick={openNewCourseModal}
                            />
                        }
                        <Modal isOpen={isModalOpen} onRequestClose={closeNewCourseModal}> <NewCoursePage user={currentUser} operator={operator}/> </Modal>
                     </div> 
                    : <div>
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
                }
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
                    />
                </div>
                      </Roles>
                </div>
        </div>
    );
};

const mapDispatch = {
    enableTeachPlatform,
    openNewCourseModal,
    closeNewCourseModal,
    markAttendance, 
    addNewGrade,
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
        selectedCourseFromLessonPlanCourseDropDown: state.courses.selectedCourseFromLessonPlanCourseDropDown,
        isModalOpen: state?.courses?.isModalOpen
    };
};

export default connect( mapState, mapDispatch )(ClassRoomComponent);