import {
useEffect } from 'react';

import {
connect } from 'react-redux';

import { 
loadSessions,
saveSession } from 'services/course/actions/sessions';

import {
getSessionsByOperatorId } from 'services/course/selectors';

import {
Link } from '@reach/router';

import {
role } from 'services/course/helpers/PageHelpers';

import Roles from 'services/course/pages/components/Roles';
import ListItem from 'services/course/pages/components/ListItem';
import EditSessionComponent from './component/EditSessionComponent';

const SessionPage = ({ 
    studentId,
    currentUser,
    courseId, 
    saveSession,
    loadSessions,
    sessions }) => {

    useEffect(() => {
        loadSessions();
    }, [ sessions?.length === 0]);

function onMatchListItem( match, listItem ) {
    if ( match ){
        console.log(`Selected: ${listItem}`);
    };
} 
return (    
    <div>    
        {( sessions ) && <ListItem
                            // collection={Object.values(sessions?.filter(session => session?.userId === studentId && session?.courseId === courseId))}
                            collection={sessions?.filter(session => session?.userId === studentId && session?.courseId === courseId)}
                            onMatchListItem={onMatchListItem}
                            path={"student"}
                        >
                            {( selectedSession ) => (
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
                                        onClick={() => { edit( selectedSession ); } }                                          
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
                                            onClick={() => { remove( selectedSession ); }}> 
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
                    </ListItem>                    
                }
            </div>     
    );
};

const mapState = (state, ownProps)  => {
    return {
    currentUser: state?.users?.user,
    sessions: getSessionsByOperatorId(state, ownProps),
    lesson: state?.lessons?.lessons[ownProps.lessonId]
    };
};

export default connect(mapState, { saveSession, loadSessions  } )(SessionPage);