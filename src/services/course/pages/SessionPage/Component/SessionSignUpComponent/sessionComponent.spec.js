import {
INCREMENT_SESSION_COUNT,
DECREMENT_SESSION_COUNT_FOR_PACKAGE_OPTIONS} from 'Services/course/Actions/Sessions';


import {
incrementSessionCount,
decrementSessionCountForPackageOptions } from 'Services/course/Actions/Sessions';

jest.mock('../../../../Api');


describe('incrementSession',  () => {
  
    const courseId = "COURSE5fab4846c2a96278c56381c9";
    const lessonId = "LESSON5fab4846c2a96278c56381c9";
    const sessionId = "SESSION5fab4846c2a96278c56381c9";
    const userId = "USER5fab4846c2a96278c56381c9";

   
    
    let user = {
        _id: userId
    }

    let sessions = {
        numberOfSessions: 1,
        _id: sessionId
    } 
   

       it('should increment the number of sessions', async () => {

        const mockDispatch = jest.fn();
    
        await incrementSessionCount(
          sessions
        )(mockDispatch)
    
        console.log('new lesson', mockDispatch.mock.calls)
        expect(sessions.numberOfSessions).toBe(2);
       
});


     

it('should call 1 action', async () => {

      const mockDispatch = jest.fn();
  
      await incrementSessionCount(
        sessions
      )(mockDispatch)
  
  
      console.log('new session', mockDispatch.mock.calls[0][0])
      expect(mockDispatch.mock.calls.length).toBe(1);
      expect(mockDispatch.mock.calls[0][0]).toEqual({
         type: INCREMENT_SESSION_COUNT,
         payload: {
            _id: sessionId,
            numberOfSessions: 3
          }
      });   
  
   });
  
});


  



  describe('decrementSessionCountForPackageOptions',  () => {
  
    const courseId = "COURSE5fab4846c2a96278c56381c9";
    const lessonId = "LESSON5fab4846c2a96278c56381c9";
    const sessionId = "SESSION5fab4846c2a96278c56381c9";
    const userId = "USER5fab4846c2a96278c56381c9";

   
    
    let user = {
        _id: userId
    }

    let sessions = {
        numberOfSessions: 5,
        _id: sessionId
    } 
   

       it('should decrement the number of sessions', async () => {

        const mockDispatch = jest.fn();
    
        await decrementSessionCountForPackageOptions(
          sessions
        )(mockDispatch)
    
        console.log('new lesson', mockDispatch.mock.calls)
        expect(sessions.numberOfSessions).toBe(4);
       
     });



it('should call 1 action', async () => {

      const mockDispatch = jest.fn();
  
      await decrementSessionCountForPackageOptions(
        sessions
      )(mockDispatch)
  
  
      console.log('new session', mockDispatch.mock.calls[0][0])
      expect(mockDispatch.mock.calls.length).toBe(1);
      expect(mockDispatch.mock.calls[0][0]).toEqual({
         type: DECREMENT_SESSION_COUNT_FOR_PACKAGE_OPTIONS,
         payload: {
            _id: sessionId,
            numberOfSessions: 3
          }
      });   
  
   });
  
  });

  



