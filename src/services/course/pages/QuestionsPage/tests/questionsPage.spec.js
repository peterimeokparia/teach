
import {
ADD_QUESTION_BEGIN,
ADD_QUESTION_SUCCESS,
SAVE_QUESTION_BEGIN,
SAVE_QUESTION_SUCCESS,
LOAD_QUESTIONS_BEGIN,
LOAD_QUESTIONS_SUCCESS,
DELETE_QUESTION_SUCCESS } from 'Services/course/Pages/QuestionsPage/tests/node_modules/Services/course/Actions/Questions';

import {
loadQuestions,
addNewQuestion,
saveQuestion,
deleteQuestion } from 'Services/course/Pages/QuestionsPage/tests/node_modules/Services/course/Actions/Questions';  

jest.mock('../../../Api');

describe('Questions', () => {  

  let question = {
    questions:[],
    files:[],
    coursesCovered:null,
    lessonsCovered:null,
    lessonId: "LESSON5fab4846c2a96278c56381c9",
    studentId: "STUDENT5fab4846c2a96278c56381c9",
    operatorId: "OPERATOR5fab4846c2a96278c56381c9",
    examId: "EXAM5fab4846c2a96278c56381c9",
    assignmentId: "ASSIGNMENT5fab4846c2a96278c56381c9"
  };

  let newQuestion = {
    questions:[],
    files:[],
    coursesCovered:null,
    lessonsCovered:null,
    lessonId: "LESSON5fab4846c2a96278c56381c9",
    studentId: "STUDENT5fab4846c2a96278c56381c9",
    operatorId: "OPERATOR5fab4846c2a96278c56381c9",
    examId: "EXAM5fab4846c2a96278c56381c9",
    assignmentId: "ASSIGNMENT5fab4846c2a96278c56381c9",
    _id: "5fab4846c2a96278c56381c9",
 };

  let questionToRemove = {
    _id: "5fab4846c2a96278c56381c8"
}


   it('Adds A Questions.', async () => {

    const mockDispatch = jest.fn();

    console.log(question)

    await addNewQuestion(question)(mockDispatch)

    console.log('ADD NEW Questions',  mockDispatch.mock.calls[1][0]);
    console.log(mockDispatch.mock.calls[1][0]);
    expect(mockDispatch.mock.calls[0][0]).toEqual({
       type: ADD_QUESTION_BEGIN
    });
    expect(mockDispatch.mock.calls[1][0]).toEqual({
        type: ADD_QUESTION_SUCCESS,
        payload: {
          questions:[],
          files:[],
          coursesCovered:null,
          lessonsCovered:null,
          lessonId: "LESSON5fab4846c2a96278c56381c9",
          studentId: "STUDENT5fab4846c2a96278c56381c9",
          operatorId: "OPERATOR5fab4846c2a96278c56381c9",
          examId: "EXAM5fab4846c2a96278c56381c9",
          assignmentId: "ASSIGNMENT5fab4846c2a96278c56381c9"
        }
    });
  });

  it('Updates An Existing Questions.', async () => {

    const mockDispatch = jest.fn();

    await saveQuestion( newQuestion )(mockDispatch)

    console.log('SAVE QUESTION',  mockDispatch.mock.calls)
    console.log('SAVE QUESTION',  mockDispatch.mock.calls[1][0])
    expect(mockDispatch.mock.calls.length).toBe(3);
    expect(mockDispatch.mock.calls[0][0]).toEqual({
      type: SAVE_QUESTION_BEGIN
    });

    console.log(mockDispatch.mock.calls[1][0].type)
    expect(mockDispatch.mock.calls[1][0].type).toEqual( SAVE_QUESTION_SUCCESS );
    expect(mockDispatch.mock.calls[1][0].payload['testobject'].markDownContent).toEqual( newQuestion?.markDownContent );
});

it('Loads Questions', async () =>  {

  const mockDispatch = jest.fn();

  await loadQuestions()(mockDispatch);

  console.log('LOAD ONLINE QUESTION',  mockDispatch.mock.calls[1][0].payload.length);
  console.log(mockDispatch.mock.calls[1][0].payload);
  expect(mockDispatch.mock.calls.length).toBe(2);
  expect(mockDispatch.mock.calls[0][0]).toEqual({
        type: LOAD_QUESTIONS_BEGIN
  });
  console.log(mockDispatch.mock.calls[1][0])
  expect(mockDispatch.mock.calls[1][0].type).toEqual( LOAD_QUESTIONS_SUCCESS );
  expect(mockDispatch.mock.calls[1][0].payload.length).toEqual(3);
});

it('Removes A Question', async () =>  {

  const mockDispatch = jest.fn();

  await deleteQuestion(questionToRemove)(mockDispatch);

  console.log('DELETE QUESTION',  mockDispatch.mock.calls);
  expect(mockDispatch.mock.calls.length).toBe(1);  
  console.log(mockDispatch.mock.calls[0][0])
  expect(mockDispatch.mock.calls[0][0].type).toEqual(DELETE_QUESTION_SUCCESS);
});
});

