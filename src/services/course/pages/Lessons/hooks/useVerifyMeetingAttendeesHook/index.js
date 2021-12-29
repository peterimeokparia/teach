import { 
useState, 
useEffect } from 'react';

import { 
useDispatch,
useSelector } from 'react-redux';

import { 
navigate, 
Redirect } from '@reach/router';

import{
loadMeetings, 
loadMeetingsByMeetingId,
saveMeeting } from 'services/course/actions/meetings';

import{
incrementSessionCount } from 'services/course/actions/sessions';
    
import {
endMeetingWithPromoMessage } from 'services/course/middleware/classrooms/helpers/meetings';

import { 
getselectedTutor } from 'services/course/pages/ClassRoomPage/components/CourseLessonDropDownComponent/helpers';

import { 
role } from 'services/course/helpers/PageHelpers';

import{
loadUsers, 
updateCurrentUser } from 'services/course/actions/users';

import {
updateUserInvitationUrl } from 'services/course/actions/users';
    
function useVerifyMeetingAttendeesHook( meetingProps ) {

    let {
        operatorBusinessName,
        currentUser, 
        meetingId, 
        selectedUserId,
        loadMeetingsByMeetingId } = meetingProps;

    const dispatch = useDispatch();
    const [ meetingAttendees, setMeetingAttendees ] = useState( [] );
    const [ meeting, setCurrentMeeting ] = useState( undefined );
    const [ paidSessions, setPaidSessions ] = useState( undefined );

    let users = useSelector( state => state.users.users );
    let tutor = ( currentUser?.role === role.Tutor ) ? currentUser : getselectedTutor( users, selectedUserId );
    let meetings = useSelector( state => state.meetings.meetings );
    let meetingUrl = `/${operatorBusinessName}/LessonPlan/classRoom/${tutor?._id}`;
    let lessonUrl = currentUser?.inviteeSessionUrl;
    let meetingAttendeesId = meetingAttendees?.map( meetingUser => { return meetingUser?._id });
    let usersWhoAttendedMeeting = meeting?.invitees?.filter( meetingUser => meetingAttendeesId.includes( meetingUser?._id ));
   
    useEffect(() => {

    dispatch( loadUsers() ); 
    dispatch( loadMeetings() ); 

    if ( meetingId && meetings?.length > 0 ) {
        let currentMeeting = Object.values( meetings )?.find( meeting => meeting?._id === meetingId );
        if ( currentMeeting ) {
            setCurrentMeeting( currentMeeting );
        }
    }    
    }, [  loadUsers, loadMeetings, setCurrentMeeting, meetingId, meeting ]);

    ;

function handleSubmit( meetingAttendees ){
    
    let usersWhoJoinedTheMeeting = [ ...meetingAttendees, currentUser ];

    setMeetingAttendees( meetingAttendees );

    try {
        if ( meetingAttendees?.length > 0 ) {
        loadMeetingsByMeetingId( meetingId )
            .then( meeting => {
            if ( meeting ) {
                setPaidSessions( Object.values( meeting?.sessions ) );
                incrementSessionCountForMeetingUsers( meetingAttendees, currentUser, meeting );
                dispatch( saveMeeting( meetingId, { ...meeting, timeEnded: Date.now(), 
                    usersWhoJoinedTheMeeting
                }) );
                endMeetingWithPromoMessage( meetingUrl );
            }
            }).catch( error => { console.log( error ); })
            
        }
    } catch (error) {
         console.log( error );
    }
};
  
function incrementSessionCountForMeetingUsers( meetingUsers, currentUser, meeting  ) {
    let setInvitationUrl = "", nameOfLessonInProgress = "", lessonInProgress = false, meetingId = "", lesson="", course="";

    if ( meeting && currentUser?.role === role.Tutor ) { 

        let _currentUser = { 
            ...currentUser, 
            timeMeetingEnded: Date.now() , 
            setInvitationUrl, 
            nameOfLessonInProgress, 
            lessonInProgress, 
            meetingId,
            lesson,
            course 
        };
        
        dispatch( updateUserInvitationUrl( _currentUser ) );

        meetingUsers?.forEach( user => {
            let currentSession = Object.values(meeting?.sessions);
            let session = currentSession?.find(session => session?.userId === user?._id );

            handleIncrementingSessionCountForMeetingInvitees( session  );
            dispatch( updateUserInvitationUrl( _currentUser ) ); 
        });
    }
};
    
function handleIncrementingSessionCountForMeetingInvitees( session ){
    if ( session ) {
        dispatch( incrementSessionCount( session ) );
    }
};

return {
    meeting,
    handleSubmit: ( value ) => handleSubmit( value )
}; }

export default useVerifyMeetingAttendeesHook;