import React from 'react';

import ReactDOM from 'react-dom';

import { 
createStore, 
applyMiddleware, 
compose } from 'redux';

import { 
Provider } from 'react-redux';

import { 
saveAuthToken } from './saveAuthToken';

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
loadAllCalendarEvents } from 'Services/course/Actions/Calendar';

import {
loadTimeLines } from 'Services/course/Actions/TimeLines';

import App from './App';
import reducer from 'Services/course/reducers';
import thunk from 'redux-thunk'
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
  applyMiddleware(thunk, saveAuthToken),
  // other store enhancers if any
);

const store = createStore(
  reducer, 
  enhancer
);

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
store.dispatch(loadAllCalendarEvents());


Modal.setAppElement('#root');

//const portalRoot = document.getElementById("portal");

ReactDOM.render( 
 <Provider store={store}> 
    <App />  
  </Provider>, 
  document.querySelector('#root')
);
