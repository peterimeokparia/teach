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
navigateToStudentDetailPage } from  '../../../../helpers/classRoomPageHelpers';

import {
role } from '../../../../helpers/pageHelpers';

import {
Link } from '@reach/router';

import ListItemComponent from '../Components/ListItemComponent';

import DropDownSelectorComponent from '../Components/DropDownSelectorComponent';

import NewClassRoomUserPage from './NewClassRoomUserPage';
import NewDetailedLessonPage from '../Lessons/NewDetailedLessonPage';
import LoginLogout from '../Login/LoginLogout';
import Roles from '../Components/roles/Role';
import CourseDetailCheckBoxComponent from './CourseDetailCheckBoxComponent';
import AddStudentGradeComponent from '../Grades/AddStudentGradeComponent';
import MarkAttendanceComponent from '../Attendance/MarkAttendanceComponent';
import MultiInputEmailComponent from '../Email/MultiInputEmailComponent';

// import './CourseDetailPage.css';



const ClassRoomDisplayViewComponentWithinGroups = ({
operatorBusinessName,
operator,       
currentUser,
enableTeachPlatform,
courseDetailChildren,
studentsSubscribedToThisCourse,
setListOfStudents,
selectedStudents,
sessions,
emailInputOptions,
emailMessageOptions,
setLessonPlanUrl,
setCurrentTutor,
currentTutor,
users,
listOfCoursesForTheSelectedStudent,
listOfLessonsForTheSelectedStudent,
setSelectedCourseFromCourseDropDownSelector,
setSelectedLessonFromLessonDropDownSelector,
selectedCourseFromCourseDropDrown,
selectedLessonFromLessonDropDrown,
classRoomId,
groupId,
classRoomName,
classRoomGroupName,
createUserGeneratePassword,
saveUser,
lessonUrl,
grades,
attendance,
addNewLesson,
addNewGrade,
markAttendance,
saveAttendance,
saveGrade,
toggleClassRoomCourseGradeForm,
toggleBetweenAttendanceGradeDisplay,
setDropDownDisplayOption,
dropDownDisplayOption,
displayGradeForm,
userNavigationHistory }) => {



function onMatchListItem( match, listItem ) {

    if ( match ){

        setCurrentTutor( listItem );
       
        setLessonPlanUrl(`/${operatorBusinessName}/LessonPlan/${groupId}/${classRoomGroupName}/${listItem._id}/${listItem.firstname}`);
    }
} 


let selectedStudent = selectedStudents[0];
 
return (
            <div className="CourseDetail"> 

            <header>
                
                <h1>{classRoomName}</h1> 

                  <LoginLogout
                        operatorBusinessName={operatorBusinessName}
                        user={currentUser} 
                  />

            </header>


    <div className="content"> 

                <div className="sidebar"> 

                <ListItemComponent
                      collection={users?.filter(usr => usr.classRooms?.includes(groupId))}
                      onMatchListItem={onMatchListItem}
                      path={"classroom"}

                 >
                     {

                        ( selectedUser ) => (

                        < NewClassRoomUserPage
                            operator={operator}
                            users={users}
                            selectedUsersFirstName={selectedUser.firstname}
                            className="lesson-item"
                            selectedUser={selectedUser}
                            classRoomId={classRoomId}
                            classRoomGroupId={groupId}
                            onSubmit={(user) => saveUser({...selectedUser, email: user?.email, firstname: user?.firstname  })}
                        >

                        { (edit, remove, unsubscribe ) => (

                          <div>      
                              <div>

                              <Link to={`classroom/${selectedUser?._id}`}> <span title={selectedUser?._id} >{ selectedUser?.firstname } </span> </Link> 

                              <br></br>

                              <div> 

                              <Roles
                                 role={currentUser?.role === role.Tutor }
                              >
                                    <button 
                                        className="edit-lesson-btn"
                                        onClick={() => { edit( selectedUser ) } }                                          
                                    > 
                                        Edit
                                            
                                    </button>

                              </Roles>

                              <Roles
                                 role={ currentUser?.role === role.Tutor }
                              >
                                <span>
                                    <button
                                        className="delete-lesson-btn"
                                        onClick={() => { unsubscribe( selectedUser ) }}> 

                                        Unsubscribe 

                                    </button> 
                                </span>

                              </Roles>
                               
                                <button
                                    className="plan-lesson-btn"
                                    onClick={enableTeachPlatform}
                                >

                                    { currentUser?.role === role.Tutor ? "Teach"  : "Join" }

                                </button>
                            </div>  
                            </div>
                            
                          </div>
                         )}
                        </NewClassRoomUserPage> 
                         )

                     }

                 </ListItemComponent>    

                <Roles
                    role={currentUser?.role === role.Tutor }
                >
                    < NewClassRoomUserPage
                        operator={operator}
                        users={users} 
                        className="add-lesson-button"
                        onSubmit={newuser => createUserGeneratePassword(newuser)}
                        classRoomId={classRoomId}
                        classRoomGroupId={groupId}
                    >
                            { (edit) =>  (
                                    <button 
                                        className="add-lesson-button"
                                        onClick={edit}> 

                                        Add User

                                    </button>
                            ) }
                    </NewClassRoomUserPage>

                </Roles>
                                   
                {/*SIDE BAR 1 */}

                </div>
            
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
                                  <span className="left">
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
                             
                             {
                                (selectedLessonFromLessonDropDrown) && 
                                <Link to={`/${operatorBusinessName}/courses/${selectedCourseFromCourseDropDrown?._id}/lessons/${selectedLessonFromLessonDropDrown?._id}`}> <h4> <b> { (selectedCourseFromCourseDropDrown?._id !== selectedLessonFromLessonDropDrown?.courseId ) ? "" : `Go to lesson: ${selectedLessonFromLessonDropDrown && selectedLessonFromLessonDropDrown?.title}` } </b> </h4> </Link>
                             }  


                             <Roles
                                role={currentUser?.role === role.Student}
                             >
                             <div className="StudentDetailPageLink">
                             {
                                    
                                (selectedCourseFromCourseDropDrown) && 
                                <a onClick={() => navigateToStudentDetailPage(`/${operatorBusinessName}/student/${currentUser?._id}/course/${selectedCourseFromCourseDropDrown?._id}/lessons/${selectedLessonFromLessonDropDrown?._id}`, userNavigationHistory)}> <span className="viewGradesLink"> View grades, attendance etc. </span> </a> 
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
                                        lessonTitle={currentTutor?.firstname}
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
                                />
                           </div>
                      </Roles>
                      
                </div>
        </div>

        );

}



export default connect( null, { createUserGeneratePassword, saveUser, addNewLesson, addNewGrade, markAttendance, saveAttendance, saveGrade, toggleClassRoomCourseGradeForm, userNavigationHistory } )(ClassRoomDisplayViewComponentWithinGroups);