import express from 'express';
import http from 'http';
import cors from 'cors';
import fs, { readSync } from 'fs';
import fse from 'fs-extra';
import path from 'path';
import replaceExt from 'replace-ext';
import axios from 'axios';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import courseRoute from '../routes/courseRoute.js';
import lessonRoute from '../routes/lessonRoute.js';
import userRoute from '../routes/userRoute.js';
import meetingRoute from '../routes/meetingRoute.js';
import sessionRoute from '../routes/sessionRoute.js';
import emailRoute from '../routes/emailRoute.js';
import videoRoute from '../routes/videoRoute.js';
import fileRoute from '../routes/fileRoute.js';
import classRoomRoute from '../routes/classRoomRoute.js';
import operatorRoute from '../routes/operatorRoute.js';
import gradeRoute from '../routes/gradeRoute.js';
import attendanceRoute from '../routes/attendanceRoute.js';
import notificationRoute from '../routes/notificationRoute.js';
import examRoute from '../routes/examRoute.js';
import assignmentRoute from '../routes/assignmentRoute.js';
import questionRoute from '../routes/questionRoute.js';
import onlineQuestionRoute from '../routes/onlineQuestionRoute.js';
import onlineQuestionAnswersRoute from '../routes/onlineQuestionAnswersRoute.js';
import onlineQuestionAnswersCommentsRoute from '../routes/onlineQuestionAnswersCommentsRoute.js';
import calendarRoute from '../routes/calendarRoute.js';
import eventRoute from '../routes/eventRoute.js';
import timeLineRoute from '../routes/timeLineRoute.js';
import retryFailedOnlineQuestionsEmailNotificationsRoute from '../routes/retryFailedOnlineQuestionsEmailNotificationsRoute.js';
import retryFailedOnlineQuestionsPushNotificationsRoute from '../routes/retryFailedOnlineQuestionsPushNotificationsRoute.js';
import logForTeachRoute from '../routes/logForTeachRoute.js';
import questionFormRoute from '../routes/questionFormRoute.js'; 
import answerFormRoute from '../routes/answerFormRoute.js';
import formFieldRoute from '../routes/formFieldRoute.js';
import formFieldAnswersRoute from '../routes/formFieldAnswersRoute.js';
import configRoute from '../routes/configRoute.js';
import whiteBoardRoute from '../routes/whiteBoardRoute.js';
import meetingNotesRoute from '../routes/meetingNotesRoute.js';
import loginRoute from '../routes/loginRoute.js';
import onlineSurveyRoute from '../routes/onlineSurveyRoute.js';
import formQuestionPointsRoute from '../routes/formQuestionPointsRoute.js';
import countDownTimerFormRoute from '../routes/countDownTimerFormRoute.js';
import formBuilderRoute from '../routes/formBuilderRoute.js';
import reportFieldRoute from '../routes/reportFieldRoute.js';
import institutionRoute from '../routes/institutionRoute.js';  
import classGradeRoute from '../routes/classGradeRoute.js';
import notesRoute from '../routes/notesRoute.js';
import fullTextSearchRoute from '../routes/fullTextSearchRoute.js';
import outcomesRoute from '../routes/outcomesRoute.js';
import equationRoute from '../routes/equationRoute.js';
import onlineQuestionExplainAnswerRoute from '../routes/onlineQuestionExplainAnswerRoute.js';
import questionInsightsRoute from '../routes/questionInsightsRoute.js';
import studentQuestionInsightsRoute from '../routes/studentQuestionInsightsRoute.js';
import insightsRoute from '../routes/insightsRoute.js'
import outcomeInsightsRoute from '../routes/outcomeInsightsRoute.js';

// import dotenv from 'dotenv';
// dotenv.config({ path: '../../backend/.env' });

console.log( process.env.SENDGRIDAPIKEY);

const app = express();
const server = http.createServer(app);
const db = mongoose.connection;
const localPort = 9005;

//app.use('/static', express.static('public/backEnd'))
app.use('/static', express.static('public/videos'))

app.use(cors());

