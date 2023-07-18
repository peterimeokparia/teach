import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import { loadUsers, lastLoggedInUser } from 'services/course/actions/users/index.js';
import { loadMeetings } from 'services/course/actions/meetings/index.js';
import { loadAttendance } from 'services/course/actions/attendance/index.js';
import { loadGrades } from 'services/course/actions/grades/index.js';
import { loadOperators } from 'services/course/actions/operator/index.js';
import { loadCourses } from 'services/course/actions/courses/index.js';
import { loadLessons } from 'services/course/actions/lessons/index.js';
import { loadSessions } from 'services/course/actions/sessions/index.js';
import { loadClassRooms } from 'services/course/actions/classrooms/index.js';
import { loadSubscribedPushNotificationUsers } from 'services/course/actions/notifications/index.js';
import { loadQuestions } from 'services/course/actions/questions/index.js';
import { loadAllCalendars } from 'services/course/actions/calendar/index.js';
import { loadAllEvents } from 'services/course/actions/event/index.js';
import { loadTimeLines } from 'services/course/actions/timelines/index.js';
import { loadOnlineQuestions } from 'services/course/actions/onlinequestions/index.js';
import { loadOnlineAnswers } from 'services/course/actions/onlineanswers/index.js';
import { loadOnlineComments } from 'services/course/actions/onlinecomments/index.js';
import { calendar } from 'services/course/middleware/calendar/index.js';
import { classrooms } from 'services/course/middleware/classrooms/index.js';
import { courses } from 'services/course/middleware/courseInsights/courses/index.js';
import { events } from 'services/course/middleware/events/index.js';
import { users } from 'services/course/middleware/users/index.js';
import { sessions } from 'services/course/middleware/sessions/index.js';
import { grades } from 'services/course/middleware/grades/index.js';
import { builder } from 'services/course/middleware/builder/index.js';
import { editor } from 'services/course/middleware/editor/index.js';
import { fullTextSearches } from 'services/course/middleware/fullTextSearches/index.js';
import { pageSpecificSearch } from 'services/course/middleware/fullTextSearches/pageSpecificSearch/index.js';
import { lessons } from 'services/course/middleware/lessons/index.js';
import { notes } from 'services/course/middleware/notes/index.js';
import { onlineQuestions } from 'services/course/middleware/onlineQuestions/index.js';
import { loadWhiteBoardData } from "services/course/actions/whiteBoards/index.js";
import { loadMeetingNotes } from "services/course/actions/meetingNotes/index.js";
import { loadLoginSessions } from "services/course/actions/logins/index.js";
import { loadFormFields } from "services/course/actions/formfields/index.js";
import { loadFormFieldAnswers } from "services/course/actions/formfieldanswers/index.js";
import { loadFormFieldPoints } from "services/course/actions/formquestionpoints/index.js";
import { loadTestTimers } from 'services/course/actions/countdowntimer/index.js';
import { loadLogs } from 'services/course/actions/lessons/logforteach/index.js';
import { loadFormBuilders } from 'services/course/actions/formbuilders/index.js';
import { loadOutcomes } from 'services/course/actions/outcomes/index.js';
import { loadInstitutions } from 'services/course/actions/institutions/index.js';
import { loadAllNotes } from 'services/course/actions/notes/index.js';
import { loadFullTextSearchContent } from 'services/course/actions/fulltextsearches/index.js';
import { loadEquations } from 'services/course/actions/equations/index.js';
import { loadExplainerOnlineQuestionAnswers } from 'services/course/actions/onlinequestionexplainanswer/index.js';
import { loadQuestionInsights } from 'services/course/actions/questioninsights/index.js';
import { loadStudentQuestionInsights } from 'services/course/actions/studentQuestionInsights/index.js';
import { loadOutcomeInsights } from 'services/course/actions/outcomeInsights/index.js';
import { loadInsights } from 'services/course/actions/insights/index.js';
import { loadCourseOutcomeInsights } from 'services/course/actions/courseOutcomeInsights';
// import { // subscriptions } from 'services/course/middleware/subscriptions/index.js';
// import { // loadFailedPushNotifications } from 'services/course/actions/failedpushnotifications/index.js';
// import {// loadFailedEmailNotifications } from 'services/course/actions/failedemailnotifications/index.js';

import App from './App/index.js';
import reducer from 'services/course/reducers/index.js';
import thunk from 'redux-thunk';
import Modal from 'react-modal';
import dotenv from 'dotenv';
import './index.css';

dotenv.config();

const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      trace: true
}) : compose;


export const enhancer = composeEnhancers(
  applyMiddleware(
    thunk, 
    users,
    calendar,
    classrooms,
    courses,
    events,
    sessions,
    grades,
    builder, 
    editor,
    fullTextSearches, 
    pageSpecificSearch,
    lessons,
    notes,
    onlineQuestions,
    //subscriptions, 
    )
  // other store enhancers if any
);

export const store = createStore(
  reducer, 
  enhancer
);

let { dispatch } = store;

dispatch(loadExplainerOnlineQuestionAnswers());
dispatch(loadOutcomes());
dispatch(loadFullTextSearchContent());
dispatch(loadAllNotes());
dispatch(loadCourses());
dispatch(loadInstitutions());
dispatch(loadFormBuilders());
dispatch(loadTestTimers());
dispatch(loadFormFieldPoints());
dispatch(loadFormFieldAnswers());
dispatch(loadFormFields());
dispatch(loadLoginSessions());
dispatch(loadMeetingNotes());
dispatch(loadWhiteBoardData());
dispatch(loadOnlineComments());
dispatch(loadLogs());
dispatch(loadOnlineAnswers());
dispatch(loadOnlineQuestions());
dispatch(loadAllEvents());
dispatch(loadTimeLines());
dispatch(loadSubscribedPushNotificationUsers());
dispatch(loadQuestions());
dispatch(loadMeetings());
dispatch(loadAttendance());
dispatch(loadGrades());
dispatch(loadOperators());
dispatch(loadUsers());
dispatch(lastLoggedInUser());
dispatch(loadLessons());
dispatch(loadSessions());
dispatch(loadClassRooms());
dispatch(loadAllCalendars());
dispatch(loadEquations());
dispatch(loadQuestionInsights());
dispatch(loadStudentQuestionInsights());
dispatch(loadInsights());
dispatch(loadOutcomeInsights());
dispatch(loadCourseOutcomeInsights());
//dispatch(loadFailedPushNotifications());
//dispatch(loadFailedEmailNotifications());

Modal.setAppElement('#root');
//const portalRoot = document.getElementById("portal");

ReactDOM.render( 
 <Provider store={store}> 
    <App />  
  </Provider>, 
  document.querySelector('#root')
);
