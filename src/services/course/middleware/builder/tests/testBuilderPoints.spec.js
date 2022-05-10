import React from 'react';
import renderer from 'react-test-renderer';
import thunk from "redux-thunk"; 
import * as reactRedux from 'react-redux';
import { Provider, useSelector } from "react-redux";
import { applyMiddleware } from 'redux'; 
import configureStore from 'redux-mock-store';

import { 
saveFormFieldAnswerWithPoints,
saveStudentsAnswerPoints } from "services/course/actions/formfieldanswers";
  
import { 
addNewFormFieldPoint,
saveFormFieldPoint } from "services/course/actions/formquestionpoints";

import { 
formTypes } from 'services/course/pages/FormBuilder/helpers';

import {
assignPointsToQuestionForCorrectAnswer } from 'services/course/middleware/builder/formFields/points';

jest.mock('../../../api');

const mockStore = configureStore([]);
  
let operatorBusinessName= "boomingllc";
let selectedUserId= "PERSON010010100000047";

describe('Calculate Test Points', () =>  {  

  let answerFormInputField = { 
    _id:"619b2ce6661b2c167013d733",
    dropDownOptions:["Select","10J","20J","30J","40J","50J"],
    files:[],
    formId:"613ac665f6ca0ce27d863330",
    parentComponentId:"0d0fcd03-2bc9-4bb0-ad0c-728e1ff40996",
    formFieldGroupId:"0d0fcd03-2bc9-4bb0-ad0c-728e1ff40996",
    enableFormFieldGroup:false,
    inputType:"dropdown",
    inputValue:"10J",
    labelType:"Roman",
    labelValue:"",
    formFieldCreatedOnDateTime:{"$date":{"$numberLong":"1637379924301"}},
    formFieldCreatedBy:"6165117e729ccf50b9ac7e64",
    markDownContent:null,
    answer:"50J",
    answerKey:"50J",
    points:0,
    xAxisformFieldPosition:{"$numberInt":"681"},
    yAxisformFieldPosition:{"$numberInt":"0"},
    videoUrl:"",
    questionId:"6189ee1140c1831561968589",
    userId:"61651592729ccf50b9ac7f11",
    fieldId:"61986f54c68ddbacfa38bffd",
    formType:formTypes?.quizzwithpoints,
    formName:"6165a2fbd0dc116dbc1cd8da",
    formUuId:"6165a2fbd0dc116dbc1cd8da",
    __v:{"$numberInt":"0"}
  };

  let answerFormInputField2 = { 
    _id:"619b2ce6661b2c167013d733",
    dropDownOptions:["Select","10J","20J","30J","40J","50J"],
    files:[],
    formId:"613ac665f6ca0ce27d863330",
    parentComponentId:"0d0fcd03-2bc9-4bb0-ad0c-728e1ff40996",
    formFieldGroupId:"0d0fcd03-2bc9-4bb0-ad0c-728e1ff40996",
    enableFormFieldGroup:false,
    inputType:"dropdown",
    inputValue:"10J",
    labelType:"Roman",
    labelValue:"",
    formFieldCreatedOnDateTime:{"$date":{"$numberLong":"1637379924301"}},
    formFieldCreatedBy:"6165117e729ccf50b9ac7e64",
    markDownContent:null,
    answer:"30J",
    answerKey:"",
    points:0,
    xAxisformFieldPosition:{"$numberInt":"681"},
    yAxisformFieldPosition:{"$numberInt":"0"},
    videoUrl:"",
    questionId:"6189ee1140c1831561968589",
    userId:"61651592729ccf50b9ac7f11",
    fieldId:"61986f54c68ddbacfa38bffd2",
    formType:formTypes?.quizzwithpoints,
    formName:"6165a2fbd0dc116dbc1cd8da",
    formUuId:"6165a2fbd0dc116dbc1cd8da",
    __v:{"$numberInt":"0"}
  };

  let answerFormInputField3 = { 
    _id:"619b2ce6661b2c167013d733",
    dropDownOptions:["Select","10J","20J","30J","40J","50J"],
    files:[],
    formId:"613ac665f6ca0ce27d863330",
    parentComponentId:"0d0fcd03-2bc9-4bb0-ad0c-728e1ff40996",
    formFieldGroupId:"0d0fcd03-2bc9-4bb0-ad0c-728e1ff40996",
    enableFormFieldGroup:false,
    inputType:"dropdown",
    inputValue:"10J",
    labelType:"Roman",
    labelValue:"",
    formFieldCreatedOnDateTime:{"$date":{"$numberLong":"1637379924301"}},
    formFieldCreatedBy:"6165117e729ccf50b9ac7e64",
    markDownContent:null,
    answer:"30J",
    answerKey:"",
    points:0,
    xAxisformFieldPosition:{"$numberInt":"681"},
    yAxisformFieldPosition:{"$numberInt":"0"},
    videoUrl:"",
    questionId:"6189ee1140c1831561968589",
    userId:"61651592729ccf50b9ac7f11",
    fieldId:"61986f54c68ddbacfa38bffd3",
    formType:formTypes?.quizzwithpoints,
    formName:"6165a2fbd0dc116dbc1cd8da",
    formUuId:"6165a2fbd0dc116dbc1cd8da",
    __v:{"$numberInt":"0"}
  };

  let formFields = {
    0:{
      _id:"61986f54c68ddbacfa38bffd",
    dropDownOptions:["Select","10J","20J","30J","40J","50J"],
    files:[],
    formId:"613ac665f6ca0ce27d863330",
    parentComponentId:"0d0fcd03-2bc9-4bb0-ad0c-728e1ff40996",
    formFieldGroupId:"0d0fcd03-2bc9-4bb0-ad0c-728e1ff40996",
    formType:formTypes?.quizzwithpoints,
    formName:"6165a2fbd0dc116dbc1cd8da",
    formUuId:"6165a2fbd0dc116dbc1cd8da",
    enableFormFieldGroup:false,
    selected:false,
    inputType:"dropdown",
    inputValue:"50J",
    labelType:"Roman",
    labelValue:"",
    formFieldCreatedOnDateTime:{"$date":{"$numberLong":"1637379924301"}},
    formFieldCreatedBy:"6165117e729ccf50b9ac7e64",
    markDownContent:null,
    answer:null,
    answerKey:"50J",
    points:40,
    xAxisformFieldPosition:{"$numberInt":"330"},
    yAxisformFieldPosition:{"$numberInt":"373"},
    videoUrl:"",
    questionId:"6189ee1140c1831561968589",
    userId:"6165117e729ccf50b9ac7e64",
    v:{"$numberInt":"0"}
  },
  1:{
    _id:"61986f54c68ddbacfa38bffd2",
  dropDownOptions:["Select","10J","20J","30J","40J","50J"],
  files:[],
  formId:"613ac665f6ca0ce27d863330",
  parentComponentId:"0d0fcd03-2bc9-4bb0-ad0c-728e1ff40996",
  formFieldGroupId:"0d0fcd03-2bc9-4bb0-ad0c-728e1ff40996",
  formType:formTypes?.quizzwithpoints,
  formName:"6165a2fbd0dc116dbc1cd8da",
  formUuId:"6165a2fbd0dc116dbc1cd8da",
  enableFormFieldGroup:false,
  selected:false,
  inputType:"dropdown",
  inputValue:"50J",
  labelType:"Roman",
  labelValue:"",
  formFieldCreatedOnDateTime:{"$date":{"$numberLong":"1637379924301"}},
  formFieldCreatedBy:"6165117e729ccf50b9ac7e64",
  markDownContent:null,
  answer:null,
  answerKey:"30J",
  points:25,
  xAxisformFieldPosition:{"$numberInt":"330"},
  yAxisformFieldPosition:{"$numberInt":"373"},
  videoUrl:"",
  questionId:"6189ee1140c1831561968589",
  userId:"6165117e729ccf50b9ac7e64",
  v:{"$numberInt":"0"}
},
3:{
_id:"61986f54c68ddbacfa38bffd3",
dropDownOptions:["Select","10J","20J","30J","40J","50J"],
files:[],
formId:"613ac665f6ca0ce27d863330",
parentComponentId:"0d0fcd03-2bc9-4bb0-ad0c-728e1ff40996",
formFieldGroupId:"0d0fcd03-2bc9-4bb0-ad0c-728e1ff40996",
formType:formTypes?.quizzwithpoints,
formName:"6165a2fbd0dc116dbc1cd8da",
formUuId:"6165a2fbd0dc116dbc1cd8da",
enableFormFieldGroup:false,
selected:false,
inputType:"dropdown",
inputValue:"50J",
labelType:"Roman",
labelValue:"",
formFieldCreatedOnDateTime:{"$date":{"$numberLong":"1637379924301"}},
formFieldCreatedBy:"6165117e729ccf50b9ac7e64",
markDownContent:null,
answer:null,
answerKey:"70J",
points:25,
xAxisformFieldPosition:{"$numberInt":"330"},
yAxisformFieldPosition:{"$numberInt":"373"},
videoUrl:"",
questionId:"6189ee1140c1831561968589",
userId:"6165117e729ccf50b9ac7e64",
v:{"$numberInt":"0"}
},
    
  }

  let cummulativePoints = 0;

  let  store = mockStore({
        operators: { operators: {_id: "5fcb0e19fd5e0117dc09dcfa", operatorBusinessName} },
        notifications: { pushNotificationSubscribers : {_id:"5fcb0e19fd5e0117dc09dcfa", operatorBusinessName, operatorId: "5fcb0e19fd5e0117dc09dcfa" } },
        users: { users: {_id: "PERSON5fcb0e19fd5e0117dc09dcfa", operatorBusinessName, operatorId: "5fcb0e19fd5e0117dc09dcfa" }},
        courses: { courses: {_id: "COURSE5fcb0e19fd5e0117dc09dcfa", operatorBusinessName, operatorId: "5fcb0e19fd5e0117dc09dcfa" }},
        grades: { grades: {_id: "COURSE5fcb0e19fd5e0117dc09dcfa", operatorBusinessName, operatorId: "5fcb0e19fd5e0117dc09dcfa" }},
        classrooms: { classrooms: {displaySideBarDropDown: false }},
        sessions: { sessions: {_id: "SESSIONS5fcb0e19fd5e0117dc09dcfa", numberOfSessions: 9, totalNumberOfSessions: 1, status: true } },
        lessons: { lessons: { selectedLessonFromLessonPlanDropDown: "Test Lesson" } },
        courses: { courses: { selectedCourseFromLessonPlanCourseDropDown: "Test Course" }  },
        meetings: { meetings: {_id: "MEETING5fcb0e19fd5e0117dc09dcfa", numberOfSessions: 9, totalNumberOfSessions: 1, status: true }  },
        formFieldAnswers: { studentsCummulativePointsRecieved: { userId: answerFormInputField?.userId, cummulativePoints, formUuId: answerFormInputField?.formUuId } },
        formFieldPoints: { studentsCummulativePointsRecieved: { userId: answerFormInputField?.userId, cummulativePoints, formUuId: answerFormInputField?.formUuId } },
        formFields: { formFields: { ...formFields } }
    }, applyMiddleware(thunk));

  const useSelectorMock = jest.spyOn(reactRedux, 'useSelector');
  const useDispatchMock = jest.spyOn(reactRedux, 'useDispatch');
  const storeDispatchMock = jest.spyOn(store, 'dispatch');

 
  beforeEach(() => {
    useSelectorMock.mockClear();
    useDispatchMock.mockClear();
    storeDispatchMock.mockClear();
  });

  it('adds the correct point(s)', async () => {

    const dispatch = jest.fn();
    useDispatchMock.mockReturnValue(dispatch)
    const mockDispatch = jest.fn();
   
    let assignedPoints = assignPointsToQuestionForCorrectAnswer( store,  answerFormInputField );
    answerFormInputField = { ...answerFormInputField, points: assignedPoints} 
    expect(assignedPoints).toEqual( 40 );
  });


it('deducts the correct point(s)', async () => {

  const dispatch = jest.fn();
  useDispatchMock.mockReturnValue(dispatch)
  const mockDispatch = jest.fn();
 
  let assignedPoints = assignPointsToQuestionForCorrectAnswer( store,  answerFormInputField2 );
  answerFormInputField2 = { ...answerFormInputField2, points: assignedPoints} 
  expect(assignedPoints).toEqual( 25 );

  assignedPoints = assignPointsToQuestionForCorrectAnswer( store,  {...answerFormInputField2, answer: "300J",} );
  answerFormInputField2 = { ...answerFormInputField2, points: assignedPoints} 
  expect( assignedPoints ).toEqual( 0 );

});

it('deducts the correct point(s) - No Negative Points', async () => {

  const dispatch = jest.fn();
  useDispatchMock.mockReturnValue(dispatch)
  const mockDispatch = jest.fn();
 
  let assignedPoints = assignPointsToQuestionForCorrectAnswer( store,  answerFormInputField3 );
  answerFormInputField2 = { ...answerFormInputField2, points: assignedPoints} 
  expect(assignedPoints).toEqual( 0 );

  assignedPoints = assignPointsToQuestionForCorrectAnswer( store,  {...answerFormInputField3, answer: "300J",} );
  answerFormInputField3 = { ...answerFormInputField3, points: assignedPoints} 
  expect( assignedPoints ).toEqual( 0 );

});

});





