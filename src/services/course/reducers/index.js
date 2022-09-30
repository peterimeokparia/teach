import { combineReducers } from 'redux';
import courses from './courses/index.js';
import lessons from './lessons/index.js';
import app from './app/index.js';
import streams from './streams/index.js';
import users from './users/index.js';
import purchases from './purchases/index.js';
import meetings from './meetings/index.js';
import emails from './emails/index.js';
import sessions from './sessions/index.js';
import calendar from './calendar/index.js';
import events from './event/index.js';
import classrooms from './classrooms/index.js';
import operators from './operators/index.js';
import grades from './grades/index.js';
import attendance from './attendance/index.js';
import notifications from './notifications/index.js';
import exams from './exams/index.js';
import questions from './questions/index.js';
import assignments from './assignments/index.js';
import timeLines from './timelines/index.js';
import onlineQuestions from './onlinequestions/index.js';
import onlineAnswers from './onlineanswers/index.js';
import onlineComments from './onlinecomments/index.js';
import hasRecordingStarted from './video/index.js';
import onlineQuestionsEmailSubscriptions from './onlinequestionsemailsubscription/index.js';
import onlineQuestionsPushSubscriptions from './onlinequestionspushsubscription/index.js';
import failedNotifications from './failednotifications/index.js'; 
import logs from './logforteach/index.js';
import formFields from './formfields/index.js';
import formFieldAnswers from './formfieldanswers/index.js';
import whiteBoardData from './whiteboards/index.js';
import meetingNotes from './meetingNotes/index.js';
import logins from './logins/index.js';
import onlineSurveys from './onlinesurveys/index.js';
import formFieldPoints from './formquestionpoints/index.js';
import timers from './countdowntimer/index.js';
import formBuilders from './formbuilders/index.js';
import institutions from './institutions/index.js';
import classGrades from './classgrades/index.js';
import notes from './notes/index.js';
import missedQuestions from './missedanswers/index.js';
import fullTextSearches from './fulltextsearches/index.js';
import outcomes from './outcomes/index.js';
import equations from './equations/index.js';
import draggableFormFields from './draggableFormFields/index.js';
import onlineQuestionsExplainerAnswers from './onlinequestionexplainanswer/index.js';
import questionInsights from './questioninsights/index.js';
import outcomeInsights from './outcomeInsights/index.js';
import studentQuestionInsights from './studentQuestionInsights/index.js';
import insights from './insights/index.js';

let reducers = { 
    courses, 
    lessons, 
    app, 
    streams, 
    users, 
    purchases, 
    meetings, 
    emails, 
    sessions, 
    calendar,
    events, 
    classrooms, 
    operators, 
    grades, 
    attendance, 
    notifications,
    exams,
    questions,
    assignments,
    timeLines,
    onlineQuestions,
    onlineAnswers,
    onlineComments,
    hasRecordingStarted,
    onlineQuestionsEmailSubscriptions,
    onlineQuestionsPushSubscriptions,
    failedNotifications,
    logs,
    formFields,
    whiteBoardData,
    meetingNotes,
    logins,
    onlineSurveys,
    formFieldAnswers,
    formFieldPoints,
    timers,
    formBuilders,
    institutions,
    classGrades,
    notes,
    missedQuestions,
    fullTextSearches,
    outcomes,
    equations,
    draggableFormFields,
    onlineQuestionsExplainerAnswers,
    questionInsights,
    outcomeInsights,
    studentQuestionInsights,
    insights
};

export default combineReducers( reducers );


