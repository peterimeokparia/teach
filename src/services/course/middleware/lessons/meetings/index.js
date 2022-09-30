import { role } from 'services/course/helpers/PageHelpers';
import { navigate, Redirect } from '@reach/router';
import { addMeetingEventToUsersCalendar } from 'services/course/actions/classrooms';
import { setItemInSessionStorage, getItemFromSessionStorage } from 'services/course/helpers/ServerHelper';
import { loadMeetings, waitForMeetingToStartBeforeJoining } from 'services/course/actions/meetings';
import { updateCurrentTutor } from 'services/course/actions/classrooms';
import { loadCourses, selectCourseFromLessonPlanCourseDropDown } from 'services/course/actions/courses';
import { loadLessons, selectLessonFromLessonPlanDropDown } from 'services/course/actions/lessons';
import { setHideMeetingStage, setInSession } from 'services/course/actions/sessions';
import { loadUsers } from 'services/course/actions/users';
import { loadWhiteBoardData } from 'services/course/actions/whiteBoards';

export function handleLessonItems( lessonProps, store ) {
    let { selectedCourse, selectedLesson, tutor, currentCourse, currentLesson, meeting  } = lessonProps;

    if ( selectedCourse ) {
        setItemInSessionStorage('selectedCourse', selectedCourse );
    }

    if ( selectedLesson ) {
        setItemInSessionStorage('selectedLesson', selectedLesson );
    }
  
    store.dispatch( loadWhiteBoardData() );
    store.dispatch( loadUsers() );
    store.dispatch( loadMeetings() );
    store.dispatch( loadCourses() );
  
    if ( tutor ){
        store.dispatch( updateCurrentTutor( tutor ));
    }

    if ( currentCourse ) {
        store.dispatch( loadLessons( currentCourse?._id ) );
    }
  
    if ( meeting && meeting?._id && currentCourse && currentLesson ) {
        store.dispatch( selectCourseFromLessonPlanCourseDropDown( currentCourse ) );
        store.dispatch( selectLessonFromLessonPlanDropDown( currentLesson ) );
    }
}

export function handleCurrentLesson( meetingProps, store ) {
    let { inSession, operatorBusinessName, tutor, currentUser } = meetingProps;

    if ( currentUser ) {
        handleRedirectionsOnPageLoad( meetingProps );
    }
  
    if ( ( joinMeetingAfterWaitingForTheMeetingToStart( meetingProps ) || reJoinCurrentMeetingIfUserDisconnectedMistakenly( meetingProps ) ) && !inSession ) {
        store?.dispatch( setInSession(true) );
        store?.dispatch( setHideMeetingStage(false) );
        
        if ( getItemFromSessionStorage( 'meetingId' ) ) {
            sessionStorage.removeItem( 'meetingId' );
        }

        store?.dispatch( addMeetingEventToUsersCalendar( meetingProps ) );
        return;
    };
  
    if ( waitingForTheCurrentMeetingToStart() ) {
        store?.dispatch(waitForMeetingToStartBeforeJoining({
            currentUser, 
            operatorBusinessName, 
            selectedTutorId: tutor?._id,
            selectedTutor: tutor,
        }));
    }
}

const waitingForTheCurrentMeetingToStart = ( meetingProps ) => { 
     let { currentUser, tutor } = meetingProps;

    return ( currentUser?.role === role.Student 
      && ( tutor?.meetingId === "" ));
};

const handleRedirectionsOnPageLoad = ( meetingProps ) => {
    let { currentUser, classRoomId, operatorBusinessName } = meetingProps;

    if ( currentUser && !currentUser?.userIsValidated ) {  
        navigate(`/${operatorBusinessName}/LessonPlan/invite/userverification/classRoom/${classRoomId}`); 
    } 
    return <Redirect to={`/${operatorBusinessName}/mycourses`} noThrow />;
};

const joinMeetingAfterWaitingForTheMeetingToStart = ( meetingProps ) => {
    let { currentUser, tutor } = meetingProps;

    return ( currentUser?.role === role.Student 
        && ( tutor && ( tutor?.meetingId !== "" )   
        && tutor?.meetingId === currentUser?.meetingId )
    ); 
};

const reJoinCurrentMeetingIfUserDisconnectedMistakenly = ( meetingProps ) => {
    let { currentUser, tutor, meetingId } = meetingProps;

    return ( currentUser?.meetingId === meetingId 
      && tutor && tutor?.meetingId === meetingId 
        && currentUser?.lessonInProgress );
};
    