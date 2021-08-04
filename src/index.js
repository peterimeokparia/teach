import ReactDOM from 'react-dom';

import { 
createStore, 
applyMiddleware, 
compose } from 'redux';

import { 
Provider } from 'react-redux';

import {
loadUsers, 
lastLoggedInUser } from 'services/course/actions/users';

import {
loadMeetings } from 'services/course/actions/meetings';

import {
loadAttendance } from 'services/course/actions/attendance';

import {
loadGrades } from 'services/course/actions/grades';

import {
loadOperators } from 'services/course/actions/operator';

import {
loadCourses } from 'services/course/actions/courses';

// import {
// loadLessons } from 'services/course/actions/lessons';

import {
loadSessions } from 'services/course/actions/sessions';

import {
loadClassRooms } from 'services/course/actions/classrooms';

import {
loadSubscribedPushNotificationUsers } from 'services/course/actions/notifications';

import {
loadQuestions } from 'services/course/actions/questions';

import {
loadAllCalendars } from 'services/course/actions/calendar';

import {
loadAllEvents } from 'services/course/actions/event';

import {
loadTimeLines } from 'services/course/actions/timelines';

import {
loadOnlineQuestions } from 'services/course/actions/onlinequestions';

import {
loadOnlineAnswers } from 'services/course/actions/onlineanswers';

import {
loadOnlineComments } from 'services/course/actions/onlinecomments';

import { 
subscriptions } from 'services/course/middleware/subscriptions';

import { 
calendar } from 'services/course/middleware/calendar';

import { 
classrooms } from 'services/course/middleware/classrooms';

import { 
courses } from 'services/course/middleware/courses';

import {
events } from 'services/course/middleware/events';

import { 
users } from 'services/course/middleware/users';

import { 
sessions } from 'services/course/middleware/sessions';

import {
grades } from 'services/course/middleware/grades';

import {
loadFailedPushNotifications } from 'services/course/actions/failedpushnotifications';

import {
loadFailedEmailNotifications } from 'services/course/actions/failedemailnotifications';

import {
loadLogs } from 'services/course/actions/logforteach';

import App from './App';
import reducer from 'services/course/reducers';
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
    subscriptions, 
    calendar,
    classrooms,
    courses,
    events,
    sessions,
    grades ),
  // other store enhancers if any
);

export const store = createStore(
  reducer, 
  enhancer
);

//store.dispatch(loadFailedPushNotifications());
//store.dispatch(loadFailedEmailNotifications());
store?.dispatch(loadCourses());
store.dispatch(loadOnlineComments());
store.dispatch(loadLogs());
store.dispatch(loadOnlineAnswers());
store.dispatch(loadOnlineQuestions());
store.dispatch(loadAllEvents());
store.dispatch(loadTimeLines());
store.dispatch(loadSubscribedPushNotificationUsers());
store.dispatch(loadQuestions());
store.dispatch(loadMeetings());
store.dispatch(loadAttendance());
store.dispatch(loadGrades());
store.dispatch(loadOperators());
store.dispatch(loadUsers());
store.dispatch(lastLoggedInUser());
//store.dispatch( loadLessons());
store.dispatch(loadSessions());
store.dispatch(loadClassRooms());
store.dispatch(loadAllCalendars());

Modal.setAppElement('#root');
//const portalRoot = document.getElementById("portal");

ReactDOM.render( 
 <Provider store={store}> 
    <App />  
  </Provider>, 
  document.querySelector('#root')
);
