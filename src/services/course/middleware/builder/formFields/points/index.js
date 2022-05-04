import { 
saveStudentsAnswerPoints } from "services/course/actions/formfieldanswers";

import { 
addNewFormFieldPoint,
saveFormFieldPoint } from "services/course/actions/formquestionpoints";

import {
inputType } from 'services/course/pages/QuestionsPage/helpers';

import isEqual from "react-fast-compare";

const pointHelper = {
  Points : "points",
  CummulativePoints : "cummulativePoints"
};

export function assignPointsToQuestionForCorrectAnswer(  store, answerFormInputField ) {
  
  if ( !answerFormInputField || ( answerFormInputField?.inputType === inputType.RadioButton && !answerFormInputField['selected'] )  ) return;
  
  let studentsPointsObject = Object?.values( store?.getState().formFieldAnswers?.studentsCummulativePointsRecieved )?.find( ans => ans?.userId === answerFormInputField?.userId 
    && ans?.formUuId === answerFormInputField?.formUuId && ans?.formName === answerFormInputField?.formName );

  let persistedPointsObject = Object?.values( store?.getState().formFieldPoints?.studentsCummulativePointsRecieved )?.find( ans => ans?.userId === answerFormInputField?.userId 
    && ans?.formUuId === answerFormInputField?.formUuId  && ans?.formName === answerFormInputField?.formName );

  if ( !studentsPointsObject ) {
    studentsPointsObject = hydrateCurrentCummulativePointsFromPersistence( store, persistedPointsObject, studentsPointsObject );
  }

  let currentFormField = Object.values( store.getState().formFields?.formFields )?.find( field => field?._id ===  answerFormInputField?.fieldId ), cummulativePoints = 0;
  
  const points = getPointsForStudentAnswers( currentFormField, answerFormInputField ), assignedPoints = 0;

  handleToggleAnswers( studentsPointsObject, answerFormInputField, currentFormField, points );

  handleCheckBoxAnswers( studentsPointsObject, answerFormInputField, currentFormField, points );

  handleRadioButtonAnswers( studentsPointsObject, answerFormInputField, points );

  handleInputFieldAnswers( studentsPointsObject, answerFormInputField, points );

  function handleToggleAnswers( studentsPointsObject, answerFormInputField, currentFormField, points ) {

    if ( answerFormInputField?.inputType !== inputType.Toggle ) return;
  
    let props = {}; const cummulativeStudentPoints = function( cummulativePoints ){
      return cummulativePoints < 0 ? 0 : cummulativePoints;    
    };

    const isCorrectAnswer = ( answerFormInputField['answerKey'] === answerFormInputField['answer'] );
    const inCorrectAnswer = ( answerFormInputField['answerKey'] !== answerFormInputField['answer'] );
    const calculatePointsForCorrectAnswer = cummulativeStudentPoints( (studentsPointsObject[ pointHelper?.CummulativePoints ] + currentFormField[pointHelper?.Points] ));
    const calculatePointsForInCorrectAnswer = cummulativeStudentPoints( (studentsPointsObject[ pointHelper?.CummulativePoints ] - currentFormField[pointHelper?.Points] ));
  
    return handleAnswers( handleAnswersProps(
      isCorrectAnswer, 
      inCorrectAnswer, 
      calculatePointsForCorrectAnswer,
      calculatePointsForInCorrectAnswer,
      points, 
      points
    ) );
}

function handleCheckBoxAnswers( studentsPointsObject, answerFormInputField, currentFormField, points ) {

  if ( answerFormInputField?.inputType !== inputType.CheckBox ) return; 

  if ( !( answerFormInputField['answerKey'] === answerFormInputField['inputValue'] ) ) return;

  const cummulativeStudentPoints = function( cummulativePoints ){
    return cummulativePoints < 0 ? 0 : cummulativePoints;    
  };

  const isCorrectAnswer = ( answerFormInputField['selected'] && answerFormInputField['answerKey'] === answerFormInputField['inputValue']  );
  const inCorrectAnswer = ( !answerFormInputField['selected'] && answerFormInputField['answerKey'] === answerFormInputField['inputValue'] );
  const calculatePointsForCorrectAnswer = cummulativeStudentPoints( (studentsPointsObject[ pointHelper?.CummulativePoints ] + currentFormField[pointHelper?.Points] ));
  const calculatePointsForInCorrectAnswer = cummulativeStudentPoints( (studentsPointsObject[ pointHelper?.CummulativePoints ] - currentFormField[pointHelper?.Points] ));

  return handleAnswers( handleAnswersProps(
    isCorrectAnswer, 
    inCorrectAnswer, 
    calculatePointsForCorrectAnswer,
    calculatePointsForInCorrectAnswer,
    points, 
    points
  ) );
}

function handleRadioButtonAnswers( studentsPointsObject, answerFormInputField, points ){

  if ( answerFormInputField?.inputType !== inputType.RadioButton ) return;

  const cummulativeStudentPoints = function( cummulativePoints ){
    return cummulativePoints < 0 ? 0 : cummulativePoints;    
  };

  const isCorrectAnswer = ( points > 0  && answerFormInputField['selected'] && answerFormInputField['answerKey'] === answerFormInputField['inputValue']  );
  const inCorrectAnswer = ( points === 0 && answerFormInputField['selected'] );
  const calculatePointsForCorrectAnswer = studentsPointsObject[ pointHelper?.CummulativePoints ] + points;
  const calculatePointsForInCorrectAnswer = cummulativeStudentPoints( (studentsPointsObject[ pointHelper?.CummulativePoints ] - answerFormInputField?.points ));

  return handleAnswers( handleAnswersProps(
    isCorrectAnswer, 
    inCorrectAnswer, 
    calculatePointsForCorrectAnswer,
    calculatePointsForInCorrectAnswer,
    points, 
    0
  ) );
}

function handleInputFieldAnswers( studentsPointsObject, answerFormInputField, points ) {

  if ( answerFormInputField?.inputType === inputType.CheckBox || answerFormInputField?.inputType === inputType.Toggle ) return;

  if ( answerFormInputField?.inputType === inputType.RadioButton ) return;

  const cummulativeStudentPoints = function( cummulativePoints ){
    return cummulativePoints < 0 ? 0 : cummulativePoints;    
  };

  const isCorrectAnswer = ( points > 0 ), inCorrectAnswer = ( points === 0 );
  const calculatePointsForCorrectAnswer = studentsPointsObject[ pointHelper?.CummulativePoints ] + points;
  const calculatePointsForInCorrectAnswer = cummulativeStudentPoints( (studentsPointsObject[ pointHelper?.CummulativePoints ] - answerFormInputField?.points ));

  return handleAnswers( handleAnswersProps(
    isCorrectAnswer, 
    inCorrectAnswer, 
    calculatePointsForCorrectAnswer,
    calculatePointsForInCorrectAnswer,
    points, 
    points
  ) );
}

function handleAnswersProps(isAnswer, inCorrectAnswer, calcCorrectAnsPoints, calcInCorrectAnsPoint, correctAnsPoints, inCorrectAnswerPoints){

  if ( isAnswer ) {
    return handlePoints( calcCorrectAnsPoints, correctAnsPoints);
  }
  
  if ( inCorrectAnswer ) {
    return handlePoints( calcInCorrectAnsPoint, inCorrectAnswerPoints);
  }

}

function handlePoints(cummulativePoints, points) {
  return {
    store,
    studentsPointsObject,
    persistedPointsObject,
    cummulativePoints: cummulativePoints,
    currentFormField,
    answerFormInputField,
    points
  };
}
};

