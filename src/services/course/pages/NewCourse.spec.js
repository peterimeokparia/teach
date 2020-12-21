import React from 'react';

import {
addNewCourse } from '../actions.js';

jest.mock('../api');

describe('NewCourse', () => {
  
  const userId = "5fab4846c2a96278c56381c9";
  const userId2 = "5fab4846c2a96278c56381c2";


   it('should add a new course', async () => {

    let currentUser = {
        role: "Tutor",
        courses: [],
        _id: userId 
    };
    
 
    let course = {
     name: "Solar System" ,
     price: 5.00,
     description: "Solar System", 
     user: currentUser,
     createdBy: userId
    } 

    const mockDispatch = jest.fn();

    await addNewCourse(
        course.name,
        course.price,
        course.description,
        currentUser
    )(mockDispatch);

    console.log('add new course', mockDispatch.mock.calls[2][0])

    expect(mockDispatch.mock.calls.length).toBe(3);
    expect(mockDispatch.mock.calls[0][0]).toEqual({
       type: 'ADD COURSE BEGIN'
    });
    expect(mockDispatch.mock.calls[1][0]).toEqual({
        type: 'ADD COURSE SUCCESS',
        payload: {
          name: 'Solar System',
          price: 5,
          description: 'Solar System',
          createdBy: '5fab4846c2a96278c56381c9',
          _id: 'COURSE5fab4846c2a96278c56381c9'
        }
    });
 
    expect(mockDispatch.mock.calls[2][0]).toEqual(
       {
            type: 'LAST LOGGEDIN USER',
            payload: {
            role: 'Tutor',
            courses: [ 'COURSE5fab4846c2a96278c56381c9' ],
            _id: '5fab4846c2a96278c56381c9'
          }
       }
    );
    
 });

 


 it('should call 3 actions', async () => {

    let currentUser = {
        role: "Tutor",
        courses: [],
        _id: userId2 
    };
    
 
    let course = {
     name: "Solar System" ,
     price: 5.00,
     description: "Solar System", 
     user: currentUser,
     createdBy: userId2
    }

    const mockDispatch = jest.fn();

    await addNewCourse(
        course.name,
        course.price,
        course.description,
        currentUser
    )(mockDispatch);

    console.log('add new course', mockDispatch.mock.calls[2][0])

    expect(currentUser.courses.length).toBe(1);
    
  }); 
 
});




