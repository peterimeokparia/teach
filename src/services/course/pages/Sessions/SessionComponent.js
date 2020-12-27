import React from 'react';
 
import {
connect } from 'react-redux';

import { 
saveSession } from '../../actions';

import {
navigate, 
Link } from '@reach/router';

import {
role } from '../../../../helpers/pageHelpers';
 
import Roles from '../Components/roles/Role';
import ListItemComponent from '../Components/ListItemComponent';
import EditSessionComponent from '../Sessions/EditSessionComponent';



const SessionComponent = ({ 
studentId,
currentUser,
courseId, 
saveSession,
sessions }) => {

    function onMatchListItem( match, listItem ) {

        if ( match ){
            // setCurrentTutor( listItem );
            // setLessonPlanUrl(`/${operatorBusinessName}/LessonPlan/${groupId}/${classRoomGroupName}/${listItem._id}/${listItem.firstname}`);
        }
    } 


    return   (    
         <div>    
             {
              ( sessions ) && <ListItemComponent
                                collection={Object.values(sessions?.filter(session => session?.userId === studentId && session?.courseId === courseId))}
                                onMatchListItem={onMatchListItem}
                                path={"student"}
                            >
                          {
                            ( selectedSession ) => (

                            < EditSessionComponent
                                studentId={studentId}
                                session={selectedSession}
                                className="lesson-item"
                                onSubmit={(session) => saveSession({...selectedSession, numberOfSessions: session?.numberOfSessions, totalNumberOfSessions: session?.totalNumberOfSessions  })}
                            >

                            { (edit, remove ) => (

                            <div>      
                                <div>
                                 
                                
                                     <div>
                                         <span> Sessions </span>
                                         <span className="sessionHeader"> Type of Session </span>
                                         <span className="sessionHeader"> Number of Sessions </span>
                                         <span className="sessionHeader"> Total Number of Sessions </span>
                                         <span className="sessionHeader"> Start Date </span>
                                         <span className="sessionHeader"> End Date </span>
                                         <span className="sessionHeader"> Auto Renew </span>
                                     </div>
                        
                               
                                <Link to={`student/${ studentId }/sessions/${selectedSession?._id}/courseId/${courseId}`}> <span title={selectedSession?._id} >{ selectedSession?.typeOfSession } </span> </Link> 

                                 <span className="sessions"> { selectedSession?.typeOfSession } </span>
                                 <span className="sessions"> { selectedSession?.numberOfSessions } </span>
                                 <span className="sessions"> { selectedSession?.totalNumberOfSessions } </span>
                                 <span className="sessions"> { selectedSession?.startDate } </span>
                                 <span className="sessions"> { selectedSession?.endDate } </span>
                                 <span className="sessions"> { selectedSession?.autoRenew } </span>

                                <br></br>

                                <div> 

                                <Roles
                                    role={currentUser?.role === role.Tutor }
                                >
                                        <button 
                                            className="edit-lesson-btn"
                                            onClick={() => { edit( selectedSession ) } }                                          
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
                                            onClick={() => { remove( selectedSession ) }}> 

                                            Delete 

                                        </button> 
                                    </span>

                                </Roles>
                                

                                </div>  
                                </div>
                                
                            </div>
                            )}
                            </EditSessionComponent> 
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
         sessions: Object.values(state?.sessions?.sessions),
         lesson: state.lessons.lessons[ownProps.lessonId]
  };
}


export default connect(mapState, { saveSession  } )(SessionComponent);