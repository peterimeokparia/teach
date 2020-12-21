import React from 'react';

import { 
connect } from 'react-redux';

import {
addNewGrade,
markAttendance,
saveAttendance,
saveGrade } from '../actions';

import {
role } from '../../../helpers/pageHelpers';

import {
navigate, 
Link } from '@reach/router';

import ListItemComponent from './ListItemComponent';
import LoginLogout from './LoginLogout';
import Roles from './components/roles/Role';
import MultiInputEmailComponent from './MultiInputEmailComponent';
import NavLinks from './NavLinks';

import './CourseDetailPage.css';



const StudentDisplayViewComponent = ({
operatorBusinessName,
operator,       
currentUser,
selectedStudents,
emailInputOptions,
emailMessageOptions,
lessonPlanUrl,
setCurrentPage,
setLessonPlanUrl,
currentPage,
courseId,
lessonId,
course,
lessons,
navigationHistory,
parentChild,
children  }) => {



function onMatchListItem( match, listItem ) {

    if ( match ){

        setCurrentPage( listItem );
      //setLessonPlanUrl(`/${operatorBusinessName}/LessonPlan/${groupId}/${classRoomGroupName}/${listItem._id}/${listItem.firstname}`);
    }
} 

 

let links = [ 
      { id: "Grades", title: "Grades", path:`student/${ selectedStudents?._id }/grades`, _id: selectedStudents?._id }, 
      { id: "Attendance", title: "Attendance", path: `student/${ selectedStudents?._id  }/attendance`, _id: selectedStudents?._id }, 
      { id: "Session", title: "Session", path: `student/${ selectedStudents?._id  }/sessions/courseId/${courseId}`, _id: selectedStudents?._id },
    ];
 
return (

    <div className="CourseDetail"> 

            <header>
                
                <NavLinks to={navigationHistory?.replace('http://localhost:3000', "")}>  <h1>{selectedStudents?.firstname + " : StudentId:" + selectedStudents?._id}</h1> </NavLinks>

                  <LoginLogout
                        operatorBusinessName={operatorBusinessName}
                        user={currentUser} 
                  />

            </header>


    <div className="content"> 

                <div className="sidebar"> 

                <ListItemComponent
                      id={selectedStudents?._id}
                      altLinkPath={"student"}
                      collection={links}
                      onMatchListItem={onMatchListItem}
                      path={undefined}
                 >
                     {

                        ( selectedPage ) => (

                          <div>      
                              <div>

                              <Link to={selectedPage?.path}> <span title={selectedPage?.title} >{ selectedPage?.title } </span> </Link> 

                              <br></br>

                              <div> 
                            </div>  
                            </div>
                            
                          </div>
                      
                         )

                     }

                 </ListItemComponent>    
                                   
                {/*SIDE BAR 1 */}

                </div>
            
                <div className="lesson"> 

                    <div>
                         {/* { children } */}
                         {parentChild}
                    </div> 
                    
                      
                </div>


                <div className="sidebar"> 
                <Roles
                        role={currentUser?.role === role.Student }
                      >
                         
                                <MultiInputEmailComponent
                                    setLesson={lessons && Object.values(lessons)?.find(lesson => lesson?._id === lessonId)}
                                    inputFieldOptions={emailInputOptions}
                                    messageOptions={emailMessageOptions} 
                                />
                      </Roles>
                </div>
          </div>

        </div>

        );

}



export default connect( null, { addNewGrade, saveGrade,  markAttendance, saveAttendance } )(StudentDisplayViewComponent);