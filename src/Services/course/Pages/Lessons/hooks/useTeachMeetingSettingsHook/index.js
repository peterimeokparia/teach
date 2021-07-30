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
startMeeting,
endMeeting } from 'Services/course/Actions/Meetings';

import { 
loadCourses, 
selectCourseFromLessonPlanCourseDropDown } from 'Services/course/Actions/Courses';

import { 
loadLessons,
selectLessonFromLessonPlanDropDown } from 'Services/course/Actions/Lessons';

import{
loadUsers } from 'Services/course/Actions/Users';
    
import { 
Validations } from 'Services/course/helpers/Validations';
    
function useTeachMeetingSettingsHook( users, currentUser, addNewMeeting, classRoomId, operatorBusinessName ) {
    const [ hideMeetingStage, setHideMeetingStage ] = useState(false);
    const [ fullMeetingStage, setFullMeetingStage ] = useState(false);
    const [ videoModalModeOn,  setVideoModalMode ] = useState(false);
    const [ session, setSession] = useState( false );  
    let [ roomSize, setRoomSize] = useState(1);  

    const dispatch = useDispatch();
    let tutor = users?.find( usr => usr?._id === classRoomId );
    let meetings = useSelector( state => state.meetings.meetings );
    let meeting = Object.values( meetings )?.find( meeting => meeting?._id === tutor?.meetingId );
    let currentCourse = Object.values( useSelector( state => state?.courses?.courses ) )?.find( course => course?._id === meeting?.courseId );
    let currentLesson = Object.values( useSelector( state => state?.lessons?.lessons ) )?.find( lesson => lesson?._id === meeting?.lessonId );
    let paidSessions = useSelector( state => Object.values(state?.sessions?.sessions) );
    let sessions = paidSessions?.filter( usersession => usersession?.courseId === currentCourse?._id);
    let meetingUrl = `http://localhost:3000/boomingllc/LessonPlan/classRoom/${currentUser?._id}`;

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
      timeStarted: Date.now(),
      timeEnded: Date.now(),
      usersWhoJoinedTheMeeting:[],
  }; 
  
  useEffect(() => {
      dispatch( loadUsers() );
      dispatch( loadMeetings() );
      dispatch( loadCourses() );

      if ( currentCourse ) {
          dispatch( loadLessons( currentCourse?._id ) );
      }

      if ( meeting && meeting?._id && currentCourse && currentLesson ) {
          dispatch( selectCourseFromLessonPlanCourseDropDown( currentCourse ) );
          dispatch( selectLessonFromLessonPlanDropDown( currentLesson ) );
      }
  }, [ loadMeetings, loadUsers, loadCourses, loadLessons ]);

  if ( currentUser ) {
    handleRedirectionsOnPageLoad( currentUser, classRoomId, operatorBusinessName, paidSessions );
  }

const toggleTeach = () => {
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
        dispatch(endMeeting({ tutor, currentUser })); 
        dispatch( loadUsers() );
        dispatch( loadMeetings() );
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

function handleRedirectionsOnPageLoad( currentUser, classRoomId, operatorBusinessName, paidSession ){
    if ( currentUser && !currentUser?.userIsValidated ) {  
        navigate(`/${operatorBusinessName}/LessonPlan/invite/userverification/classRoom/${classRoomId}`); 
    } 
    if ( paidSession?.numberOfSessions === session?.totalNumberOfSessions  && session?.typeOfSession === "Package" && currentUser?.role === "Student" ) { 
      return <Redirect to={`/${operatorBusinessName}/mycourses`} noThrow />;
    }
};
return {
    hideMeetingStage,
    fullMeetingStage,
    videoModalModeOn,
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

export default useTeachMeetingSettingsHook;