import produce from 'immer';

import { 
ADD_NEW_LESSON_DETAIL_LESSONPLAN_SUCCESS, 
ADD_NEW_LESSON_DETAIL_LESSONPLAN_BEGIN,            
ADD_NEW_LESSON_DETAIL_LESSONPLAN_ERROR, 
LOAD_LESSON_DETAIL_LESSONPLANS_BEGIN, 
LOAD_LESSON_DETAIL_LESSONPLANS_SUCCESS, 
LOAD_LESSON_DETAIL_LESSONPLANS_ERROR,
SAVE_LESSON_DETAIL_LESSONPLAN_SUCCESS, 
SAVE_LESSON_DETAIL_LESSONPLAN_BEGIN, 
SAVE_LESSON_DETAIL_LESSONPLAN_ERROR, 
RESET_LESSON_DETAIL_LESSONPLAN_ERROR, 
DELETE_LESSON_DETAIL_LESSONPLAN_SUCCESS,  
SET_LESSON_DETAIL_LESSONPLAN_MARKDOWN, 
SELECTED_LESSON_DETAIL_LESSONPLAN_VIDEO_URL,
LESSON_DETAIL_LESSONPLAN_IN_PROGRESS,
SELECTED_LESSON_DETAIL_LESSONPLAN_LESSON,
LESSON_DETAIL_LESSONPLAN_URL,
LESSON_DETAIL_LESSONPLAN_COURSE,
HANDLE_CURRENT_LESSON_DETAIL_LESSONPLAN_MEETING,
HANDLE_CURRENT_LESSON_DETAIL_LESSONPLAN_ITEMS } from 'services/course/actions/lessonDetailLessonPlan';

const initialState = {
    lessonDetailLessonPlan: {},
    lessonDetailLessonPlanVdeoUrl:{},
    lessonDetailLessonPlanUrl:{},
    course:{},
    selectedLessonPlanLesson:{},
    selectedLessonFromLessonPlanDropDown:{},
    saveLessonDetailLessonInProgress: false,
    onSaveLessonDetailLessonError: null,
    lessonDetailLessonPlanLessonLoading: false,
    onLessonDetailLessonLoadingError: null,
    toggleTeachBoardOrEditor: false,
    currentLessonDetailLessonVideoUrl: {},
    lessonDetailLessonPlanLessonStarted: false,
    lessonDetailLessonPlanLessonMeetingProps: {},
    lessonDetailLessonPlanLessonProps: {}
};

const reducer = produce((draft, action) => {
    switch(action.type){
     case ADD_NEW_LESSON_DETAIL_LESSONPLAN_BEGIN:
     case SAVE_LESSON_DETAIL_LESSONPLAN_BEGIN:
          draft.saveLessonDetailLessonInProgress = true;
          draft.onSaveLessonDetailLessonError = null;
     return;
     case ADD_NEW_LESSON_DETAIL_LESSONPLAN_SUCCESS:
     case SAVE_LESSON_DETAIL_LESSONPLAN_SUCCESS:    
          draft.saveLessonDetailLessonInProgress = false;
          draft.onSaveLessonDetailLessonError = null;
          draft.lessonDetailLessonPlan[action.payload._id] = action.payload; 
          draft.saveLessonDetailLessonInProgress = false;
     return;
     case ADD_NEW_LESSON_DETAIL_LESSONPLAN_ERROR:
     case SAVE_LESSON_DETAIL_LESSONPLAN_ERROR:
          draft.saveLessonDetailLessonInProgress = false;    
          draft.onSaveLessonDetailLessonError = action.payload;
     return;
     case LOAD_LESSON_DETAIL_LESSONPLANS_BEGIN:
          draft.lessonDetailLessonPlanLessonLoading = true;
          draft.onLessonDetailLessonLoadingError = null;
     return;
     case LOAD_LESSON_DETAIL_LESSONPLANS_SUCCESS:
          draft.lessonDetailLessonPlanLessonLoading = false;
          draft.onLessonDetailLessonLoadingError = null;
          action.payload?.forEach( lesson => {
               draft.lessonDetailLessonPlan[lesson._id] = lesson;
          });  
     return;
     case LOAD_LESSON_DETAIL_LESSONPLANS_ERROR:
          draft.onLessonDetailLessonLoadingError = action.error;
          draft.lessonDetailLessonPlanLessonLoading = false;
     return; 
     case SET_LESSON_DETAIL_LESSONPLAN_MARKDOWN:
          if ( draft.lessonDetailLessonPlan[action.payload.teachObject?._id] ) {
               draft.lessonDetailLessonPlan[action.payload.teachObject?._id].markDownContent = action.payload.markDownContent; 
          }
     return;
     case RESET_LESSON_DETAIL_LESSONPLAN_ERROR:
          draft.onSaveLessonDetailLessonError = null;
     return; 
     case DELETE_LESSON_DETAIL_LESSONPLAN_SUCCESS:
          delete draft.lessonDetailLessonPlan[action.payload?._id];
     return; 
     case SELECTED_LESSON_DETAIL_LESSONPLAN_VIDEO_URL:
          draft.currentLessonDetailLessonVideoUrl[ action.payload.lesson?._id ] = action.payload.lessonDetailLessonPlanVdeoUrl;
     return;
     case  LESSON_DETAIL_LESSONPLAN_IN_PROGRESS:
          draft.lessonDetailLessonPlanLessonStarted = !draft.lessonDetailLessonPlanLessonStarted;
     return;
     case SELECTED_LESSON_DETAIL_LESSONPLAN_LESSON:
          draft.selectedLessonPlanLesson = action.payload;
     return;
     case LESSON_DETAIL_LESSONPLAN_URL:
          draft.lessonDetailLessonPlanUrl = action.payload;
     return;
     case HANDLE_CURRENT_LESSON_DETAIL_LESSONPLAN_MEETING:
          draft.lessonDetailLessonPlanLessonMeetingProps = action.payload;
     return;
     case HANDLE_CURRENT_LESSON_DETAIL_LESSONPLAN_ITEMS:
          draft.lessonDetailLessonPlanLessonProps = action.payload;
     return;
     case LESSON_DETAIL_LESSONPLAN_COURSE:
          draft.course = action.payload;
     return;
     default:
          
    }
}, initialState);

export default reducer;
