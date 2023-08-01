import produce from 'immer';

import { 
ADD_NEW_LESSON_DETAIL_LESSON_SUCCESS, 
ADD_NEW_LESSON_DETAIL_LESSON_BEGIN,            
ADD_NEW_LESSON_DETAIL_LESSON_ERROR, 
LOAD_LESSON_DETAIL_LESSONS_BEGIN, 
LOAD_LESSON_DETAIL_LESSONS_SUCCESS, 
LOAD_LESSON_DETAIL_LESSONS_ERROR,
SAVE_LESSON_DETAIL_LESSON_SUCCESS, 
SAVE_LESSON_DETAIL_LESSON_BEGIN, 
SAVE_LESSON_DETAIL_LESSON_ERROR, 
RESET_LESSON_DETAIL_LESSON_ERROR, 
DELETE_LESSON_DETAIL_LESSON_SUCCESS,  
SET_LESSON_DETAIL_LESSON_MARKDOWN, 
TOGGLE_BOARD_OR_EDITOR,
SELECTED_LESSON_DETAIL_LESSON_URL,
LESSON_DETAIL_LESSON_URL,
LESSON_DETAIL_LESSON_IN_PROGRESS,
SELECTED_LESSON_DETAIL_LESSON,
LESSON_DETAIL_LESSON_COURSE,
HANDLE_CURRENT_LESSON_DETAIL_LESSON_MEETING,
HANDLE_CURRENT_LESSON_DETAIL_LESSON_ITEMS } from 'services/course/actions/lessonDetail';

const initialState = {
    lessonDetail: {},
    lessonDetailVdeoUrl:{},
    lessonDetailPlanUrl:{},
    lessonDetailLessonUrl: {},
    course:{},
    selectedLessonDetailLesson:{},
    selectedLessonFromLessonPlanDropDown:{},
    saveLessonDetailLessonInProgress: false,
    onSaveLessonDetailLessonError: null,
    lessonDetailLessonLoading: false,
    onLessonDetailLessonLoadingError: null,
    toggleTeachBoardOrEditor: false,
    currentLessonDetailLessonVideoUrl: {},
    lessonDetailLessonStarted: false,
    lessonDetailLessonMeetingProps: {},
    lessonDetailLessonProps: {}
};

const reducer = produce((draft, action) => {
    switch(action.type){
     case ADD_NEW_LESSON_DETAIL_LESSON_BEGIN:
     case SAVE_LESSON_DETAIL_LESSON_BEGIN:
          draft.saveLessonDetailLessonInProgress = true;
          draft.onSaveLessonDetailLessonError = null;
     return;
     case ADD_NEW_LESSON_DETAIL_LESSON_SUCCESS:
     case SAVE_LESSON_DETAIL_LESSON_SUCCESS:    
          draft.saveLessonDetailLessonInProgress = false;
          draft.onSaveLessonDetailLessonError = null;
          draft.lessonDetail[action.payload._id] = action.payload; 
          draft.saveLessonDetailLessonInProgress = false;
     return;
     case ADD_NEW_LESSON_DETAIL_LESSON_ERROR:
     case SAVE_LESSON_DETAIL_LESSON_ERROR:
          draft.saveLessonDetailLessonInProgress = false;    
          draft.onSaveLessonDetailLessonError = action.payload;
     return;
     case LOAD_LESSON_DETAIL_LESSONS_BEGIN:
          draft.lessonDetailLessonLoading = true;
          draft.onLessonDetailLessonLoadingError = null;
     return;
     case LOAD_LESSON_DETAIL_LESSONS_SUCCESS:
          draft.lessonDetailLessonLoading = false;
          draft.onLessonDetailLessonLoadingError = null;
          action.payload?.forEach( lesson => {
               draft.lessonDetail[lesson._id] = lesson;
          });  
     return;
     case LOAD_LESSON_DETAIL_LESSONS_ERROR:
          draft.onLessonDetailLessonLoadingError = action.error;
          draft.lessonDetailLessonLoading = false;
     return; 
     case SET_LESSON_DETAIL_LESSON_MARKDOWN:
          if ( draft.lessonDetail[action.payload.teachObject?._id] ) {
               draft.lessonDetail[action.payload.teachObject?._id].markDownContent = action.payload.markDownContent; 
          }
     return;
     case RESET_LESSON_DETAIL_LESSON_ERROR:
          draft.onSaveLessonDetailLessonError = null;
     return; 
     case DELETE_LESSON_DETAIL_LESSON_SUCCESS:
          delete draft.lessonDetail[action.payload?._id];
     return; 
     case TOGGLE_BOARD_OR_EDITOR:
          draft.toggleTeachBoardOrEditor = !draft.toggleTeachBoardOrEditor;
     return;
     case SELECTED_LESSON_DETAIL_LESSON_URL:
          draft.currentLessonDetailLessonVideoUrl[ action.payload.lesson?._id ] = action.payload.lessonDetailVdeoUrl;
     return;
     case  LESSON_DETAIL_LESSON_IN_PROGRESS:
          draft.lessonDetailLessonStarted = !draft.lessonDetailLessonStarted;
     return;
     case SELECTED_LESSON_DETAIL_LESSON:
          draft.selectedLessonDetailLesson = action.payload;
     return;
     case HANDLE_CURRENT_LESSON_DETAIL_LESSON_MEETING:
          draft.lessonDetailLessonMeetingProps = action.payload;
     return;
     case HANDLE_CURRENT_LESSON_DETAIL_LESSON_ITEMS:
          draft.lessonDetailLessonProps = action.payload;
     return;
     case LESSON_DETAIL_LESSON_COURSE:
          draft.course = action.payload;
     return;
     case LESSON_DETAIL_LESSON_URL:
          draft.lessonDetailLessonUrl = action.payload;
     default:
          
    }
}, initialState);

export default reducer;
