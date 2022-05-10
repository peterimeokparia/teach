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
import './style.css';

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
    <div className="session">    
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
                            <div className="content">      
                                <div className="studentSessions">
                                        <div className="header">
                                            {/* <span> Sessions </span> */}
                                            <span className="sessionHeader"> Type of Session </span>
                                            <span className="sessionHeader"> Number of Sessions</span>
                                            <span className="sessionHeader"> Total Number of Sessions </span>
                                            <span className="sessionHeader"> Start Date </span>
                                            <span className="sessionHeader"> End Date </span>
                                            <span className="sessionHeader"> Auto Renew </span>
                                        </div>
                                        <Link to={`student/${ studentId }/sessions/${selectedSession?._id}/courseId/${courseId}`}> <span title={selectedSession?._id} >{ selectedSession?.typeOfSession } </span> </Link> 
                                        <span className="sessions"> { selectedSession?.numberOfSessions } </span>
                                        <span className="totalsessions"> { selectedSession?.totalNumberOfSessions } </span>
                                        <span className="startdate"> { new Date( selectedSession?.startDate )?.toLocaleDateString('en-US') } </span>
                                        <span className="enddate"> { new Date( selectedSession?.endDate )?.toLocaleDateString('en-US') } </span>
                                        <span className="autorenew"> { selectedSession?.autoRenew.toString() } </span>
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
    lesson: state?.lessons?.lessons[ownProps?.courseId]
    // lesson: state?.lessons?.lessons[ownProps.lessonId]
    };
};

export default connect(mapState, { saveSession, loadSessions  } )(SessionPage);