app.use(bodyParser.json({limit: '20mb', extended: true}))

app.use(bodyParser.urlencoded({limit: '20mb', extended: true}))

app.use('/api/v1/courses', courseRoute);

app.use('/api/v1/lessons', lessonRoute);

app.use('/api/v1/users', userRoute);

app.use('/api/v1/meetings', meetingRoute);

app.use('/api/v1/emails', emailRoute);

app.use('/api/v1/uploads', videoRoute);

app.use('/api/v1/fileUploads', fileRoute); 

app.use('/api/v1/sessions', sessionRoute);

app.use('/api/v1/classrooms', classRoomRoute);

app.use('/api/v1/operators', operatorRoute);

app.use('/api/v1/grades', gradeRoute);

app.use('/api/v1/attendance', attendanceRoute);

app.use('/api/v1/notifications', notificationRoute);

app.use('/api/v1/exams', examRoute);

app.use('/api/v1/assignments', assignmentRoute);

app.use('/api/v1/questions', questionRoute);

app.use('/api/v1/onlinequestions', onlineQuestionRoute);

app.use('/api/v1/onlinequestionexplainanswer', onlineQuestionExplainAnswerRoute);

app.use('/api/v1/onlineanswers', onlineQuestionAnswersRoute);

app.use('/api/v1/onlinecomments', onlineQuestionAnswersCommentsRoute);

app.use('/api/v1/calendar', calendarRoute);

app.use('/api/v1/event', eventRoute);

app.use('/api/v1/timelines', timeLineRoute); 

app.use('/api/v1/retryfailedonlinequestionsemailnotificationsqueue', retryFailedOnlineQuestionsEmailNotificationsRoute); 

app.use('/api/v1/retryfailedonlinequestionspushnotificationsqueue', retryFailedOnlineQuestionsPushNotificationsRoute);

app.use('/api/v1/logforteach', logForTeachRoute);

app.use('/api/v1/questionforms', questionFormRoute);

app.use('/api/v1/answerforms', answerFormRoute);

app.use('/api/v1/formfields', formFieldRoute); 

app.use('/api/v1/formfieldanswers', formFieldAnswersRoute); 

app.use('/api/v1/configs', configRoute); 

app.use('/api/v1/whiteboards', whiteBoardRoute);

app.use('/api/v1/meetingnotes', meetingNotesRoute);

app.use('/api/v1/logins', loginRoute);

app.use('/api/v1/onlinesurveys', onlineSurveyRoute);

app.use('/api/v1/formquestionpoints', formQuestionPointsRoute); 

app.use('/api/v1/testtimers', countDownTimerFormRoute);  

app.use('/api/v1/formbuilder', formBuilderRoute);

app.use('/api/v1/reportfield', reportFieldRoute);

app.use('/api/v1/institutions', institutionRoute);

app.use('/api/v1/classgrades', classGradeRoute);

app.use('/api/v1/notes', notesRoute);

app.use('/api/v1/fulltextsearch', fullTextSearchRoute); 

app.use('/api/v1/outcomes', outcomesRoute); 

app.use('/api/v1/equations', equationRoute); 

app.use('/api/v1/questioninsights', questionInsightsRoute);

app.use('/api/v1/outcomeinsights', outcomeInsightsRoute);

app.use('/api/v1/studentquestioninsights', studentQuestionInsightsRoute);

app.use('/api/v1/insights', insightsRoute);

mongoose.connect('mongodb+srv://dbuser:dbuser2020@cluster0.8heal.mongodb.net/teach?retryWrites=true&w=majority', {
   useNewUrlParser: true, 
   useUnifiedTopology: true,
   useCreateIndex: true,
   useFindAndModify: false
});

db.on("error", console.error.bind(console, "connection error:"));

db.once("open", function() {
  console.log("Connection Successful!");
});

app.get('/', (req, res) => {
   res.send('Hello and welcome to teach !!! A place where learning is fun, easy and simple and you can always ask for help!!!');
});

const serverObjects = {
   app,
   server
};

export default serverObjects;

