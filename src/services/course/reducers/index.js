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
import classrooms from './ClassRooms';
import operators from './Operators';
import grades from './Grades';
import attendance from './Attendance';
import notifications from './Notifications';
import exams from './Exams';
import questions from './Questions';
import assignments from './Assignments';
import timeLines from './TimeLines';

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
assignments,
timeLines
};

export default combineReducers( reducers );


