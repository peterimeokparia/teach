import { getItemFromSessionStorage } from 'services/course/helpers/ServerHelper';
import { getselectedTutor } from 'services/course/pages/ClassRoomPage/components/CourseLessonDropDownComponent/helpers';
import { automateEventCreation } from 'services/course/pages/CalendarPage/helpers/events';
import { eventEnum } from 'services/course/pages/CalendarPage/helpers';
import moment from 'moment';

export const initializeMeetingProps = ( meetingEvent, store ) => {
  let selectedTutor = getselectedTutor( Object.values(store?.getState()?.users?.users), store?.getState()?.classrooms?.currentTutor?._id );
  let currentMeeting = Object.values( store?.getState()?.meetings?.meetings )?.find( meeting => meeting?._id === selectedTutor?.meetingId );
  let meeting = ( meetingEvent?._id ) ? meetingEvent : currentMeeting;
  let currentUser = meetingEvent?.currentUser;
  let userId = currentUser?._id;
  let operatorBusinessName = (meetingEvent?.operatorBusinessName) ? meetingEvent?.operatorBusinessName : getItemFromSessionStorage('operatorBusinessName');
  let operator = Object.values( store.getState()?.operators?.operators)?.find(operator => operator?.businessName === operatorBusinessName );
  let operatorId = (operator?._id) ? operator?._id : currentUser?.operatorId ;
  let users = Object.values( store?.getState()?.users?.users )?.filter( users => users?.operatorId === currentUser?.operatorId );
  let meetingId = ( meeting?._id ) ? meeting?._id : selectedTutor?.meetingId;
  let meetingStartTime = meetingEvent?.timeStarted; 
  let courseId = meetingEvent?.courseId;
  let lessonId = meetingEvent?.lessonId;
  let courseTitle = meetingEvent?.courseTitle;
  let lessonTitle = meetingEvent?.lessonTitle;
  let calendars = Object.values( store?.getState()?.calendar?.calendars )?.filter( calendar => calendar?.operatorId === currentUser?.operatorId );
  let title =  ( courseTitle && lessonTitle ) ? `${courseTitle}_${lessonTitle}_${meetingId}_${selectedTutor?.firstname}` : `${selectedTutor?.firstname}_${meetingId}`;
  let location = `${selectedTutor?.firstname} classroom`;
  let recurringEvent = false;
  let allDay = false;
  let startDateTime = moment(meetingStartTime)?.local(true);
  let durationHrs = 1;
  let testAdminUsers =  [ userId, '603d37814967c605df1bb450', '6039cdc8560b6e1314d7bccc' ]; // refactor
  let pushNotificationSubscribers = Object.values( store?.getState()?.notifications?.pushNotificationSubscribers )?.filter( subscriber => subscriber?.operatorId === meeting?.operator?._id );
  let event = { title, location, recurringEvent, allDay, startDateTime, courseId, lessonId };
  let notesConfig = { meetingId, userId, title, markDownContent: "", notesUrl: "", videoUrl: "" }; 
  let newCalendarEventData = automateEventCreation( event, meetingId, durationHrs  );
  let  eventProps = { calendarEventData: {...newCalendarEventData, courseId, lessonId }, testAdminUsers, calendarEventType: eventEnum.NewEvent,
                    calendars, user: currentUser, users, userId, courseId, lessonId, pushNotificationSubscribers, operatorId };
    return { 
        selectedTutor, currentMeeting, meeting, currentUser, userId, operatorBusinessName, operator, operatorId, users, meetingId,
        meetingStartTime, courseId, lessonId, courseTitle, lessonTitle, calendars, title, location, recurringEvent, allDay, startDateTime,
        durationHrs, testAdminUsers, pushNotificationSubscribers, event, notesConfig, newCalendarEventData, eventProps
    };
};