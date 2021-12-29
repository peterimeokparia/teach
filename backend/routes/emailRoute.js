import { 
emailClient } from '../emailClient/index.js';

import {
getPostData,    
saveUpdatedData } from '../helpers/storageHelper.js';

import { 
EMAILROUTE,
handleBackEndLogs } from '../helpers/logHelper.js';

import { 
SENDGRID } from '../emailclient/providers/index.js';

import { 
verifyRoute,
logRouteInfo } from '../middleWare/index.js'; 

import express from 'express';
import emailModel from '../model/emailModel.js';

const emailRoute = express.Router();

emailRoute.use(logRouteInfo);

emailRoute.get('/', (req, res) => {
emailModel.find({ })
    .then(data => {
        return res.status(200).json(data);
    })
    .catch( error => {
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
// inject mail provider dependency
emailClient( emailOptions, SENDGRID );
    let emailData = getPostData( req );
    let email = new emailModel(emailData);  
    email.save()
    .then(data => {
        return res.status(200).json(data);
    })
    .catch( error => {
        handleBackEndLogs( EMAILROUTE, error );
        return res.status(400).json({ error })
    });
});

emailRoute.put('/:userId', (req, res) => {
    saveUpdatedData(req, emailModel, req.params.userId)
    .then( data => {
      return res.status(200).json(data);
    })
    .catch( error => {
        handleBackEndLogs( EMAILROUTE, error );
        return res.status(400).json({ error })
    });
});

emailRoute.delete('/:emailId', (req, res) => {
    emailModel.findByIdAndDelete(req.params.emailId)
     .then(data => {
        return res.status(200).json(data);
     })
     .catch( error => {
        handleBackEndLogs( EMAILROUTE, error );
        return res.status(400).json({ error })
    });
});

export default emailRoute;