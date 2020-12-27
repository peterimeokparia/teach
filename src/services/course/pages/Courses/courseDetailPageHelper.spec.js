import { 
checkIfPackageIsSetToAutoRenew } from './courseDetailPageHelpers';

import {
autoRenewSessionPackages,
addNewMeeting } from '../../actions.js';

jest.mock('../services/course/api');

describe('handleAutoRenewPackageSessions', () => {
  
   let currentUser = {
       role: "Student"
   };

   let currentSession = { 
      numberOfSessions: 5,
      totalNumberOfSessions: 5,
      typeOfSession: "Package",
      autoRenew: true
   };

   it('should retun true if package has expired', () => {
      const isSetToAutoRenew = checkIfPackageIsSetToAutoRenew( currentUser,  currentSession );
      expect(isSetToAutoRenew).toBe(true);
   });
});




// const autoRenew = require('../services/course/api').autoRenew;


describe('autoRenewSessionPackages', () => {
  
   let currentUser = {
       role: "Student",
       paymentStatus: "approved"
   };

   let currentSession = { 
      numberOfSessions: 5,
      totalNumberOfSessions: 5,
      typeOfSession: "Package",
      autoRenew: true,
      autoRenewDates:['one', 'two', 'three']
   };



   it('should call 2 actions', async () => {
      
      // const autoRenewImplementation = ( currentUser, currentSession ) => {return new Promise( resolve =>  resolve({...currentUser, paymentStatus: "approved"} ))}
      // const mockAutoRenewPackages = jest.fn(autoRenewImplementation)
      // await autoRenewSessionPackages( currentUser,  currentSession, mockAutoRenewPackages )(mockDispatch);
      // console.log(mockAutoRenewPackages.mock.calls[0])

      const mockDispatch = jest.fn();
      await autoRenewSessionPackages( currentUser,  currentSession )(mockDispatch);

      expect(mockDispatch.mock.calls.length).toBe(2);
      expect(mockDispatch.mock.calls[0][0]).toEqual({
         type: 'AUTO RENEW PACKAGE SUCCESS',
         payload: {
           userSession: {
             numberOfSessions: 0,
             totalNumberOfSessions: 5,
             typeOfSession: 'Package',
             autoRenew: true,
             autoRenewDates: ['one', 'two', 'three'],
             status: true
           },
           user: { role: 'Student', paymentStatus: 'approved' }
         }
      });
      expect(mockDispatch.mock.calls[1][0].type).toEqual('LAST LOGGEDIN USER');
   });
});





describe('addNewMeeting', () => {

   const meetingId = "5fab4846c2a96278c56381c9";
  
   let meetingCollection = ["one", "two", "three", "four"];

   let currentUser = {
      role: "Student",
      meetings: [ ...meetingCollection ],
      meetingId:  meetingId
  };

   let currentSession = { 
      numberOfSessions: 5,
      totalNumberOfSessions: 5,
      typeOfSession: "Package",
      autoRenew: true
   };

   let meetingInitConfiguration = {
      invitees: ["James", "and", "John"], 
      userId: "007",
      sessions: [currentSession],
      timeStarted: "Today",
      courseId: "C0001",
      lessonId: "L001",
      courseTitle: "Introduction to wood work",
      lessonTitle: "Picking the right saw",
      lessonPlanUrl: "www.test.com", 
      currentUser: currentUser
   }
   

  



   it('should add a new meeting', async () => {

      const mockDispatch = jest.fn();

      await addNewMeeting(
         meetingInitConfiguration.invitees,
         meetingInitConfiguration.userId,
         meetingInitConfiguration.sessions,
         meetingInitConfiguration.timeStarted,
         meetingInitConfiguration.courseId,
         meetingInitConfiguration.lessonId,
         meetingInitConfiguration.courseTitle,
         meetingInitConfiguration.lessonTitle,
         meetingInitConfiguration.lessonPlanUrl,
         meetingInitConfiguration.currentUser

      )(mockDispatch);

      expect(mockDispatch.mock.calls.length).toBe(3);
      expect(mockDispatch.mock.calls[0][0]).toEqual({
         type: 'ADD NEW MEETING BEGIN'
      });
      expect(mockDispatch.mock.calls[1][0]).toEqual({
         type: 'LAST LOGGEDIN USER',
         payload: {
            role: "Student",
            meetings: currentUser.meetings,
            meetingId: meetingId
         }
      });
      expect(mockDispatch.mock.calls[1][0].payload.meetings.includes(meetingId)).toBe(true);
      expect(mockDispatch.mock.calls[2][0]).toEqual(
         {
            type: 'ADD NEW MEETING SUCCESS',
            payload: {
               _id: meetingId, meetings: currentUser.meetings 
            }
          }
      );
      
   });
});