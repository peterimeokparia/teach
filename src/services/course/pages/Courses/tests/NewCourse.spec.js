import {
ADD_COURSE_BEGIN,
ADD_COURSE_SUCCESS,
SAVE_COURSE_BEGIN,
SAVE_COURSE_SUCCESS } from 'services/course/actions/courses';

import {
addNewCourse,
saveCourse } from 'services/course/actions/courses';

jest.mock('../../../Api');

describe('NewCourse', () =>  {  

   it('should add a new course', async () => {
    let course = {
     name: "Solar System" ,
     price: 5.00,
     description: "Solar System", 
     createdBy: "5fab4846c2a96278c56381c9",
     user: {_id: "0001", firstname: "testUser"},
     operator: "teach",
     coursePushNotificationSubscribers: [ "0001"],
     courseEmailNotificationSubscribers: [ "0001" ] 
    }; 

    const mockDispatch = jest.fn();

    await addNewCourse(course)(mockDispatch);
    console.log('add new course', mockDispatch.mock.calls[1][0])
    expect(mockDispatch.mock.calls.length).toBe(2);
    expect(mockDispatch.mock.calls[0][0]).toEqual({
       type: ADD_COURSE_BEGIN
    });
    expect(mockDispatch.mock.calls[1][0]).toEqual({
        type: ADD_COURSE_SUCCESS,
        payload: {
          course: {
            name: 'Solar System',
            price: 5,
            description: 'Solar System',
            createdBy: '5fab4846c2a96278c56381c9',
            user: { _id: '0001', firstname: 'testUser' },
            operator: "teach",
            coursePushNotificationSubscribers: [ "0001"],
            courseEmailNotificationSubscribers: [ "0001" ], 
          },
          user: { _id: '0001', firstname: 'testUser' }
        }
    });
  });

 it('should update an existing course.', async () => {
    let updatedCourse = {
     name: "The Moon" ,
     price: 5.00,
     description: "What's On The Other Side?", 
     createdBy: "5fab4846c2a96278c56381c9",
     user: {_id: "0001", firstname: "testUser"},
     operator: "teach",
     coursePushNotificationSubscribers: [ "0001"],
     courseEmailNotificationSubscribers: [ "0001" ], 
     _id: "5fab4846c2a96278c56381c2"
    }
    const mockDispatch = jest.fn();
    await saveCourse(updatedCourse)(mockDispatch);
    console.log('update course', mockDispatch.mock.calls)
    expect(mockDispatch.mock.calls.length).toBe(2);
    expect(mockDispatch.mock.calls[0][0]).toEqual({
      type: SAVE_COURSE_BEGIN
    });
    expect(mockDispatch.mock.calls[1][0].type).toEqual( SAVE_COURSE_SUCCESS );
    expect(mockDispatch.mock.calls[1][0].payload['testobject'].name).toEqual( updatedCourse?.name );
  });
 });




