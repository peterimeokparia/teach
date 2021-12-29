import {
ADD_ONLINEQUESTION_BEGIN,
ADD_ONLINEQUESTION_SUCCESS,
SAVE_ONLINEQUESTION_BEGIN,
SAVE_ONLINEQUESTION_SUCCESS,
LOAD_ONLINEQUESTIONS_BEGIN,
LOAD_ONLINEQUESTIONS_SUCCESS,
DELETE_ONLINEQUESTION_SUCCESS } from 'services/course/actions/onlinequestions';

import {
loadOnlineQuestions,
addNewOnlineQuestion,
saveOnlineQuestion,
deleteOnlineQuestion } from 'services/course/actions/onlinequestions'; 

jest.mock('../../../Api');

describe('OnlineQuestions', () => {  

  let question = {
    courseId: "COURSE5fab4846c2a96278c56381c9",
    questionCreatedBy:"Peter",
    questionCreatedOnDateTime: '06/20/2021',
    videoUrl:"http://localhost:3000/videos/OnlineQuestionVideoMarkDownEditors_162498...",
    userId: "PERSON5fab4846c2a96278c56381c9",
    markDownContent: "Solar System"
  };

  let newQuestion = {
    markDownContent: 'Test New Questions Title',
    userId: "PERSON5fab4846c2a96278c56381c9",
    questionCreatedOnDateTime: question?.questionCreatedOnDateTime,
    courseId: question?.courseId,
    questionCreatedBy:"Peter",
    videoUrl:"http://localhost:3000/videos/OnlineQuestionVideoMarkDownEditors_162498...",
    _id: "5fab4846c2a96278c56381c9",
  };

  let questionToRemove = {
    _id: "5fab4846c2a96278c56381c8"
  }

    it('Adds A New Questions.', async () => {

    const mockDispatch = jest.fn();

    await addNewOnlineQuestion(question)(mockDispatch)

    expect(mockDispatch.mock.calls[0][0]).toEqual({
        type: ADD_ONLINEQUESTION_BEGIN
    });

    expect(mockDispatch.mock.calls[1][0]).toEqual({
        type: ADD_ONLINEQUESTION_SUCCESS,
        payload: {
          markDownContent: question?.markDownContent,
          questionCreatedBy:"Peter",
          courseId: question?.courseId,
          questionCreatedOnDateTime: question?.questionCreatedOnDateTime,
          videoUrl:"http://localhost:3000/videos/OnlineQuestionVideoMarkDownEditors_162498...",
          userId: question?.userId,
        }
    });
  });

  it('Updates An Existing Questions.', async () => {

    const mockDispatch = jest.fn();

    await saveOnlineQuestion( newQuestion )(mockDispatch)

    expect(mockDispatch.mock.calls.length).toBe(3);
    expect(mockDispatch.mock.calls[0][0]).toEqual({
      type: SAVE_ONLINEQUESTION_BEGIN
    });

    console.log(mockDispatch.mock.calls[1][0].type)
    expect(mockDispatch.mock.calls[1][0].type).toEqual( SAVE_ONLINEQUESTION_SUCCESS );
    expect(mockDispatch.mock.calls[1][0].payload['testobject'].markDownContent).toEqual( newQuestion?.markDownContent );
});

it('Loads Online Questions', async () =>  {

  const mockDispatch = jest.fn();

  await loadOnlineQuestions()(mockDispatch);

  console.log('LOAD ONLINE QUESTION',  mockDispatch.mock.calls[1][0].payload.length);
  console.log(mockDispatch.mock.calls[1][0].payload);
  expect(mockDispatch.mock.calls.length).toBe(2);
  expect(mockDispatch.mock.calls[0][0]).toEqual({
        type: LOAD_ONLINEQUESTIONS_BEGIN
  });
  console.log(mockDispatch.mock.calls[1][0])
  expect(mockDispatch.mock.calls[1][0].type).toEqual( LOAD_ONLINEQUESTIONS_SUCCESS );
  expect(mockDispatch.mock.calls[1][0].payload.length).toEqual(3);
});

it('Removes An Online Question', async () =>  {

  const mockDispatch = jest.fn();

  await deleteOnlineQuestion(questionToRemove)(mockDispatch);

  console.log('DELETE ONLINE QUESTION',  mockDispatch.mock.calls);
  expect(mockDispatch.mock.calls.length).toBe(1);  
  console.log(mockDispatch.mock.calls[0][0])
  expect(mockDispatch.mock.calls[0][0].type).toEqual(DELETE_ONLINEQUESTION_SUCCESS);
});
});
  
  