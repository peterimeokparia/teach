import { updateUser } from 'services/course/api';
import { navigate } from '@reach/router';
import { sendEmails } from 'services/course/actions/emails';
import { ADD_MEETING_EVENT_TO_CALENDAR, updateCurrentTutor } from 'services/course/actions/classrooms';
import { getSelectedPushNotificationUsers } from 'services/course/actions/notifications';
import { emailMessageOptions, validationBeforeEnablingTeachPlatform } from 'services/course/pages/ClassRoomPage/components/CourseLessonDropDownComponent/helpers';
import { role } from 'services/course/helpers/PageHelpers';
import { setItemInSessionStorage, getItemFromSessionStorage } from 'services/course/helpers/ServerHelper';
import { LAST_LOGGEDIN_USER } from 'services/course/actions/users';
import { directUsersToMeeting, waitingForMeetingToStartBeforeJoining } from 'services/course/middleware/classrooms/helpers/platform';
import { initializeTeachPlatform, intializeNewMeetingProps } from 'services/course/middleware/classrooms/helpers/teachPlatformProps';

export const addNewClassRoomIdToStudentsAndTutors = ( classRoom, store ) => {
    classRoom?.classRoomUsers?.forEach(classroomuser => {
        let student = classroomuser?.value;

        updateUser( { ...student, classRooms: [ ...student?.classRooms, classRoom?.classroom?._id  ] });
    });
    let tutor = { ...classRoom.user, classRooms: [ ...classRoom.user.classRooms, classRoom?.classroom?._id ]};

    updateUser( tutor );
    store?.dispatch({ type: LAST_LOGGEDIN_USER, payload: tutor }); 
}; 

export const enableTeachPlatform = ( meeting, store  ) => {
    let {
        listOfStudents,
        sessions,
        operatorBusinessName,
        operator,
        selectedTutorId,
        selectedLessonFromLessonPlanDropDown,
        selectedCourseFromLessonPlanCourseDropDown,
        pushNotificationSubscribers,
        currentUser,
        users,
        selectedTutor,
        url
      } = initializeTeachPlatform( meeting, store );

    let enablePlatformProps = {
        selectedTutorId, selectedTutor, currentUser, listOfStudents, sessions, operatorBusinessName, operator, meeting,
        selectedLessonFromLessonPlanDropDown, selectedCourseFromLessonPlanCourseDropDown, pushNotificationSubscribers, store
    };

    let meetingProps = {
        userId: currentUser?._id, courseId: selectedCourseFromLessonPlanCourseDropDown?._id, lessonId: selectedLessonFromLessonPlanDropDown?._id,
        sessions, courseTitle: selectedCourseFromLessonPlanCourseDropDown?.name, lessonTitle: selectedLessonFromLessonPlanDropDown?.title,
        meetingUrl: url?.lessonPlanUrl, usersWhoJoinedTheMeeting:[],
    }; 

    validationBeforeEnablingTeachPlatform( selectedCourseFromLessonPlanCourseDropDown, currentUser, role, listOfStudents );

    directUsersToMeeting( enablePlatformProps, meetingProps );
};

export function waitForMeetingBeforeJoining( props, store ) {
    waitingForMeetingToStartBeforeJoining( { ...props, store } );
};

export function getUsersCurrentMeetingStatus( currentUser, store ){
    if ( getItemFromSessionStorage('meetingId') ) {
        return;
    }
    if ( currentUser && currentUser?.role === role.Tutor && currentUser?.meetingId !== "" ) {
        setItemInSessionStorage( 'meetingId', currentUser?.meetingId );
        return;
    }
};

function handleMeeting( meeting, currentuser, inviteeSessionUrl, nameOfLessonInProgress, lessonInProgress, lesson, course ){

    if ( currentuser ) {

        let currentUsersMeetings = currentuser?.meetings ?? [];
            
        updateUser({ ...currentuser,
            inviteeSessionUrl,
            nameOfLessonInProgress, 
            lessonInProgress,
            lesson: lesson?._id,
            course: course?._id,
            meetingId: meeting?._id, 
            meetings: [ ...currentUsersMeetings, meeting?._id  ]
    });  

    }
   

    if (  meeting?.invitees?.length > 0 ) {      
        meeting.invitees?.forEach(user => {
            updateUser({...user, 
                inviteeSessionUrl,
                nameOfLessonInProgress, 
                lessonInProgress,
                lesson: lesson?._id,
                course: course?._id,
                meetingId: meeting?._id, 
                meetings: [ ...user?.meetings, meeting?._id ]
            });   
        });
    }
};

function sendEmailToMeetingInvitees( listOfStudents, url, store ){
    if ( listOfStudents?.length === 0 ) return;

    listOfStudents?.forEach( student => {
        let messageOptions = emailMessageOptions( student, url );

        store.dispatch(sendEmails(
            messageOptions?.from,
            student?.email,
            messageOptions?.subject,
            messageOptions?.messageBody,
            messageOptions?.userId
        ));
    });
};

export function handleAddingNewMeeting( meeting, store ){

    try {
        let {
            listOfStudents,
            sessions,
            operatorBusinessName,
            operator,
            selectedTutorId,
            selectedLessonFromLessonPlanDropDown,
            selectedCourseFromLessonPlanCourseDropDown,
            pushNotificationSubscribers,
            currentUser,
            users,
            selectedTutor,
            url
          } = initializeTeachPlatform( meeting, store );

        
        handleMeeting( meeting, selectedTutor, meeting?.meetingUrl, selectedLessonFromLessonPlanDropDown?.title, true, selectedLessonFromLessonPlanDropDown, selectedCourseFromLessonPlanCourseDropDown );
        store.dispatch(getSelectedPushNotificationUsers( listOfStudents, pushNotificationSubscribers ));
        store.dispatch(updateCurrentTutor( { ...selectedTutor, meetingId: meeting?._id, lesson:selectedLessonFromLessonPlanDropDown?._id, course: selectedCourseFromLessonPlanCourseDropDown?._id } ));
        sendEmailToMeetingInvitees( listOfStudents, url?.lessonPageUrl, store );
        store.dispatch({ type: ADD_MEETING_EVENT_TO_CALENDAR, payload: { ...meeting, currentUser: { ...currentUser, meetingId: meeting?._id }, operatorBusinessName } });
        navigate( meeting?.meetingUrl );   
    } catch (error) {
        console.warn( error );
    } 
};

