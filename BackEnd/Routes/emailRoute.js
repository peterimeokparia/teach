import express from 'express';

import emailModel from '../Model/emailModel.js';

import emailClient from '../EmailClient/emailClient.js';

import {
getPostData,    
saveUpdatedData } from '../Helpers/storageHelper.js';

import { 
EMAILROUTE,
handleBackEndLogs } from '../Helpers/logHelper.js';

const emailRoute = express.Router();

emailRoute.get('/', (req, res) => {
emailModel.find({ })
    .then(data => {
        console.log('Emails Emails', data)
        return res.status(200).json(data);
    })
    .catch( error => {
        console.log( error );
        handleBackEndLogs( EMAILROUTE, error );
        return res.status(400).json({ error })
    });
});

emailRoute.post('/', (req, res) => {
let emailOptions = {
    from: req.body.fromEmail, 
    to: req.body.toEmail, 
    subject: req.body.subject,
    text: req.body.messageBody
};

emailClient( emailOptions );

let emailData = getPostData( req );

let email = new emailModel(emailData);  

email.save()
    .then(data => {
        console.log('Emails Emails', data)
        return res.status(200).json(data);
    })
    .catch( error => {
        console.log( error );
        handleBackEndLogs( EMAILROUTE, error );
        return res.status(400).json({ error })
    });
});

 emailRoute.put('/:userId', (req, res) => {
saveUpdatedData(req, emailModel, req.params.userId)
    .then( data => {
      console.log(data);
      return res.status(200).json(data);
    })
    .catch( error => {
        console.log( error );
        handleBackEndLogs( EMAILROUTE, error );
        return res.status(400).json({ error })
    });
});

emailRoute.delete('/:emailId', (req, res) => {
    emailModel.findByIdAndDelete(req.params.emailId)
     .then(data => {
        console.log('data - doc', data);
        return res.status(200).json(data);
     })
     .catch( error => {
        console.log( error );
        handleBackEndLogs( EMAILROUTE, error );
        return res.status(400).json({ error })
    });
});

export default emailRoute;