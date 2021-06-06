import React from 'react';

import ReactDOM from 'react-dom';

import { 
createStore, 
applyMiddleware, 
compose } from 'redux';

import { 
Provider } from 'react-redux';

import {
loadUsers, 
lastLoggedInUser } from 'Services/course/Actions/Users';

import {
loadMeetings } from 'Services/course/Actions/Meetings';

import {
loadAttendance } from 'Services/course/Actions/Attendance';

import {
loadGrades } from 'Services/course/Actions/Grades';

import {
loadOperators } from 'Services/course/Actions/Operator';

import {
loadCourses } from 'Services/course/Actions/Courses';

import {
loadSessions } from 'Services/course/Actions/Sessions';

import {
loadClassRooms } from 'Services/course/Actions/ClassRooms';

import {
loadSubscribedPushNotificationUsers } from 'Services/course/Actions/Notifications';

import {
loadQuestions } from 'Services/course/Actions/Questions';

import {
loadAllCalendars } from 'Services/course/Actions/Calendar';

import {
loadAllEvents } from 'Services/course/Actions/Event';

import {
loadTimeLines } from 'Services/course/Actions/TimeLines';

import {
loadOnlineQuestions } from 'Services/course/Actions/OnlineQuestions'; 

import {
loadOnlineAnswers } from 'Services/course/Actions/OnlineAnswers'; 

import {
loadOnlineComments } from 'Services/course/Actions/OnlineComments'; 

import { 
notifications } from 'Services/course/MiddleWare/notifications';

import { 
saveAuthToken } from 'Services/course/MiddleWare/users';

import {
loadFailedPushNotifications } from 'Services/course/Actions/FailedPushNotifications'; 

import {
loadFailedEmailNotifications } from 'Services/course/Actions/FailedEmailNotifications'; 

import App from './App';
import reducer from 'Services/course/reducers';
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

const enhancer = composeEnhancers(
  applyMiddleware(
    thunk, 
    saveAuthToken, 
    notifications),
  // other store enhancers if any
);

const store = createStore(
  reducer, 
  enhancer
);

store.dispatch(loadFailedPushNotifications());
store.dispatch(loadFailedEmailNotifications());
store.dispatch(loadOnlineComments());
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
store.dispatch(loadCourses());
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