function handleAnswers( props ) {
    
  let {
    store,
    studentsPointsObject,
    persistedPointsObject,
    cummulativePoints,
    currentFormField,
    answerFormInputField,
    points
  } = props;

  let currentPoints = ( !getStudentPoints( props ) ) ? points : getStudentPoints( props ) ;

  if ( !currentPoints ) {

    if ( !persistedPointsObject?.userId ) {

      store.dispatch(addNewFormFieldPoint({ userId: answerFormInputField?.userId, cummulativePoints: points, formUuId: answerFormInputField?.formUuId, formName: answerFormInputField?.formName }));

    }
    
    store.dispatch(saveStudentsAnswerPoints({ userId: answerFormInputField?.userId, cummulativePoints: points, formUuId: answerFormInputField?.formUuId, formName: answerFormInputField?.formName }));

  } 
  
  return currentPoints;
}

function getStudentPoints( props ) {

  let {
    store,
    studentsPointsObject,
    persistedPointsObject,
    cummulativePoints,
    currentFormField,
    answerFormInputField,
    points
  } = props;

  if ( !studentsPointsObject?.userId ) return undefined;

  if ( persistedPointsObject?.userId ) {
  
    store.dispatch(saveFormFieldPoint({ ...persistedPointsObject, userId: answerFormInputField?.userId, cummulativePoints, formUuId: answerFormInputField?.formUuId }));

  }

  store.dispatch(saveStudentsAnswerPoints({ userId: answerFormInputField?.userId, cummulativePoints, formUuId: answerFormInputField?.formUuId, formName: answerFormInputField?.formName }));
  
  return cummulativePoints;
}

function getPointsForStudentAnswers( question, answer ){
       
  if (  question?.answerKey?.toLowerCase() === "" || 
        question?.answerKey?.toLowerCase() === undefined || 
        question?.answerKey?.toLowerCase() === null ||
        question?.answerKey === null  )

  return 0;

  return getPointsForCorrectAnswer( question, answer );
}

function getPointsForCorrectAnswer( question, answer ) {

  const isLowerCaseMatch =  ( answer?.answer?.toLowerCase() === question?.answerKey?.toLowerCase() );
  const isUpperCaseMatch =  ( answer?.answer?.toUpperCase() === question?.answerKey?.toUpperCase() );
  const isMatch =  ( answer?.answer?.trim() === question?.answerKey?.trim() );
  const isDeepEqual = isEqual( answer?.answer,  question?.answerKey );

  let correctAnswerMatched = ( isMatch && isLowerCaseMatch && isUpperCaseMatch &&  isDeepEqual );

  if ( !correctAnswerMatched ) return 0

  return question?.points;

}

function hydrateCurrentCummulativePointsFromPersistence( store, persistedPointsObject, studentsPointsObject ){
  if ( persistedPointsObject && !studentsPointsObject?.userId ) {
    store.dispatch(saveStudentsAnswerPoints({ userId: persistedPointsObject?.userId, cummulativePoints: persistedPointsObject?.cummulativePoints, formUuId: persistedPointsObject?.formUuId, formName: persistedPointsObject?.formName }));
  };
  return { userId: persistedPointsObject?.userId, cummulativePoints: persistedPointsObject?.cummulativePoints, formUuId: persistedPointsObject?.formUuId, formName: persistedPointsObject?.formName };
}
