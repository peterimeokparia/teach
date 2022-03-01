import { 
navigate } from '@reach/router';

import {
getCalendarColor, eventEnum } from 'services/course/pages/CalendarPage/helpers';

import { 
role } from 'services/course/helpers/PageHelpers';

import {
v4 as uuidv4 } from 'uuid';
  
import { 
formTypes } from 'services/course/pages/FormBuilder/helpers';

import { 
elementMeta } from "services/course/pages/QuestionsPage/helpers";

import Calendar from 'services/course/helpers/Calendar';
import Swal from 'sweetalert2';

export const links = (selectedStudents, courseId) => {
    return [ 
      { id: "SavedAnswers", title: "Saved Answers", path:`student/${ selectedStudents?._id }/savedanswers`, _id: selectedStudents?._id }, 
      { id: "Grades", title: "Grades", path:`student/${ selectedStudents?._id }/grades`, _id: selectedStudents?._id }, 
      { id: "Attendance", title: "Attendance", path: `student/${ selectedStudents?._id  }/attendance`, _id: selectedStudents?._id }, 
      { id: "Session", title: "Session", path: `student/${ selectedStudents?._id  }/sessions/courseId/${courseId}`, _id: selectedStudents?._id },
      { id: "Logins", title: "Logins", path:`student/${ selectedStudents?._id }/logins`, _id: selectedStudents?._id }, 
    ];
};

export const goToOnlineSurvey = ( operatorBusinessName, user ) => {
  let uuid = generateUuid();

  let userId = user?._id, 
      formUuId = uuid,
      formName = `dailysurvey_${uuid}`,
      formType = formTypes?.report

  navigate(`/${operatorBusinessName}/${formType}/${formName}/${formUuId}/${userId}`);
};

export const goToForms = ( formProps ) => {

  let {
    operatorBusinessName, 
    formName, 
    currentEventId,
    calendarEventType, 
    currentUser,
  } = formProps;

  const existingFormInTakingState =  takeExistingFormBuilderForm( formProps );

  if ( existingFormInTakingState && (existingFormInTakingState?.formType === formTypes.quizzwithpoints || existingFormInTakingState?.formType === formTypes.homework ) ) {

    navigate(`/${operatorBusinessName}/formBuilder/${existingFormInTakingState?.formType}/${existingFormInTakingState?.formName}/${existingFormInTakingState?.courseId}/${existingFormInTakingState?.lessonId}/${existingFormInTakingState?.formUuId}/${currentUser?._id}/${elementMeta.state.Taking}/${currentEventId}`);

  }

  if ( existingFormInTakingState && (existingFormInTakingState?.formType === formTypes.examwithpoints  )  ) {

    navigate(`/${operatorBusinessName}/formBuilder/${existingFormInTakingState?.formType}/${existingFormInTakingState?.formName}/${existingFormInTakingState?.courseId}/${existingFormInTakingState?.formUuId}/${currentUser?._id}/${elementMeta.state.Taking}/${currentEventId}`);
   
  }

  if ( existingFormInTakingState && (existingFormInTakingState?.formType === formTypes.report  )  ) {

    navigate(`/${operatorBusinessName}/formEventBuilder/${existingFormInTakingState?.formType}/${existingFormInTakingState?.formName}/${existingFormInTakingState?.formUuId}/${currentUser?._id}/${elementMeta.state.Taking}/${currentEventId}`);

  }

}


export function addUsersToMeeting( meetingProps, enableTeachPlatform ) {

  let {
    setAddUsers,
    listOfStudents, 
    selectedTutorId: selectedUserId, 
    operatorBusinessName, 
    sessions, 
    operator
  } = meetingProps;

  Swal.fire({
    title: 'Please Add Meeting Attendees',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Add Attendees',
    confirmButtonColor: '#673ab7',
    cancelButtonText: 'No Attendees'
  }).then( (response) => {
      if ( response?.value ) {       
          setAddUsers( true )
      } else {
        enableTeachPlatform({ listOfStudents, selectedTutorId: selectedUserId, operatorBusinessName, sessions, operatorId: operator?._id } );
        navigate(`/${operatorBusinessName}/LessonPlan/classRoom/${selectedUserId}`);
      }
  });
};

export const studentOption = ( students ) => students?.map(item => ( { value: item,  label: item?.firstname } ));

export function goToCalendar( props, user, eventType ) {

  let {
    users,
    calendars,
    calendar,
    operator,
    addCalendar,
    operatorBusinessName
  } = props;

  let personalCalendar = calendars?.find( cal => cal?.calendarEventType === eventType && cal?.userId === user?._id);

  if ( personalCalendar ) {
  
      navigate(`/${operatorBusinessName}/schedule/${eventType}/calendar/${personalCalendar._id}/user/${user._id}`);
      return;

  } else {

      addCalendar( { calendar: new Calendar( calendarConfig( user, eventType, calendars, users, operator  ) ).calendar()} )
      .then(calendar => {

          if ( calendar ) {
            navigateUserAfterGeneratingNewCalendar( operatorBusinessName, eventType, calendar, user );
          }
      })
      .catch( error => console.log( error ));
  }
};

export function goToTimeLine( operatorBusinessName, eventType, user ){
  navigate(`/${operatorBusinessName}/schedule/${eventType}/timeline/${user._id}`);
};

