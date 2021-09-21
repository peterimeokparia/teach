import {
url,
addContent,
getContent,
updateContent } from './storageHelper.js'; 

import axios from 'axios';
import fetch from 'node-fetch';

export const ASSIGNMENTROUTE = "assignmentModel";
export const ATTENDANCEROUTE = "attendanceModel";
export const CALENDARROUTE = "calendarModel";
export const CLASSROOMROUTE = "classRoomModel";
export const COURSEROUTE = "courseModel";
export const EMAILROUTE = "emailModel";
export const EVENTROUTE = "eventModel";
export const EXAMROUTE = "examModel";
export const GRADEROUTE = "gradeModel";
export const LESSONROUTE = "lessonModel";
export const MEETINGROUTE = "meetingModel";
export const NOTIFICATIONROUTE = "notificationModel";
export const ONLINEANSWERSROUTE = "onlineAnswerModel";
export const ONLINECOMMENTSROUTE = "onlineCommentModel";
export const ONLINEQUESTIONSROUTE = "onlineQuestionModel";
export const OPERATORROUTE = "operatorModel";
export const QUESTIONROUTE = "questionModel";
export const QUESTIONFORMROUTE = "questionFormModel";
export const ANSWERFORMROUTE = "answerFormModel";
export const FORMFIELDROUTE = "formFieldModel";
export const FAILEDEMAILNOTIFICATIONSROUTE = "retryFailedEmailNotificationsModel";
export const FAILEDPUSHNOTIFICATIONSROUTE = "retryFailedPushNotificationsModel";
export const SESSIONROUTE = "sessionModel";
export const TIMELINEROUTE = "timeLineModel";
export const USERROUTE = "userModel";
export const WHITEBOARDROUTE = "whiteBoardModel";
export const MEETINGNOTESROUTE = "meetingNotesModel";

export const getLogObject = () => {
}

export async function handleBackEndLogs( modelName, errormessage ){
    let message = JSON.stringify( errormessage );
    console.log('modelName modelName')
    console.log(modelName)

    return fetchData(`${url.BackeEndServerLessonPrefix}/logforteach/byObjectName?objectName=${modelName}`)
     .then(resp =>  { return resp.json() })
     .then( logs => {
        // console.log('OBJECT OBJECT')
        //  console.log(JSON.stringify(logs))
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

export async function fetchData(url){
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

export async function handleFetch( url, method, data ){
return fetch( url, {
        method,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'   
        },
        body:JSON.stringify(data)
    }).then( resp => { 
        console.log(resp);
        return resp;
    })
    .catch( error => { 
        console.log(`Error ${error}`)
        return error;
    });
};