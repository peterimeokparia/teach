import { navigate } from '@reach/router';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { navContent } from 'services/course/pages/components/NavigationHelper';
import { role } from 'services/course/helpers/PageHelpers';
import { toast } from 'react-toastify';
import { handleLessonNotes } from 'services/course/pages/Notes/helpers';
import { setSelectedSearchItem } from 'services/course/actions/fulltextsearches';
import { toggleConcepts } from 'services/course/actions/outcomes';
import { LESSONNOTES, STUDENTNOTES } from 'services/course/actions/notes';
import Swal from 'sweetalert2';
import moment from 'moment';

function useCourseDisplayHook( props ) {
  const [ fileToRemove, setFileToRemove ] = useState( undefined );
  const [ lessonItem, setLessonItem  ] = useState( undefined );
  const [ lessonNote, setLessonNote ] = useState( undefined );
  const [ studentsNote, setStudentsNote ] = useState( undefined );
  const [ toggleLessonItemDisplayCount, setToggleLessonItemDisplayCount ] = useState( 0 );
  const [ searchItemCollection, setSearchItemCollection ] = useState( undefined );
  const dispatch = useDispatch();

  let { currentUser, course, courses, lessons, setCurrentLesson, setLessonPlanUrl,
      previewMode, selectedLessonPlanLesson, saveLesson, setItemInSessionStorage, deleteFileByFileName,
      togglePreviewMode, users, calendars, calendar, addCalendar, operatorBusinessName, operator,
      courseId, startLesson, event, allEvents, allNotes, addNotes,loadAllNotes, searchItem, concepts } = props;

  useEffect( () => 
  { 
  }, []);

  useEffect( () => 
  { 
    loadAllNotes();   
  }, [ loadAllNotes ]);

  useEffect( () => 
  { 
    if ( allNotes?.length > 0 && lessonItem?._id && currentUser?._id ) {
      setStudentsNote( allNotes?.find( note => note?.lessonId === lessonItem?._id && note?.userId === currentUser?._id && note?.noteType === STUDENTNOTES ) ); 
    }
    if ( allNotes?.length > 0 && lessonItem?._id && currentUser?._id ) {
      setLessonNote( allNotes?.find( note => note?.lessonId === lessonItem?._id && note?.noteType === LESSONNOTES ) ); 
    }
  }, [ lessonItem, allNotes, currentUser?._id ]);

  useEffect(() => {
    if ( searchItem ) {
      setSearchItemCollection( lessonsByCourseId.filter(item => item?.title === searchItem?.title ) );
    }
  }, [ searchItem ]);

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
    if ( !lessonItem?._id ) {
        toast.error("Please click on the lesson link.");
        return;  
    }
    togglePreviewMode();
};

const lessonSelectionNavigationMessage = () => {
    if ( !lessonItem?._id ) {
        toast.error("Please click on the lesson link.");
        return;  
    }
};

if ( fileToRemove ) {
    selectedLessonPlanLesson.files = selectedLessonPlanLesson?.files?.filter( files => files !== fileToRemove );
    saveLesson( selectedLessonPlanLesson );
    deleteFileByFileName( fileToRemove?.split('/files/')[1]);       
}

const navigationContent = navContent( currentUser, operatorBusinessName, currentUser?.role,  "Student" ).users;  
const selectedCourse =  courses?.find(course => course?._id === courseId );
const lessonsByCourseId = lessons?.filter( lesson => lesson?.courseId === courseId );

const calendarProps = {
  selectedCourse,
  lessonsByCourseId,
  courseId,
  lessonId: lessonItem?._id,
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
    lessonId: lessonItem?._id,
    userId: currentUser?._id,
    operatorId: currentUser?.operatorId,
    eventId: event?._id,
    addNotes,
    loadAllNotes
};

function startLessonSession(){
  lessonSelectionNavigationMessage();

  const currentEvent = allEvents?.find( event => event?.courseId === courseId 
                          && event?.lessonId === lessonItem?._id 
                          && event?.userId === currentUser?._id);

  if ( !currentEvent ) {
    startLesson( lessonProps );
  }

  if ( currentUser?.role === role.Student && !studentsNote ) {
    handleLessonNotes( lessonNoteProps );
  }
  navigate(`/${operatorBusinessName}/lessonplan/course/${courseId}/lesson/${lessonItem?._id}`);
}


const handleSearch = (lesson) => {
    if ( lesson ) {
      dispatch( setSelectedSearchItem( lesson ) );
      //navigate(`/${operatorBusinessName}/tutor/${currentUser?._id}/courses/${courseId}/lesson/${lesson?._id}`);
    }    
};

const resetSelectedSearchItem = () => {
  setSearchItemCollection( undefined );
  dispatch( setSelectedSearchItem( undefined ) );
  if ( concepts ) {
    dispatch( toggleConcepts() );
  }
}

return {
  onMatchListItem, setPreviewEditMode,lessonsByCourseId, fileToRemove, lessonItem, navigationContent,
  toggleLessonItemDisplayCount, setToggleLessonItemDisplayCount, selectedCourse,
  calendarProps, setFileToRemove, setLessonItem, handleSearch,  resetSelectedSearchItem, setSearchItemCollection, 
  lessonProps, formProps, lessonNote, lessonSelectionNavigationMessage, startLessonSession, searchItemCollection, 
}; }

export default useCourseDisplayHook;