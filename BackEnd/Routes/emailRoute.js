import express from 'express';
import emailModel from '../Model/emailModel.js';
import emailClient from '../EmailClient/emailClient.js';
import { saveUpdatedData } from './lessonRoute.js';


const emailRoute = express.Router();


emailRoute.get('/', (req, res) => {
 
    emailModel.find({ })
        .then(data => {
            console.log('Emails Emails', data)
            res.status(200).json(data);
        })
         .catch(error => console.log(error));
})





emailRoute.post('/', (req, res) => {

    let emailOptions = {
        from: req.body.fromEmail, 
        to: req.body.toEmail, 
        subject: req.body.subject,
        text: req.body.messageBody
    }
 
    emailClient( emailOptions );

    let emailData = {
        fromEmail: req.body.fromEmail, 
        toEmail: req.body.toEmail, 
        subject: req.body.subject,
        messageBody: req.body.messageBody,
        userId: req.body.userId
    }

    let email = new emailModel(emailData);  

    email.save()
        .then(data => {
        console.log('saved', data);
        res.status(200).json(data)})
        .catch( error => console.log(error) )


});






 emailRoute.put('/:userId', (req, res) => {
 
    saveUpdatedData(req, emailModel, req.params.userId)
    .then( data => {
      console.log(data);
      res.status(200).json(data)
    })
     .catch( error => {
        console.log(error);
        res.status(400).json({ error })
     });
});




emailRoute.delete('/:emailId', (req, res) => {

    emailModel.findByIdAndDelete(req.params.emailId)
     .then(data => {
        console.log('data - doc', data);
        res.status(200).json(data)
     })
       .catch(error => {
        res.status(400).json({error});
       })
   
});


export default emailRoute;