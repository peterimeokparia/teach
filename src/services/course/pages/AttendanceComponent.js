import React from 'react';
 
import {
connect } from 'react-redux';

import { 
saveAttendance } from '../actions';

import {
navigate, 
Link } from '@reach/router';

import {
getSortedRecordsByDate } from '../Selectors';

import {
role } from '../../../helpers/pageHelpers';
 
import Roles from './components/roles/Role';
import ListItemComponent from './ListItemComponent';
import EditAttendanceComponent from './EditAttendanceComponent';



const AttendanceComponent = ({ 
studentId, 
currentUser,
saveAttendance,
attendances }) => {

    function onMatchListItem( match, listItem ) {

        if ( match ){
    
            // setCurrentTutor( listItem );
           
            // setLessonPlanUrl(`/${operatorBusinessName}/LessonPlan/${groupId}/${classRoomGroupName}/${listItem._id}/${listItem.firstname}`);
        }
    } 

    // return (<div>Attendance coming soon!</div>)

    return   (    
         <div>    
             {
                ( attendances ) && <ListItemComponent
                                        collection={getSortedRecordsByDate(attendances?.filter(record => record?.studentId === studentId), 'attendanceDate')}
                                        onMatchListItem={onMatchListItem}
                                        path={"student"}
                                   >
                        {
                            ( selectedAttendance ) => (

                                < EditAttendanceComponent
                                        attendance={selectedAttendance}
                                        className="lesson-item"
                                        onSubmit={(attendance) => saveAttendance({...selectedAttendance, attendanceDate: attendance?.attendanceDate, attendanceMark: attendance?.attendanceMark  })}
                                >

                            { (edit, remove ) => (

                            <div>      
                                <div>
                                
                                
                                    <div>
                                        <div><h6>{selectedAttendance?.attendanceDate}</h6></div>
                                        <span> Attendance </span>
                                        <span className="attendanceHeader"> Date </span>
                                        <span className="attendanceHeader"> Marked </span>
                                    </div>


                                
                                <Link to={`student/${ studentId  }/attendance/${selectedAttendance?._id}`}> <span title={ selectedAttendance?._id } >{ selectedAttendance?.attendanceDate }  { " : " + selectedAttendance?.attendanceMark } </span> </Link> 


                                <span className="attendance"> { selectedAttendance?.attendanceDate } </span>

                                <span className="attendance"> { selectedAttendance?.attendanceMark } </span>

                                <br></br>

                                <div> 

                                <Roles
                                    role={currentUser?.role === role.Tutor }
                                >
                                        <button 
                                            className="edit-lesson-btn"
                                            onClick={() => { edit( selectedAttendance ) } }                                          
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
                                            onClick={() => { remove( selectedAttendance ) }}> 

                                            Delete 

                                        </button> 
                                    </span>

                                </Roles>
                                

                                </div>  
                                </div>
                                
                            </div>
                            )}
                            </EditAttendanceComponent> 
                            ) 
                            
                        }
                            </ListItemComponent>                  
                    }
 
            
         </div> 
    )  

}





const mapState = (state, ownProps)   => {
  return {
         currentUser: state.users.user,
         attendances: Object.values(state?.attendance?.attendanceCollection),
         lesson: state.lessons.lessons[ownProps.lessonId]
  };
}


export default connect(mapState, { saveAttendance  } )(AttendanceComponent);