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
import notifications from './notifications';
import exams from './exams';
import questions from './questions';
import assignments from './assignments';

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
    classrooms, 
    operators, 
    grades, 
    attendance, 
    notifications,
    exams,
    questions,
    assignments
};

export default combineReducers( reducers );


