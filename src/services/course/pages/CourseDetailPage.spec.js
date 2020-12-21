import React from 'react';

import {
ADD_NEW_LESSON_BEGIN,
ADD_NEW_LESSON_SUCCESS,
SAVE_LESSON_BEGIN,
SAVE_LESSON_SUCCESS,
UPDATE_INVITEE_SESSION_URL,
INCREMENT_SESSION_COUNT,
DECREMENT_SESSION_COUNT_FOR_PACKAGE_OPTIONS
} from '../actions.js'


import {
addNewLesson,
saveLesson,
updateUserInvitationUrl,
incrementSessionCount,
decrementSessionCountForPackageOptions } from '../actions.js';

jest.mock('../api');


describe('AddNewLesson', () => {
  
 
    const courseId = "COURSE5fab4846c2a96278c56381c9";
    const lessonId = "LESSON5fab4846c2a96278c56381c9";
  

   it('should call 2 actions', async () => {

    let lesson = {
     name: "Solar System" ,
     courseId: courseId
    } 

    const mockDispatch = jest.fn();

    await addNewLesson(
        lesson.name,
        lesson.courseId
    )(mockDispatch)


    console.log('new lesson',  mockDispatch.mock.calls)
    expect(mockDispatch.mock.calls.length).toBe(2);
    expect(mockDispatch.mock.calls[0][0]).toEqual({
       type: ADD_NEW_LESSON_BEGIN
    });

    expect(mockDispatch.mock.calls[1][0]).toEqual({
        type: ADD_NEW_LESSON_SUCCESS,
        payload: {
          name: 'Solar System',
          courseId: courseId,
          _id: lessonId
        }
    });
 
 });

});





describe('SaveNewLesson', () => {
  
    const courseId = "COURSE5fab4846c2a96278c56381c9";
    const lessonId = "LESSON5fab4846c2a96278c56381c9";
   
it('should call 2 actions', async () => {

      let lesson = {
       name: "Solar System" ,
       courseId: courseId,
       _id: "LESSON5fab4846c2a96278c56381c9"
      } 
  
      const mockDispatch = jest.fn();
  
      await saveLesson(
          lesson
      )(mockDispatch)
  
  
      console.log('new lesson', mockDispatch.mock.calls)
      expect(mockDispatch.mock.calls.length).toBe(2);
      expect(mockDispatch.mock.calls[0][0]).toEqual({
         type: SAVE_LESSON_BEGIN
      });
  
      expect(mockDispatch.mock.calls[1][0]).toEqual({
          type: SAVE_LESSON_SUCCESS,
          payload: {
            name: 'Test New Lesson Title',
            courseId: courseId,
            _id: lessonId
          }
      });
   
  
   });
  
  });




describe('updateUserInvitationUrl', () => {
  
    const courseId = "COURSE5fab4846c2a96278c56381c9";
    const lessonId = "LESSON5fab4846c2a96278c56381c9";
    const userId = "USER5fab4846c2a96278c56381c9"

    const inviteeSessionUrl = "http://www.teach/lessoninprogress.com";
    const nameOfLessonInProgress = "Solar System"; 
    const lessonInProgress = true;
    
    let user = {
        _id: userId
    }

    let lesson = {
        name: "Solar System" ,
        courseId: courseId,
        _id: "LESSON5fab4846c2a96278c56381c9"
       } 
   
it('should call 1 action', () => {

      const mockDispatch = jest.fn();
  
      updateUserInvitationUrl(
        user,
        inviteeSessionUrl,
        nameOfLessonInProgress,
        lessonInProgress
      )(mockDispatch)
  
  
      console.log('new lesson', mockDispatch.mock.calls)
      expect(mockDispatch.mock.calls.length).toBe(1);
      expect(mockDispatch.mock.calls[0][0]).toEqual({
         type: UPDATE_INVITEE_SESSION_URL,
         payload: {
            _id: userId,
            inviteeSessionUrl: inviteeSessionUrl,
            lessonInProgress: lessonInProgress,
            nameOfLessonInProgress: nameOfLessonInProgress
          }
      });   
  
   });
  
  });




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

  



