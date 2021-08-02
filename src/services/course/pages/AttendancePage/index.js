import {
connect } from 'react-redux';

import { 
saveAttendance } from 'services/course/actions/attendance';

import { 
Link } from '@reach/router';

import { 
getSortedRecordsByDate } from 'services/course/selectors';

import { 
role } from 'services/course/helpers/PageHelpers';

import Roles from 'services/course/pages/components/Roles';
import ListItem from 'services/course/pages/components/ListItem';
import EditAttendanceComponent from 'services/course/pages/AttendancePage/components/EditAttendanceComponent';

const AttendancePage = ({ 
studentId, 
currentUser,
saveAttendance,
attendances }) => {
function onMatchListItem( match, listItem ) {
    if ( match ){
       console.log(`${listItem}`);
    }
}     
return   (    
    <div>    
        {( attendances ) && <ListItem
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
                                onClick={() => { edit( selectedAttendance ); } }                                          
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
                                    onClick={() => { remove( selectedAttendance ); }}> 
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
                    </ListItem>                  
            }
    </div> 
    );
};

const mapState = (state, ownProps)   => {
  return {
    currentUser: state.users.user,
    attendances: Object.values(state?.attendance?.attendanceCollection),
    lesson: state.lessons.lessons[ownProps.lessonId]
  };
};

export default connect(mapState, { saveAttendance  } )(AttendancePage);