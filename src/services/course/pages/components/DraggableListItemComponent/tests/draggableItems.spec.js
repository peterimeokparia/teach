import { 
getSortedRecordsBasedOnPosition,
getCummulativePointsForCorrectlySortedItems } from "services/course/pages/components/DraggableListItemComponent/helper";

import isEqual from "react-fast-compare";

describe('Sorted records based on position', () => {  

    const elementOne = {
        _id: 'ObjectId618969882f65834e2f77a3f1',
        dropDownOptions: [],
        questionId:"QuestionId618969882f65834e2f77a3f2",
        fieldId: "FormFieldId618969882f65834e2f77a3f2",
        userId:"UserId618969882f65834e2f77a3f2",
        points: 10,
        answer: "RightAnswer",
        answerKey: "RightAnswer",
        position: 2     
    };

    const elementTwo = {
      _id: 'ObjectId618969882f65834e2f77a3f2',
      dropDownOptions: [],
      questionId:"QuestionId618969882f65834e2f77a3f2",
      fieldId: "FormFieldId618969882f65834e2f77a3f2",
      userId:"UserId618969882f65834e2f77a3f2",
      points: 10,
      answer: "RightAnswer",
      answerKey: "RightAnswer",
      position: 3     
   };

   const elementThree = {
    _id: 'ObjectId618969882f65834e2f77a3f3',
    dropDownOptions: [],
    questionId:"QuestionId618969882f65834e2f77a3f2",
    fieldId: "FormFieldId618969882f65834e2f77a3f2",
    userId:"UserId618969882f65834e2f77a3f2",
    points: 10,
    answer: "RightAnswer",
    answerKey: "RightAnswer",
    position: 1     
 };

   

  it('returns a collection', () => { 

      const itemCollection = [
        elementOne, elementThree, elementTwo
      ];

    let points = getSortedRecordsBasedOnPosition( itemCollection );

    expect( points?.length > 0 ).toEqual(true);

  });


  it('returns a collection of items sorted by position', () => {

    const itemCollection = [
      elementOne, elementThree, elementTwo
    ];

    const sortedItems = [
      elementThree, elementOne, elementTwo
    ];

    let sortedRecords = getSortedRecordsBasedOnPosition( itemCollection );

     expect( isEqual(sortedRecords,  sortedItems) ).toEqual(true);

  });


  it('returns cummulative points for correctly sorted items', () => {

    const itemCollection = [
      elementOne, elementThree, elementTwo
    ];

    const sortedItemsKey = [
      elementThree, elementOne, elementTwo
    ];

    let sortedRecords = getSortedRecordsBasedOnPosition( itemCollection );

     expect( getCummulativePointsForCorrectlySortedItems( sortedRecords, sortedItemsKey) ).toEqual(30);

  });

});



