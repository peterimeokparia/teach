import {
SENDGRID,
NODEMAILER } from '../emailclient/providers/index.js';

import {
emailClient } from '../emailClient.js';

jest.mock('../emailClient.js');

describe('Sends email messages with the selected email providers', () =>  {  

    it('should send email messages with the SENDGRID provider', async () => {
      let emailOptions = {
        from: process.env.fromEmail, 
        to: process.env.testEmail, 
        subject: "SENDGRID PROVIDER",
        text: "Welcome to TEACH."
    }; 

    const mockDispatch = jest.fn();

    await emailClient( emailOptions, SENDGRID )(mockDispatch);
    console.log('Sendgrid success.', mockDispatch.mock.calls)
    
    // expect(mockDispatch.mock.calls.length).toBe(2);
    // expect(mockDispatch.mock.calls[0][0]).toEqual({
    //     type: ADD_COURSE_BEGIN
    // });
    // expect(mockDispatch.mock.calls[1][0]).toEqual({
    //     type: ADD_COURSE_SUCCESS,
    //     payload: {
    //       course: {
    //         name: 'Solar System',
    //         price: 5,
    //         description: 'Solar System',
    //         createdBy: '5fab4846c2a96278c56381c9',
    //         user: { _id: '0001', firstname: 'testUser' },
    //         operator: "teach",
    //         coursePushNotificationSubscribers: [ "0001"],
    //         courseEmailNotificationSubscribers: [ "0001" ], 
    //       },
    //       user: { _id: '0001', firstname: 'testUser' }
    //     }
    // });

  });

  it('should retry other providers on failure.', async () => {
    
    let emailOptions = {
        from: process.env.fromEmail, 
        to: undefined, 
        subject: "SENDGRID PROVIDER",
        text: "Welcome to TEACH."
    }; 

    const mockDispatch = jest.fn();

    await emailClient( emailOptions, SENDGRID )(mockDispatch);
    console.log('Sendgrid sent message failure.', mockDispatch.mock.calls)

  });
});

  
  
  
  