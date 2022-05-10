import { combineReducers } from 'redux';
import courses from './courses';
import lessons from './lessons';
import app from './app';
import streams from './streams';
import users from './users';
import purchases from './purchases';
import meetings from './meetings';
import emails from './emails';
import sessions from './sessions';
import calendar from './calendar';
import events from './event';
import classrooms from './classrooms';
import operators from './operators';
import grades from './grades';
import attendance from './attendance';
import notifications from './notifications';
import exams from './exams';
import questions from './questions';
import assignments from './assignments';
import timeLines from './timelines';
import onlineQuestions from './onlinequestions';
import onlineAnswers from './onlineanswers';
import onlineComments from './onlinecomments';
import hasRecordingStarted from './video';
import onlineQuestionsEmailSubscriptions from './onlinequestionsemailsubscription';
import onlineQuestionsPushSubscriptions from './onlinequestionspushsubscription';
import failedNotifications from './failednotifications'; 
import logs from './logforteach';
import formFields from './formfields';
import formFieldAnswers from './formfieldanswers';
import whiteBoardData from './whiteboards';
import meetingNotes from './meetingNotes';
import logins from './logins';
import onlineSurveys from './onlinesurveys';
import formFieldPoints from './formquestionpoints';
import timers from './countdowntimer';
import formBuilders from './formbuilders';
import institutions from './institutions';
import classGrades from './classgrades';
import notes from './notes';
import missedQuestions from './missedanswers';
import fullTextSearches from './fulltextsearches';
import outcomes from './outcomes';

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
    outcomes
};

export default combineReducers( reducers );


