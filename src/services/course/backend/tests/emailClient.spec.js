import {
SENDGRID,
NODEMAILER } from '../../../../../backend/emailClient/providers/index.js';

import{
emailClient } from '../../../../../backend/emailClient/index.js'

jest.mock('../../../../../backend/emailClient/index.js');

describe('Sends email messages with the selected email providers', () =>  {  

    it('should send email messages with the SENDGRID provider', () => {
      let emailOptions = {
        from: 'testUserAdmin@teach.com', 
        to: 'testUser@teach.com', 
        subject: "SENDGRID PROVIDER",
        text: "Welcome to TEACH."
    }; 

    let emailStatus = emailClient( emailOptions, SENDGRID );
    expect(emailStatus?.value).toBe(true);
    expect(emailStatus?.provider).toBe('sendgrid'); 
  });

  it('should retry other providers on failure.', () => {
    
    let emailOptions = {
        from:'testUserAdmin@teach.com' , 
        to: undefined, 
        subject: "SENDGRID PROVIDER",
        text: "Welcome to TEACH."
    }; 

    let emailStatus = emailClient( emailOptions, SENDGRID );
        expect( emailStatus.provider ).toBe('nodemailer');
        expect(emailStatus.value).toBe(true);
  });
});

  
  
  
  