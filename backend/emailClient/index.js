import {
SENDGRID,
NODEMAILER } from '../emailClient/providers/index.js';
import NodeMailer from 'nodemailer';
import sgMail from '@sendgrid/mail';

export function emailClient( mailOptions, emailProvider ) {
    const fromEmail = "teachpadsconnect247@gmail.com";
    let providers = [ SENDGRID, NODEMAILER ];
    let emailSentStatusCollection = [];
    let emailSentStatus = false;
    try {
        switch (emailProvider) {
            case NODEMAILER: 
            emailSentStatus = nodeMailerEmailServiceProvider( mailOptions, fromEmail );  
            if ( emailSentStatus ){
                emailSentStatusCollection = [ ...emailSentStatusCollection, emailSentStatus ];
            }
                break;
            case SENDGRID:
            emailSentStatus = sendGridEmailServiceProvider( mailOptions, fromEmail );
            if ( emailSentStatus ){
                emailSentStatusCollection = [ ...emailSentStatusCollection, emailSentStatus ];
            }   
                break;
            default:
                break;
        }
    } catch ( error ) {   
        console.warn( `Retrying with other email providers... ${ error }`);
        providers?.filter( provider => provider !== emailProvider)
            .every( provider => {
                if ( emailSentStatus || emailSentStatuses?.length > 0 ) {
                    return false;
                }
                emailSentStatus =  emailClient( mailOptions, provider );
            return true;
        });
    }
    return emailSentStatus;
}

export function nodeMailerEmailServiceProvider( mailOptions, fromEmail ){
    const  passWord = "Teach777!!!"; // will move to private location// test
    let emailSent = false;
    const transporter = NodeMailer?.createTransport({
        service: 'gmail',
        auth: {
            user: fromEmail,
            pass: passWord // move to env var
        }});
        transporter?.sendMail(mailOptions, ( error, response) => {
              if ( error ) {
                  console.log( error );
                  throw Error(`NODEMAILEREMAILSERVICEPROVIDER: There was a problem sending the message ${ error }`);
              }
              emailSent = true;
              console.log( response )
        });  
    return emailSent;  
};

export function sendGridEmailServiceProvider( mailOptions, fromEmail  ){
    let key="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"; // will move to private location// test
    sgMail.setApiKey(key);
    let emailSent = false;
    const msg = {
        to: mailOptions.to,
        from: fromEmail, 
        subject: mailOptions.subject,
        text: mailOptions.text,
        html: '<strong>' + mailOptions.text + '</strong>',
    };

    sgMail
        .send(msg)
        .then(() => {
            console.log('Email sent');
            emailSent = true;
        })
        .catch((error) => {
            console.error(error);
            throw Error(`SENDGRIDEMAILSERVICEPROVIDER: There was a problem sending the message ${ error }`);
        });
    return emailSent;
};