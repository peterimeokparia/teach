import { 
useState, 
useEffect } from 'react';

import { 
useDispatch,
useSelector } from 'react-redux';

import { 
navigate, 
Redirect } from '@reach/router';

import { 
role } from 'services/course/helpers/PageHelpers';

import{
loadMeetings,
startMeeting,
endMeeting,
waitForMeetingToStartBeforeJoining } from 'services/course/actions/meetings';

import{
updateCurrentTutor,
addMeetingEventToUsersCalendar } from 'services/course/actions/classrooms';

import { 
loadCourses, 
selectCourseFromLessonPlanCourseDropDown } from 'services/course/actions/courses';

import { 
loadLessons,
selectLessonFromLessonPlanDropDown } from 'services/course/actions/lessons';

import{
loadUsers, 
updateCurrentUser } from 'services/course/actions/users';
    
import { 
Validations } from 'services/course/helpers/Validations';

import { 
setItemInSessionStorage,
getItemFromSessionStorage } from 'services/course/helpers/ServerHelper';

import {
loadWhiteBoardData } from 'services/course/actions/whiteBoards';

import moment from 'moment';

function useUsersHook( currentMeetingId, currentUser, classRoomId, selectedCourse, selectedLesson ) {
    const [ hideMeetingStage, setHideMeetingStage ] = useState(false);
    const [ fullMeetingStage, setFullMeetingStage ] = useState(false);
    const [ videoModalModeOn,  setVideoModalMode ] = useState(false);
    const [ meetingPanel,  setMeetingPanel ] = useState(false);
    const [ session, setSession ] = useState( false );  
    let [ roomSize, setRoomSize ] = useState(1);  

    const dispatch = useDispatch();
    let tutor = Object.values( useSelector( state => state.users.users ) )?.find( usr => usr?._id === classRoomId );
    let meetings = useSelector( state => state.meetings.meetings );
    let meeting = Object.values( meetings )?.find( meeting => meeting?._id === tutor?.meetingId );
    let meetingId = meeting?._id;
    let currentCourse = Object.values( useSelector( state => state?.courses?.courses ) )?.find( course => course?._id === meeting?.courseId );
    let currentLesson = Object.values( useSelector( state => state?.lessons?.lessons ) )?.find( lesson => lesson?._id === meeting?.lessonId );
    let paidSessions = useSelector( state => Object.values(state?.sessions?.sessions) );
    let sessions = paidSessions?.filter( usersession => usersession?.courseId === currentCourse?._id);
    let operatorBusinessName = getItemFromSessionStorage('operatorBusinessName');
    let meetingUrl = `/${operatorBusinessName}/LessonPlan/classRoom/${tutor?._id}`;

    
    let  meetingProps = {
    userId: currentUser?._id,
    courseId: currentCourse?._id, 
    lessonId: currentLesson?._id,
    sessions,
    invitees: [], 
    currentUser,
    courseTitle: currentCourse?.name,
    lessonTitle: currentLesson?.title,
    meetingUrl,
    usersWhoJoinedTheMeeting:[]
    }; 

    useEffect(() => {
    if ( selectedCourse ) {
        setItemInSessionStorage('selectedCourse', selectedCourse );
    }

    if ( selectedLesson ) {
        setItemInSessionStorage('selectedLesson', selectedLesson );
    }

    dispatch( loadWhiteBoardData() );
    dispatch( loadUsers() );
    dispatch( loadMeetings() );
    dispatch( loadCourses() );

    if ( tutor ){
        dispatch( updateCurrentTutor( tutor ));
    }

    if ( currentCourse ) {
        dispatch( loadLessons( currentCourse?._id ) );
    }

    if ( meeting && meeting?._id && currentCourse && currentLesson ) {
        dispatch( selectCourseFromLessonPlanCourseDropDown( currentCourse ) );
        dispatch( selectLessonFromLessonPlanDropDown( currentLesson ) );
    }
    }, [ loadMeetings, loadUsers, loadCourses, loadLessons ]);

    useEffect(() => {

    dispatch( loadUsers() ); 

    if ( currentUser ) {
        handleRedirectionsOnPageLoad( currentUser, classRoomId, operatorBusinessName, paidSessions );
    }

    if ( ( joinMeetingAfterWaitingForTheMeetingToStart() || 
            reJoinCurrentMeetingIfUserDisconnectedMistakenly() ) && !session ) {
        setSession(true);
        setHideMeetingStage(false);
        
        if ( getItemFromSessionStorage( 'meetingId' ) ) {
            sessionStorage.removeItem( 'meetingId' );
        }

        dispatch( addMeetingEventToUsersCalendar( meetingProps ) );
        return;
    };

    if ( waitingForTheCurrentMeetingToStart() ) {
        dispatch( waitForMeetingToStartBeforeJoining({
            currentUser, 
            operatorBusinessName, 
            selectedTutorId: tutor?._id,
            selectedTutor: tutor,
        }));
    }
    
    }, [  ( tutor?.meetingId === "" ), loadUsers ]);

function toggleTeach(){
    if ( session ) {
        if ( videoModalModeOn ){
            Validations.warn( 'Recording In Progress. To end this teaching session, please stop the recording.' );
            return;
        }
        if ( fullMeetingStage ){
            setFullMeetingStage(false); 
        }
        setSession(false);
        setHideMeetingStage(false);
        dispatch( endMeeting({ tutor, currentUser }) ); 
        dispatch( loadUsers() );
        dispatch( loadMeetings() );
        navigate(`/${operatorBusinessName}/LessonPlan/classRoom/${tutor?._id}/thankyou`)
    } else {
        setSession(true);
        setHideMeetingStage(false);
        dispatch( startMeeting( { meetingProps, currentUser } )); 
        dispatch( loadUsers() );
    }
};

const toggleRoomSize = () => {
    if ( roomSize === 2) {
    roomSize = 0;
    }
    let newSize = roomSize;

    newSize += 1;
    setRoomSize( newSize );
};

const resetAllStartSettings = () => {
    if ( hideMeetingStage ){
        setHideMeetingStage(false);
    }
};

const resetAllStopSettings = () => {
    if ( videoModalModeOn ){
    setVideoModalMode(false);
    }
};

const hidePopUpWindow = () => {
    if ( ! hideMeetingStage ) {
    setHideMeetingStage(true);
    } else {
    setHideMeetingStage(false);
    }
};

const toggleMeetingPanel = () => {
    setMeetingPanel( !meetingPanel );
};

function handleRedirectionsOnPageLoad( currentUser, classRoomId, operatorBusinessName, paidSession ){
    if ( currentUser && !currentUser?.userIsValidated ) {  
        navigate(`/${operatorBusinessName}/LessonPlan/invite/userverification/classRoom/${classRoomId}`); 
    } 
    if ( paidSession?.numberOfSessions === session?.totalNumberOfSessions  && session?.typeOfSession === "Package" && currentUser?.role === "Student" ) { 
    return <Redirect to={`/${operatorBusinessName}/mycourses`} noThrow />;
    }
};

function joinMeetingAfterWaitingForTheMeetingToStart(){
    return ( currentUser?.role === role.Student 
    && ( tutor && ( tutor?.meetingId !== "" )   
        && tutor?.meetingId === currentUser?.meetingId )
    );
};

function reJoinCurrentMeetingIfUserDisconnectedMistakenly(){
    return ( currentUser?.meetingId === meetingId 
    && tutor && tutor?.meetingId === meetingId 
        && currentUser?.lessonInProgress );
};

function waitingForTheCurrentMeetingToStart(){
    return ( currentUser?.role === role.Student 
    && ( tutor?.meetingId === "" ));
};
return {
    currentMeetingId,
    hideMeetingStage,
    fullMeetingStage,
    videoModalModeOn,
    meetingPanel,
    toggleMeetingPanel: () => toggleMeetingPanel(),
    setHideMeetingStage: ( value ) => setHideMeetingStage( value ),
    setVideoModalMode: ( value ) => setVideoModalMode( value ),
    session,
    roomSize,
    currentLesson, 
    currentCourse,
    toggleTeach,
    toggleRoomSize,
    resetAllStartSettings,
    resetAllStopSettings,
    hidePopUpWindow
}; }

export default useUsersHook;