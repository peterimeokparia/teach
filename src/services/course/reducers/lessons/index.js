import produce from 'immer';

import { 
ADD_NEW_LESSON_SUCCESS, 
ADD_NEW_LESSON_BEGIN,            
ADD_NEW_LESSON_ERROR, 
LOAD_LESSONS_BEGIN, 
LOAD_LESSONS_SUCCESS, 
LOAD_LESSONS_ERROR,
SAVE_LESSON_SUCCESS, 
SAVE_LESSON_BEGIN, 
SAVE_LESSON_ERROR, 
RESET_LESSON_ERROR, 
DELETE_LESSON_SUCCESS,  
SET_LESSON_MARKDOWN, 
TOGGLE_BOARD_OR_EDITOR,
SELECTED_LESSON_URL,
LESSON_IN_PROGRESS,
LESSONPLAN_DROPDOWN_LESSON,
SELECTED_LESSONPLAN_LESSON,
LESSONPLAN_URL,
LESSONPLAN_COURSE } from 'services/course/actions/lessons';

const initialState = {
    lessons: {},
    videoUrl:{},
    lessonPlanUrl:{},
    course:{},
    selectedLessonPlanLesson:{},
    selectedLessonFromLessonPlanDropDown:{},
    saveLessonInProgress: false,
    onSaveLessonError: null,
    lessonsLoading: false,
    onLessonsLoadingError: null,
    toggleTeachBoardOrEditor: false,
    currentVideoUrl: {},
    lessonStarted: false,
};

const reducer = produce((draft, action) => {
    switch(action.type){

        case ADD_NEW_LESSON_BEGIN:
        case SAVE_LESSON_BEGIN:
            draft.saveLessonInProgress = true;
            draft.onSaveLessonError = null;
        return;
        case ADD_NEW_LESSON_SUCCESS:
        case SAVE_LESSON_SUCCESS:    
            draft.saveLessonInProgress = false;
            draft.onSaveLessonError = null;
            draft.lessons[action.payload._id] = action.payload; 
            draft.saveLessonInProgress = false;
        return;
        case ADD_NEW_LESSON_ERROR:
        case SAVE_LESSON_ERROR:
            draft.saveLessonInProgress = false;    
            draft.onSaveLessonError = action.payload;
        return;
        case LOAD_LESSONS_BEGIN:
            draft.lessonsLoading = true;
            draft.onLessonsLoadingError = null;
        return;
        case LOAD_LESSONS_SUCCESS:
             draft.lessonsLoading = false;
             draft.onLessonsLoadingError = null;
             action.payload?.forEach( lesson => {
                draft.lessons[lesson._id] = lesson;
             });  
        return;
        case LOAD_LESSONS_ERROR:
             draft.onLessonsLoadingError = action.error;
             draft.lessonsLoading = false;
        return; 
        case SET_LESSON_MARKDOWN:
             if ( draft.lessons[action.payload.teachObject?._id] ) {
                draft.lessons[action.payload.teachObject?._id].markDownContent = action.payload.markDownContent; 
             }
        return;
        case RESET_LESSON_ERROR:
             draft.onSaveLessonError = null;
       return; 
       case DELETE_LESSON_SUCCESS:
            delete draft.lessons[action.payload?._id];
       return; 
       case TOGGLE_BOARD_OR_EDITOR:
            draft.toggleTeachBoardOrEditor = !draft.toggleTeachBoardOrEditor;
       return;
       case SELECTED_LESSON_URL:
            draft.currentVideoUrl[ action.payload.lesson?._id ] = action.payload.videoUrl;
      return;
      case  LESSON_IN_PROGRESS:
            draft.lessonStarted = !draft.lessonStarted;
      return;
      case SELECTED_LESSONPLAN_LESSON:
           draft.selectedLessonPlanLesson = action.payload;
      return;
      case LESSONPLAN_URL:
           draft.lessonPlanUrl = action.payload;
      return;
      case LESSONPLAN_COURSE:
          draft.course = action.payload;
     return;
     case LESSONPLAN_DROPDOWN_LESSON:
          draft.selectedLessonFromLessonPlanDropDown = action.payload;   
     return; 
     default:
          
    }
}, initialState);

export default reducer;
