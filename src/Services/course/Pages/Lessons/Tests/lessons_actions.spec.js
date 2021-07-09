//https://zellwk.com/blog/endpoint-testing/
//https://betterprogramming.pub/adding-tests-to-express-apps-with-jest-and-supertest-d0e7aaac4c08
//https://www.freecodecamp.org/news/end-point-testing/
// https://github.com/zellwk/endpoint-testing-example/blob/master/package.json

import {
ADD_NEW_LESSON_BEGIN,
ADD_NEW_LESSON_SUCCESS,
SAVE_LESSON_BEGIN,
SAVE_LESSON_SUCCESS } from 'Services/course/Actions/Lessons';

import {
loadLessons,
addNewLesson,
saveLesson } from 'Services/course/Actions/Lessons'; 

jest.mock('../../../Api');

describe('Adds A New Lesson', () => {  

    let lesson = {
    courseId: "COURSE5fab4846c2a96278c56381c9",
    lessonId: "LESSON5fab4846c2a96278c56381c9",
    lessonDate: '06/20/2021',
    userId: "PERSON5fab4846c2a96278c56381c9",
    title: "Solar System",
    introduction: "Earth & Beyond"
  };


   it('Adds A New Lesson.', async () => {

    const mockDispatch = jest.fn();

    await addNewLesson(lesson?.title, lesson?.introduction, lesson?.courseId, lesson?.lessonDate,  lesson?.userId )(mockDispatch)

    console.log('ADD NEW LESSON new lesson',  mockDispatch.mock.calls);
    console.log(mockDispatch.mock.calls[1][0]);
    //expect(mockDispatch.mock.calls.length).toBe(2);
    expect(mockDispatch.mock.calls[0][0]).toEqual({
       type: ADD_NEW_LESSON_BEGIN
    });

    expect(mockDispatch.mock.calls[1][0]).toEqual({
        type: ADD_NEW_LESSON_SUCCESS,
        payload: {
          title: lesson?.title,
          courseId: lesson?.courseId,
          introduction: lesson?.introduction,
          lessonDate: lesson?.lessonDate,
          userId: lesson?.userId,
        }
    });
  });

  it('Updates An Existing Lesson.', async () => {

    let newLesson = {
      title: 'Test New Lesson Title',
      userId: "PERSON5fab4846c2a96278c56381c9",
      lessonDate: lesson?.lessonDate,
      courseId: lesson?.courseId,
      _id: "5fab4846c2a96278c56381c9",
   };

    const mockDispatch = jest.fn();

    await saveLesson( newLesson )(mockDispatch)

    console.log('SAVE LESSON SAVE LESSONS',  mockDispatch.mock.calls)
    console.log('SAVE LESSON SAVE LESSONS',  mockDispatch.mock.calls[1][0])
    expect(mockDispatch.mock.calls.length).toBe(2);
    expect(mockDispatch.mock.calls[0][0]).toEqual({
      type: SAVE_LESSON_BEGIN
    });

    console.log(mockDispatch.mock.calls[1][0].type)
    expect(mockDispatch.mock.calls[1][0].type).toEqual( SAVE_LESSON_SUCCESS );
    expect(mockDispatch.mock.calls[1][0].payload['testobject'].title).toEqual( newLesson?.title );
});
});

