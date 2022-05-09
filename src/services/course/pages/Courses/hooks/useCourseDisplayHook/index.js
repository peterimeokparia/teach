import { 
useState } from 'react';

import { 
navContent } from 'services/course/pages/components/NavigationHelper';

import {
role } from 'services/course/helpers/PageHelpers';

import { 
toast } from 'react-toastify';

import {
handleLessonNotes } from 'services/course/pages/Notes/helpers';

import Swal from 'sweetalert2';
import moment from 'moment';
import { navigate } from '@reach/router';

function useCourseDisplayHook( props ) {

  const [ fileToRemove, setFileToRemove ] = useState( undefined );
  const [ lessonItem, setLessonItem  ] = useState( undefined )

  let { 
        currentUser,
        course,
        courses,
        lessons,
        selectedTutorId,
        setCurrentLesson,
        setLessonPlanUrl,
        previewMode,
        selectedLessonPlanLesson,
        saveLesson,
        setItemInSessionStorage,
        deleteFileByFileName,
        togglePreviewMode,
        users,
        calendars,
        calendar,
        addCalendar,
        operatorBusinessName,
        operator,
        courseId,
        lessonId,
        classRoomId,
        startLesson, 
        event,
        allEvents,
        addNotes,
        loadAllNotes,
        studentsNote,
        tutorsNote
  } = props;


  const onMatchListItem = ( match, listItem ) => {
    if( match ){
        setLessonItem( listItem );
        setCurrentLesson( listItem );
        setLessonPlanUrl(`/${operatorBusinessName}/LessonPlan/${course?._id}/${listItem._id}/${listItem.title}`);
        setItemInSessionStorage('currentLesson', listItem);

        if ( previewMode && (currentUser?.role === role.Tutor) && (!listItem?.introduction || listItem?.introduction === "") ) {
            const msg = "Please enter a lesson introduction.";
            
            Swal.fire(msg);
            return false;
        }
    }
}; 

const setPreviewEditMode = () => {
    if ( ! selectedLessonPlanLesson ) {
        toast.error("Please click on the lesson link.");
        return;  
    }
    togglePreviewMode();
};

if ( fileToRemove ) {
    selectedLessonPlanLesson.files = selectedLessonPlanLesson?.files?.filter( files => files !== fileToRemove );
    saveLesson( selectedLessonPlanLesson );
    deleteFileByFileName( fileToRemove?.split('/files/')[1]);       
}

const navigationContent = navContent( currentUser, operatorBusinessName, currentUser?.role,  "Student" ).users;  
const selectedCourse =  courses?.find(course => course?._id === courseId );
const lessonsByCourseId = lessons?.filter( lesson => lesson?.courseId === courseId );
const lesson = lessons?.find( lsn => lsn?._id === lessonId );

const calendarProps = {
  selectedCourse,
  lessonsByCourseId,
  courseId,
  lessonId,
  users,
  calendars,
  calendar,
  addCalendar,
  operatorBusinessName,
  operator
};

const formProps = {
  operatorBusinessName,
  currentUser,
};

const lessonProps = {
  operatorBusinessName,
  currentUser,
  courseId,
  lessonId: lessonItem?._id,
  calendars,
  calendar,
  lesson: lessonItem,
  lessonTitle: lessonItem?.title,
  title: `${selectedCourse?.name}: ${lessonItem?.title}`,
  selectedCourse, 
  selectedTutorId: selectedCourse?.createdBy,
  courseTitle: selectedCourse?.name,
  location: ``,
  recurringEvent: false,
  allDay: false,
  startDateTime: moment(Date.now())?.local(true),
  duration: 1,
  testAdminUsers: [ currentUser?._id, '603d37814967c605df1bb450', '6039cdc8560b6e1314d7bccc' ], // refactor - create admin groups & roles etc
};

const lessonNoteProps = {
    currentUser,
    title: lessonItem?.title,
    courseId,
    lessonId,
    userId: currentUser?._id,
    operatorId: currentUser?.operatorId,
    eventId: event?._id,
    addNotes,
    loadAllNotes
};


function startLessonSession(){

  const currentEvent = allEvents?.find( event => event?.courseId === courseId 
                          && event?.lessonId === lessonItem?._id 
                          && event?.userId === currentUser?._id);


  if ( !currentEvent ) {

    startLesson( lessonProps );

  }

  if ( currentUser?.role === role.Student && !studentsNote ) {

    handleLessonNotes( lessonNoteProps )
  }

  if ( currentUser?.role === role.Tutor && !tutorsNote ) {

    handleLessonNotes( lessonNoteProps )
  }

  navigate(`/${operatorBusinessName}/lessonplan/course/${courseId}/lesson/${lessonItem?._id}`)
}


return {
  lessonItem,
  onMatchListItem, 
  setPreviewEditMode,
  navigationContent,
  selectedCourse,
  lessonsByCourseId,
  fileToRemove,
  lessonItem,
  setFileToRemove,
  setLessonItem,
  calendarProps,
  lessonProps,
  formProps,
  startLessonSession
}; }

export default useCourseDisplayHook;