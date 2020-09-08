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


export default combineReducers({ courses, lessons, app, streams, users, purchases, meetings, emails});


