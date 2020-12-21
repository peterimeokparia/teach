import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
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
import classrooms from './classrooms';
import operators from './operators';
import grades from './grades';
import attendance from './attendance';

export default combineReducers({ courses, lessons, app, streams, users, purchases, meetings, emails, sessions, calendar, classrooms, operators, grades, attendance});


