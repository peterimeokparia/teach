import {
SENDGRID,
NODEMAILER } from '../providers/index.js';


export function emailClient( mailOptions, emailProvider  ){
    console.log(`@@@@@@ i am in the mock implementation emailClient email was sent successfully`);
    const fromEmail = "teachpadsconnect247@gmail.com";
    let providers = [ SENDGRID, NODEMAILER  ];
    let emailSentStatusCollection = [];
    let emailSentStatus = {};
    try {
        switch (emailProvider) {
            case NODEMAILER:
            emailSentStatus = nodeMailerEmailServiceProvider( { ...mailOptions, to: 'nodemailer@teach.com' }, fromEmail ); 
                if ( emailSentStatus?.value ){
                    emailSentStatusCollection = [ ...emailSentStatusCollection, emailSentStatus ];
                }
               break;
            case SENDGRID:
            emailSentStatus = sendGridEmailServiceProvider( mailOptions, fromEmail );  
            if ( emailSentStatus?.value ){
                emailSentStatusCollection = [ ...emailSentStatusCollection, emailSentStatus ];
            }
                break;
            default:
                break;
        }
    } catch (error) {
        providers?.filter( provider => provider !== emailProvider)
            .every( provider => {
                if ( emailSentStatus?.value || emailSentStatusCollection?.length > 0 ) {
                    return false;
                }
                emailSentStatus =  emailClient( mailOptions, provider );
            return true;
        });   
    }
    return emailSentStatus;
};


export const nodeMailerEmailServiceProvider = ( mailOptions, fromEmail  ) => {
    console.log("...in Mock implementation nodeMailerEmailServiceProvider");
            if ( mailOptions?.to !== undefined )   {
                return {value: true, provider:'nodemailer'};
            } else {
                throw Error(`NODEMAILEREMAILSERVICEPROVIDER: There was a problem sending the message`);
            }          
};


export const sendGridEmailServiceProvider = ( mailOptions, fromEmail  ) => {
            console.log("Mock implementation sendGridEmailServiceProvider");
            if ( mailOptions?.to !== undefined )   {
                console.log("..in Mock implementation sendGridEmailServiceProvider");
                return {value: true, provider:'sendgrid'};
            } else {
                throw Error( `SENDGRIDEMAILSERVICEPROVIDER: There was a problem sending the message` );
            }       
};