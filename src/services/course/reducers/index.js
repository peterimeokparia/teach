import { combineReducers } from 'redux';
import courses from './Courses';
import lessons from './Lessons';
import app from './App';
import streams from './Streams';
import users from './Users';
import purchases from './Purchases';
import meetings from './Meetings';
import emails from './Emails';
import sessions from './Sessions';
import calendar from './Calendar';
import events from './Event';
import classrooms from './ClassRooms';
import operators from './Operators';
import grades from './Grades';
import attendance from './Attendance';
import notifications from './Notifications';
import exams from './Exams';
import questions from './Questions';
import assignments from './Assignments';
import timeLines from './TimeLines';
import onlineQuestions from './OnlineQuestions';
import onlineAnswers from './OnlineAnswers';
import onlineComments from './OnlineComments';
import hasRecordingStarted from './Video';
import onlineQuestionsEmailSubscriptions from './OnlineQuestionsEmailSubscription';
import onlineQuestionsPushSubscriptions from './OnlineQuestionsPushSubscription';
import failedNotifications from './FailedNotifications'; 

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
failedNotifications
};

export default combineReducers( reducers );


