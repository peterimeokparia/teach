import { 
getPreviouslySelectedDropDownAnswer } from "services/course/pages/FormBuilder/FormFields/component/DropDown/helpers";

describe('Dropdown', () => {  

    const previousElement = {
        _id: 'ObjectId618969882f65834e2f77a3f2',
        dropDownOptions: [],
        questionId:"QuestionId618969882f65834e2f77a3f2",
        fieldId: "FormFieldId618969882f65834e2f77a3f2",
        userId:"UserId618969882f65834e2f77a3f2",
        points: 10,
        answer: "RightAnswer",
        answerKey: "RightAnswer"        
    };

    const questionValuePoint = 10;

    const questionId = "QuestionId618969882f65834e2f77a3f2";

    const fieldId = "FormFieldId618969882f65834e2f77a3f2";

    const formFieldAnswers = [
        previousElement
    ];

    it('gets the previously selected dropdown element.', () => {

    let points = getPreviouslySelectedDropDownAnswer( formFieldAnswers, questionId, fieldId );

    expect( points !== undefined ).toEqual(true);

  });

  it('gets the previously selected dropdown element point.', () => {

    let prevPoint = getPreviouslySelectedDropDownAnswer( formFieldAnswers, questionId, fieldId );

    expect( prevPoint ).toEqual( questionValuePoint );

  });


  const previousElement2 = {
    _id: 'ObjectId618969882f65834e2f77a3A1',
    dropDownOptions: [],
    questionId:"QuestionId618969882f65834e2f77a3A1",
    fieldId: "FormFieldId618969882f65834e2f77a3A1",
    userId:"UserId618969882f65834e2f77a3A1",
    points: 0,
    answer: "RightAnswer",
    answerKey: null        
  };

  const wrongAnswerPoints = 0;

  const questionId2 = "QuestionId618969882f65834e2f77a3A1";

  const fieldId2 = "FormFieldId618969882f65834e2f77a3A1";

  const formFieldAnswers2 = [
      previousElement2
  ];

  it('gets the previously selected dropdown element point. Incorrect answer points.', () => {

    let prevPoint = getPreviouslySelectedDropDownAnswer( formFieldAnswers2, questionId2, fieldId2 );

    expect( prevPoint ).toEqual( wrongAnswerPoints );

  });

});
  
  


