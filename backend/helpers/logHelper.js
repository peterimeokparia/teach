const {
url,
addContent,
getContent,
updateContent } = require('./storageHelper.js'); 

const axios = require('axios');
const fetch = require('node-fetch');

const ASSIGNMENTROUTE = "assignmentModel";
const ATTENDANCEROUTE = "attendanceModel";
const CALENDARROUTE = "calendarModel";
const CLASSROOMROUTE = "classRoomModel";
const COURSEROUTE = "courseModel";
const EMAILROUTE = "emailModel";
const EVENTROUTE = "eventModel";
const EXAMROUTE = "examModel";
const GRADEROUTE = "gradeModel";
const LESSONROUTE = "lessonModel";
const MEETINGROUTE = "meetingModel";
const NOTIFICATIONROUTE = "notificationModel";
const ONLINEANSWERSROUTE = "onlineAnswerModel";
const ONLINECOMMENTSROUTE = "onlineCommentModel";
const ONLINEQUESTIONSROUTE = "onlineQuestionModel";
const ONLINESURVEYROUTE = "onlineSurveyModel";
const OPERATORROUTE = "operatorModel";
const QUESTIONROUTE = "questionModel";
const QUESTIONFORMROUTE = "questionFormModel";
const ANSWERFORMROUTE = "answerFormModel";
const FORMFIELDROUTE = "formFieldModel";
const FORMFIELDANSWERSROUTE = "formFieldModel";
const FAILEDEMAILNOTIFICATIONSROUTE = "retryFailedEmailNotificationsModel";
const FAILEDPUSHNOTIFICATIONSROUTE = "retryFailedPushNotificationsModel";
const SESSIONROUTE = "sessionModel";
const TIMELINEROUTE = "timeLineModel";
const USERROUTE = "userModel";
const WHITEBOARDROUTE = "whiteBoardModel";
const MEETINGNOTESROUTE = "meetingNotesModel";
const LOGINROUTE = "loginModel";
const FORMQUESTIONPOINTSROUTE = "formQuestionPointsModel";
const COUNTDOWNTIMERFORMROUTE = "countDownTimerFormModel";
const FULLTEXTSEARCHROUTE = "fullTextSearchModel";

async function handleBackEndLogs( modelName, errormessage ){
    return fetchData(`${url.BackeEndServerLessonPrefix}/logforteach/byObjectName?objectName=${modelName}`)
     .then(resp =>  { return resp.json() })
     .then( logs => {
         let [ errorMessage ] = logs;
         
         if ( logs && errorMessage ) {
            const {  _id, objectName } = errorMessage;
            if ( objectName && _id ) {
                console.log('.SAVING')
               return handleFetch(`${url.BackeEndServerLessonPrefix}/logforteach/${_id}`, 'PUT', { ...logs, errorMessage: [...errorMessage?.errorMessage, { message, time: Date.now() } ]  });  
            }
         } else {
            return handleFetch(`${url.BackeEndServerLessonPrefix}/logforteach`, 'POST', { objectName: modelName, errorMessage: [{ message, time: Date.now() }]  });
         }
     }).catch( error => {
         console.log( error );
     });
};

async function fetchData(url){
return fetch(url) 
    .then( resp => { 
        console.log(resp);
        return resp;
    })
    .catch( error => { 
        console.log(`Error = ${error}`)
        return error;
    });
};

async function handleFetch( url, method, data ){
return fetch( url, {
        method,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'   
        },
        body:JSON.stringify(data)
    }).then( resp => { 
       // console.log(resp);
        return resp;
    })
    .catch( error => { 
       // console.log(`Error ${error}`)
        return error;
    });
};

module.exports = { handleBackEndLogs, fetchData, handleFetch,
    ASSIGNMENTROUTE, ATTENDANCEROUTE, CALENDARROUTE, CLASSROOMROUTE, COURSEROUTE, EMAILROUTE, EVENTROUTE,
    EXAMROUTE, GRADEROUTE, LESSONROUTE, MEETINGROUTE, NOTIFICATIONROUTE, ONLINEANSWERSROUTE, ONLINECOMMENTSROUTE,
    ONLINEQUESTIONSROUTE, ONLINESURVEYROUTE, OPERATORROUTE, QUESTIONROUTE, QUESTIONFORMROUTE, ANSWERFORMROUTE,
    FORMFIELDROUTE, FORMFIELDANSWERSROUTE, FAILEDEMAILNOTIFICATIONSROUTE, FAILEDPUSHNOTIFICATIONSROUTE, SESSIONROUTE,
    TIMELINEROUTE, USERROUTE, WHITEBOARDROUTE, MEETINGNOTESROUTE, LOGINROUTE, FORMQUESTIONPOINTSROUTE, COUNTDOWNTIMERFORMROUTE,
    FULLTEXTSEARCHROUTE 
  };
