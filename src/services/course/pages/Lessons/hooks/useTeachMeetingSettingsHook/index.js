import { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { navigate } from '@reach/router';
import { loadMeetings, startMeeting, endMeeting } from 'services/course/actions/meetings';
import { handleCurrentLessonMeeting, handleCurrentLessonItems } from 'services/course/actions/lessons';
import { setHideMeetingStage, setInSession, setFullMeetingStage, setVideoModalMode, toggleMeetingPanel, setIconOnColor } from 'services/course/actions/sessions';
import { loadUsers } from 'services/course/actions/users';
import { Validations } from 'services/course/helpers/Validations';
import { getItemFromSessionStorage } from 'services/course/helpers/ServerHelper';

function useTeachMeetingSettingsHook( teachMeetingProps ) {
  let { currentMeetingId, currentUser, classRoomId, selectedCourse, selectedLesson, loadMeetingsByMeetingId, 
    hideMeetingStage, fullMeetingStage, videoModalModeOn, inSession, iconOnColor, meetingPanel } = teachMeetingProps;

  const dispatch = useDispatch();

  let [ roomSize, setRoomSize ] = useState(1);  
  let existingTutor = Object.values( useSelector( state => state.users.users ) )?.find( usr => usr?._id === classRoomId );
  let tutor = getCurrentTutor(  existingTutor );
  let meetings = useSelector( state => state.meetings.meetings );
  let meeting = Object.values( meetings )?.find( meeting => meeting?._id === tutor?.meetingId );
  let meetingId = meeting?._id;
  let currentCourse = Object.values( useSelector( state => state?.courses?.courses ) )?.find( course => course?._id === meeting?.courseId );
  let currentLesson = Object.values( useSelector( state => state?.lessons?.lessons ) )?.find( lesson => lesson?._id === meeting?.lessonId );
  let allUsersPaidSessions = useSelector( state => Object.values(state?.sessions?.sessions) );  
  let currentCourseSessions = allUsersPaidSessions?.filter( session => session?.courseId === currentCourse?._id);
  let operatorBusinessName = getItemFromSessionStorage('operatorBusinessName');
  let meetingUrl = `/${operatorBusinessName}/LessonPlan/classRoom/${tutor?._id}`;
  let checkTutorsMeetingId = tutor?.meetingId === "";
  
  let  meetingProps = useMemo(() => {
    return { userId: currentUser?._id, courseId: currentCourse?._id, lessonId: currentLesson?._id,
      sessions: currentCourseSessions, invitees: [], currentUser, courseTitle: currentCourse?.name,
      lessonTitle: currentLesson?.title, meetingUrl,usersWhoJoinedTheMeeting:[]
    }; 
  }, [ currentUser, currentCourse, currentLesson, meetingUrl, currentCourseSessions ]);

  useEffect(() => {  
    let payload = {
      selectedCourse, selectedLesson, tutor, currentCourse, meeting
    };

     dispatch(handleCurrentLessonItems( payload ));
  }, [currentCourse, currentLesson, dispatch, meeting, selectedCourse, selectedLesson, tutor ]);

  useEffect(() => {
    dispatch( loadUsers() ); 

    let payload = {
      currentUser, classRoomId, operatorBusinessName, allUsersPaidSessions, tutor, meetingId, inSession
    };

     dispatch(handleCurrentLessonMeeting( payload ))
  }, [ checkTutorsMeetingId, dispatch ]);

function getCurrentTutor( currentTutor ){
  let tutor = currentTutor;

  if ( !tutor?._id ){
     return tutor[0];
  }
  return tutor;
}

function toggleTeach(){
  if ( inSession ) {
    if ( videoModalModeOn ){
      Validations.warn( 'Recording In Progress. To end this teaching session, please stop the recording.' );
      return;
    }
    if ( fullMeetingStage ){
      dispatch( setFullMeetingStage(false) ); 
    }
    dispatch( setInSession(false) );
    dispatch( setHideMeetingStage(false) );
    dispatch( endMeeting({ tutor, currentUser, loadMeetingsByMeetingId, operatorBusinessName }) ); 
    dispatch( loadUsers() );
    dispatch( loadMeetings() );
    navigate(`/${operatorBusinessName}/LessonPlan/classRoom/${tutor?._id}/thankyou`); // change route
  } else {
    dispatch( setInSession(true) );
    dispatch( setHideMeetingStage(false) );
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
    dispatch( setHideMeetingStage(false) );
  }
};

const resetAllStopSettings = () => {
  if ( videoModalModeOn ){
    dispatch( setVideoModalMode(false) );
  }
};

const hidePopUpWindow = () => {
  if ( ! hideMeetingStage ) {
    dispatch( setHideMeetingStage(true) );
  } else {
    dispatch( setHideMeetingStage(false) );
  }
};

return {
  currentMeetingId: ( meetingId !== undefined || meetingId !== ""  ) ? meetingId : currentMeetingId,
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