export function viewCurrentUsersCourseList( operatorBusinessName, userId ){
  navigate(`/${operatorBusinessName}/coursestaught/${userId}`); 
};

export function gotToLessonPlan( operatorBusinessName, user ){ 
  navigate(`/${operatorBusinessName}/classroom/${user._id}`);
};

export function getCoursesSubscribedTo( tutor ){
  return tutor?.courses;
};

export function goToMeeting( goToMeetingProps, user ){
    
  let {
    enableTeachPlatform,
    usersAttendingMeeting,
    operatorBusinessName,
    sessions, 
    operator 
  } = goToMeetingProps;

  enableTeachPlatform({ listOfStudents: usersAttendingMeeting, selectedTutorId: user._id , operatorBusinessName, sessions, operator } )
  navigate(`/${operatorBusinessName}/LessonPlan/classRoom/${user._id}`);
};

export function getCoursesCreatedByUser( courses, tutor ){
  return courses?.
      filter( course => course?.createdBy === tutor?._id );
};

export function addStudentsToMeeting( addStudentsToMeetingProps, selectedUser, currentUser ){

  let {
    enableTeachPlatform,
    setSelectedUser,
    setAddUsers,
    listOfStudents, 
    operatorBusinessName, 
    sessions, 
    operator
  } = addStudentsToMeetingProps;

  setSelectedUser( selectedUser );

  if ( currentUser?.role === role.Tutor ) {

      let meetingProps = {
        setAddUsers,
        listOfStudents, 
        selectedTutorId: selectedUser._id , 
        operatorBusinessName, 
        sessions, 
        operator
      };

      if ( addUsersToMeeting( { ...meetingProps, selectedTutorId: selectedUser._id }, enableTeachPlatform ) ) {
          enableTeachPlatform({ listOfStudents: [], selectedTutorId: selectedUser._id, operatorBusinessName, sessions, operator } );
          navigate(`/${operatorBusinessName}/LessonPlan/classRoom/${selectedUser._id}`);
      }     

  } else {

      navigate(`/${operatorBusinessName}/LessonPlan/classRoom/${selectedUser._id}`);
  }

};

export function generateUuid(){
  const uuid = uuidv4();
  return uuid;
};

function calendarConfig( tutor, calendarType, calendars, users, operator  ){
  return {
    users,
    userId: tutor?._id,
    calendarEventType: calendarType,
    operatorId: operator?._id,
    firstName: tutor?.firstname,
    color: getCalendarColor( calendars )
  }
};

function navigateUserAfterGeneratingNewCalendar( operatorBusinessName, calendarEventType, calendar, user ){ 
  navigate(`/${operatorBusinessName}/schedule/${calendarEventType}/calendar/${calendar._id}/user/${user._id}`);
};

function getFormType(calendarEventType){
  switch (calendarEventType) {
    case eventEnum.ReportForms:
      return formTypes.report
    case eventEnum.QuizzForms:
      return formTypes.quizzwithpoints
    default:
      break;
  }
}

function takeExistingFormBuilderForm( formProps ){ 

    let {
      operatorBusinessName, 
      currentUser, 
      events, 
      currentEventId,
      calendarEventType, 
      addNewFormBuilder,
      formBuilders
    } = formProps;

    const currentEventObject = events?.find( event => event?._id === currentEventId );
    const selectedFormBuilderObject = currentEventObject?.schedulingData[0];
    const selectedFormBuilder = formBuilders?.find( formBuilder => formBuilder?.formName === selectedFormBuilderObject?.formName && formBuilder?.userId === currentUser?._id && formBuilder?.state === elementMeta.state.Taking );

    if ( selectedFormBuilder && selectedFormBuilder?.state === elementMeta.state.Taking ) { 
   
      return selectedFormBuilder;

    }

    const formName = selectedFormBuilderObject?.formName;
    const formDisplayName = selectedFormBuilderObject?.formDisplayName;
    const formUuId = selectedFormBuilderObject?.formUuId;
    const formId = selectedFormBuilderObject?.formId;
    const courseId = selectedFormBuilderObject?.courseId;
    const lessonId = selectedFormBuilderObject?.lessonId;
    const createdBy = selectedFormBuilderObject?.createdBy;
    const createDateTime = selectedFormBuilderObject?.createDateTime;
    const eventId = currentEventId;
    const status = selectedFormBuilderObject?.status;
    const state = selectedFormBuilderObject?.state;
    
    let newBuilder = {
      operatorBusinessName: operatorBusinessName,
      formType: getFormType(calendarEventType),
      formDisplayName,
      formName,
      courseId,
      lessonId,
      formUuId: generateUuid(),
      formId,
      createDateTime,
      takingDateTime: Date.now(),
      createdBy,
      userId: currentUser?._id,
      status: elementMeta.status.InProgress,
      state: elementMeta.state.Taking,
      eventId
    };

   addNewFormBuilder( newBuilder );

  return true;
 
    // if ( !currentTimer?._id && timer?._id ){

    //   addTime({ ...timer, userId, role: currentUser?.role });

    // } else {

    //   saveTime( { ...currentTimer,  testTime: timer?.testTime } );

    // }
  
};