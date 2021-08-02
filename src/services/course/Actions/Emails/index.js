import {
sendEmail } from 'services/course/api';

export const SEND_EMAIL_SUCCESS = "SEND EMAIL SUCCESS";
export const SEND_EMAIL_ERROR = "SEND EMAIL ERROR";
export const TEACH_EMAIL_ADDRESS =  "teachpadsconnect247@gmail.com";

export const sendEmails = ( fromEmail, toEmail, subject, messageBody, userId ) => {
    return dispatch => {
        sendEmail( fromEmail, toEmail, subject, messageBody, userId )
         .then( email => {
             dispatch({ type: SEND_EMAIL_SUCCESS, payload: email });
         }).catch( error => { dispatch({ type: SEND_EMAIL_ERROR , error });
        });
    };
};