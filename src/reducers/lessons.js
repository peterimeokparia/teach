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
DELETE_LESSON_BEGIN, 
DELETE_LESSON_ERROR, 
SET_LESSON_MARKDOWN, 
TOGGLE_BOARD_OR_EDITOR,
SELECTED_LESSON_URL,
LESSON_IN_PROGRESS} from '../services/course/actions';



const initialState = {
    lessons: {},
    saveLessonInProgress: false,
    onSaveLessonError: null,
    lessonsLoading: false,
    onLessonsLoadingError: null,
    toggleTeachBoardOrEditor: false,
    currentVideoUrl: '',
    lessonStarted: false,
};

const reducer = produce((draft, action) => {
    switch(action.type){
        // case ADD_NEW_POD:
        //   draft.pods.push(action.payload)   
        // return;
        case ADD_NEW_LESSON_BEGIN:
        case SAVE_LESSON_BEGIN:
            draft.saveLessonInProgress = true;
            draft.onSaveLessonError = null;
        return;
        case ADD_NEW_LESSON_SUCCESS:
        case SAVE_LESSON_SUCCESS:    
            console.log(action.payload)
            //draft.lessons.push( action.payload );
            draft.lessons[action.payload._id] = action.payload; 
            draft.saveLessonInProgress = false;
        return;
        case ADD_NEW_LESSON_ERROR:
        case SAVE_LESSON_ERROR:
            draft.saveLessonInProgress = false;    
            draft.onSaveLessonError = action.error;
        return;
        case LOAD_LESSONS_BEGIN:
            draft.lessonsLoading = true;
        return;
        case LOAD_LESSONS_SUCCESS:
             draft.lessonsLoading = false;
             action.payload.forEach( lesson => {
                draft.lessons[lesson._id] = lesson;
              });  
        return;
        case LOAD_LESSONS_ERROR:
             draft.onLessonsLoadingError = action.error;
             draft.lessonsLoading = false;
        return; 
        case SET_LESSON_MARKDOWN:
             draft.lessons[action.payload.lesson._id].markDown = action.payload.markDown; 
        return;
        case RESET_LESSON_ERROR:
            draft.onSaveLessonError = null;
       return; 
       case DELETE_LESSON_SUCCESS:
            delete draft.lessons[action.payload._id];
       return; 
       case TOGGLE_BOARD_OR_EDITOR:
            draft.toggleTeachBoardOrEditor = !draft.toggleTeachBoardOrEditor;
       return;
       case SELECTED_LESSON_URL:
            draft.currentVideoUrl = action.payload;
      return;
      case  LESSON_IN_PROGRESS:
            draft.lessonStarted = !draft.lessonStarted;
      return; 
      default:
    return;
    }
    
}, initialState);


export default reducer;