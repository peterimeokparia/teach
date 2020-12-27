import React from 'react';

import {
ADD_NEW_LESSON_BEGIN,
ADD_NEW_LESSON_SUCCESS,
SAVE_LESSON_BEGIN,
SAVE_LESSON_SUCCESS } from '../actions.js'


import {
addNewLesson,
saveLesson } from '../actions.js';


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
