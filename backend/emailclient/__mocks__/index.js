import {
SENDGRID,
NODEMAILER } from '../emailclient/providers/index.js';

export const emailClient = ( mailOptions, fromEmail  ) => {
    if ( emailSentStatuses?.length > 0 ){
        alert(`email was sent successfully`);
        return;
    }
    const fromEmail = "teachpadsconnect247@gmail.com";
    let providers = [ SENDGRID, NODEMAILER ];
    let emailSentStatuses = [];
    let emailSentStatus = false;
    try {
        switch (key) {
            case NODEMAILER:
            emailSentStatus = nodeMailerEmailServiceProvider( mailOptions, process.env.fromEmail ); 
            if ( emailSentStatus ){
                emailSentStatuses = [ ...emailSentStatuses, emailSentStatus ];
            }
               break;
            case SENDGRID:
            emailSentStatus = sendGridEmailServiceProvider( mailOptions, process.env.fromEmail );  
            if ( emailSentStatus ){
                emailSentStatuses = [ ...emailSentStatuses, emailSentStatus ];
            }
                break;
            default:
                break;
        }
    } catch (error) {
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
};


export const nodeMailerEmailServiceProvider = ( mailOptions, fromEmail  ) => {
    return new Promise((resolve, reject) => {
        process.nextTick(() => {
            console.log("Mock implementation nodeMailerEmailServiceProvider");
            console.log(mailOptions);
            console.log(fromEmail); 
            if ( mailOptions?.toEmail !== undefined )   {
                console.log(".. in Mock implementation nodeMailerEmailServiceProvider");
                resolve( mailOptions ); 
                return true;
            } else {
                reject({ error: `NODEMAILEREMAILSERVICEPROVIDER: There was a problem sending the message`  })
                return false;
            }          
        })
    });
};


export const sendGridEmailServiceProvider = ( mailOptions, fromEmail  ) => {
    return new Promise((resolve, reject) => {
        process.nextTick(() => {
            console.log("Mock implementation sendGridEmailServiceProvider");
            console.log(mailOptions);
            console.log(fromEmail);
            if ( mailOptions?.toEmail !== undefined )   {
                console.log(".. in Mock implementation sendGridEmailServiceProvider");
                resolve( mailOptions ); 
                return true;
            } else {
                reject({ error: `SENDGRIDEMAILSERVICEPROVIDER: There was a problem sending the message`  })
                return false;
            }          
        })
    });
};