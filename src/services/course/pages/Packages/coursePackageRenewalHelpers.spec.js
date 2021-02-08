import { 
checkIfPackageIsSetToAutoRenew } from './coursePackageRenewalHelpers';

import {
autoRenewSessionPackages } from '../../actions.js';

jest.mock('../../api');

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
      const isSetToAutoRenew = checkIfPackageIsSetToAutoRenew( currentUser,  [currentSession] );
      expect((isSetToAutoRenew?.length > 0)).toBe(true);
   });
});



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
      
      const mockDispatch = jest.fn();

      await autoRenewSessionPackages( currentUser,  currentSession )(mockDispatch);

      expect(mockDispatch.mock.calls.length).toBe(2);
      expect(mockDispatch.mock.calls[0][0]).toEqual({
         type: 'AUTO RENEW PACKAGE SUCCESS',
         payload: {
           Session: {
             numberOfSessions: 0,
             totalNumberOfSessions: 5,
             typeOfSession: 'Package',
             autoRenew: true,
             autoRenewDates: ['one', 'two', 'three'],
             status: true
           },
           User: { role: 'Student', paymentStatus: 'approved' }
         }
      });
      expect(mockDispatch.mock.calls[1][0].type).toEqual('LAST LOGGEDIN USER');
   });
});





