const express = require('express');
const http = require('http');
const cors = require('cors');
const fs = require('fs');
const fse = require('fs-extra');
const path = require('path');
const replaceExt = require('replace-ext');
const axios = require('axios');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const courseRoute = require('../routes/courseRoute.js');
const lessonRoute = require('../routes/lessonRoute.js');
const userRoute = require('../routes/userRoute.js');
const meetingRoute = require('../routes/meetingRoute.js');
const sessionRoute = require('../routes/sessionRoute.js');
const emailRoute = require('../routes/emailRoute.js');
const videoRoute = require('../routes/videoRoute.js');
const fileRoute = require('../routes/fileRoute.js');
const classRoomRoute = require('../routes/classRoomRoute.js');
const operatorRoute = require('../routes/operatorRoute.js');
const gradeRoute = require('../routes/gradeRoute.js');
const attendanceRoute = require('../routes/attendanceRoute.js');
const notificationRoute = require('../routes/notificationRoute.js');
const examRoute = require('../routes/examRoute.js');
const assignmentRoute = require('../routes/assignmentRoute.js');
const questionRoute = require('../routes/questionRoute.js');
const onlineQuestionRoute = require('../routes/onlineQuestionRoute.js');
const onlineQuestionAnswersRoute = require('../routes/onlineQuestionAnswersRoute.js');
const onlineQuestionAnswersCommentsRoute = require('../routes/onlineQuestionAnswersCommentsRoute.js');
const calendarRoute = require('../routes/calendarRoute.js');
const eventRoute = require('../routes/eventRoute.js');
const timeLineRoute = require('../routes/timeLineRoute.js');
const retryFailedOnlineQuestionsEmailNotificationsRoute = require('../routes/retryFailedOnlineQuestionsEmailNotificationsRoute.js');
const retryFailedOnlineQuestionsPushNotificationsRoute = require('../routes/retryFailedOnlineQuestionsPushNotificationsRoute.js');
const logForTeachRoute = require('../routes/logForTeachRoute.js');
const questionFormRoute = require('../routes/questionFormRoute.js'); 
const answerFormRoute = require('../routes/answerFormRoute.js');
const formFieldRoute = require('../routes/formFieldRoute.js');
const formFieldAnswersRoute = require('../routes/formFieldAnswersRoute.js');
const configRoute = require('../routes/configRoute.js');
const whiteBoardRoute = require('../routes/whiteBoardRoute.js');
const meetingNotesRoute = require('../routes/meetingNotesRoute.js');
const loginRoute = require('../routes/loginRoute.js');
const onlineSurveyRoute = require('../routes/onlineSurveyRoute.js');
const formQuestionPointsRoute = require('../routes/formQuestionPointsRoute.js');
const countDownTimerFormRoute = require('../routes/countDownTimerFormRoute.js');
const formBuilderRoute = require('../routes/formBuilderRoute.js');
const reportFieldRoute = require('../routes/reportFieldRoute.js');
const institutionRoute = require('../routes/institutionRoute.js');  
const classGradeRoute = require('../routes/classGradeRoute.js');
const notesRoute = require('../routes/notesRoute.js');
const fullTextSearchRoute = require('../routes/fullTextSearchRoute.js');
const outcomesRoute = require('../routes/outcomesRoute.js');
const equationRoute = require('../routes/equationRoute.js');
const onlineQuestionExplainAnswerRoute = require('../routes/onlineQuestionExplainAnswerRoute.js');
const questionInsightsRoute = require('../routes/questionInsightsRoute.js');
const studentQuestionInsightsRoute = require('../routes/studentQuestionInsightsRoute.js');
const insightsRoute = require('../routes/insightsRoute.js');
const outcomeInsightsRoute = require('../routes/outcomeInsightsRoute.js');
const courseOutcomeInsightsRoute  = require('../routes/courseOutcomeInsightsRoute.js');
const lessonDetailRoute  = require('../routes/lessonDetailRoute.js');
const lessonDetailPlanRoute  = require('../routes/lessonDetailPlanRoute.js');
const conceptRoute  = require('../routes/conceptRoute.js');
const outcomeVerbListRoute = require('../routes/outcomeVerbListRoute.js');
// const dotenv from 'dotenv');
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
app.use('/api/v1/courseoutcomeinsights', courseOutcomeInsightsRoute);
app.use('/api/v1/studentquestioninsights', studentQuestionInsightsRoute);
app.use('/api/v1/insights', insightsRoute);
app.use('/api/v1/lessondetail', lessonDetailRoute);
app.use('/api/v1/lessondetailplan', lessonDetailPlanRoute);
app.use('/api/v1/concept', conceptRoute);
app.use('/api/v1/outcomeverblist', outcomeVerbListRoute)

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

function serverObjects(){
  return {
   app,
   server
  }
};

module.exports = { serverObjects, app };

