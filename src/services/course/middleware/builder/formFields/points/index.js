import { 
saveFormFieldAnswerWithPoints,
saveStudentsAnswerPoints } from "services/course/actions/formfieldanswers";

import { 
addNewFormFieldPoint,
saveFormFieldPoint } from "services/course/actions/formquestionpoints";

const pointHelper = {
  Points : "points",
  CummulativePoints : "cummulativePoints"
};

export function assignPointsToQuestionForCorrectAnswer(  store, answerFormInputField ) {
  
  if ( ! answerFormInputField  ) return;
  
  let studentsPointsObject = Object?.values( store?.getState().formFieldAnswers?.studentsCummulativePointsRecieved )?.find( ans => ans?.userId === answerFormInputField?.userId 
    && ans?.formUuId === answerFormInputField?.formUuId && ans?.formName === answerFormInputField?.formName ) ;

  let persistedPointsObject = Object?.values( store?.getState().formFieldPoints?.studentsCummulativePointsRecieved )?.find( ans => ans?.userId === answerFormInputField?.userId 
    && ans?.formUuId === answerFormInputField?.formUuId  && ans?.formName === answerFormInputField?.formName ) ;

  if ( !studentsPointsObject ) {
    studentsPointsObject = hydrateCurrentCummulativePointsFromPersistence( store, persistedPointsObject, studentsPointsObject );
  }

  let currentFormField = Object.values( store.getState().formFields?.formFields )?.find( field => field?._id ===  answerFormInputField?.fieldId ), cummulativePoints = 0;
  
  let points = getPointsForStudentAnswers( currentFormField, answerFormInputField ), assignedPoints = 0;

  if ( points ) {
    return handleCorrectAnswers( studentsPointsObject, persistedPointsObject, answerFormInputField, currentFormField );
  } else {
    return handleInCorrectAnswers( studentsPointsObject, persistedPointsObject, answerFormInputField, currentFormField );
};

function handleCorrectAnswers( studentsPointsObject, persistedPointsObject, answerFormInputField, currentFormField ) {
  let props = {
    store,
    studentsPointsObject,
    persistedPointsObject,
    cummulativePoints: studentsPointsObject[ pointHelper?.CummulativePoints ] + points,
    currentFormField,
    answerFormInputField,
    points
  };

  return handleAnswers( props );
};

function handleInCorrectAnswers( studentsPointsObject, persistedPointsObject, answerFormInputField, currentFormField ){
  let props = {
    store,
    studentsPointsObject,
    persistedPointsObject,
    cummulativePoints: calculatePoints( studentsPointsObject, answerFormInputField, currentFormField ),
    currentFormField,
    answerFormInputField,
    points: 0
  };

  return handleAnswers( props );
}};

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

  let currentPoints = 0;

if ( studentsPointsObject?.userId ) {

  if ( persistedPointsObject?.userId ){
    store.dispatch(saveFormFieldPoint({ ...persistedPointsObject, userId: answerFormInputField?.userId, cummulativePoints, formUuId: answerFormInputField?.formUuId }));
  }

  store.dispatch(saveStudentsAnswerPoints({ userId: answerFormInputField?.userId, cummulativePoints, formUuId: answerFormInputField?.formUuId, formName: answerFormInputField?.formName }));

  currentPoints =  cummulativePoints;

} else {

  if ( !persistedPointsObject?.userId ) {
    store.dispatch(addNewFormFieldPoint({ userId: answerFormInputField?.userId, cummulativePoints: points, formUuId: answerFormInputField?.formUuId, formName: answerFormInputField?.formName }));
  }
  
  store.dispatch(saveStudentsAnswerPoints({ userId: answerFormInputField?.userId, cummulativePoints: points, formUuId: answerFormInputField?.formUuId, formName: answerFormInputField?.formName }));
}
  store.dispatch( saveFormFieldAnswerWithPoints({ ...answerFormInputField, points: points }) );

  currentPoints = points;

  return currentPoints;
};

function calculatePoints( studentsPointsObject, answerFormInputField, formField ) {

  let cummulativeStudentPoints = 0;

  if ( answerFormInputField[pointHelper?.Points] === 0 && getPointsForStudentAnswers( formField, answerFormInputField) > 0 ) {
    return cummulativeStudentPoints = ( (studentsPointsObject[ pointHelper?.CummulativePoints ] + getPointsForStudentAnswers( formField, answerFormInputField) ));

  } else if ( answerFormInputField[pointHelper?.Points] > 0 && getPointsForStudentAnswers( formField, answerFormInputField) > 0 ) {
    return cummulativeStudentPoints = ( (studentsPointsObject[ pointHelper?.CummulativePoints ] ));

  } else if ( answerFormInputField[pointHelper?.Points] > 0 && getPointsForStudentAnswers( formField, answerFormInputField) === 0 ) {
    return cummulativeStudentPoints = ( (studentsPointsObject[ pointHelper?.CummulativePoints ] - formField[pointHelper?.Points] ));

  } else if ( answerFormInputField[pointHelper?.Points] === 0 && getPointsForStudentAnswers( formField, answerFormInputField) === 0 ) {
    return cummulativeStudentPoints = ( (studentsPointsObject[ pointHelper?.CummulativePoints  ] ));
  }
};

function getPointsForStudentAnswers( question, answer ){
  if (  question?.answerKey?.toLowerCase() === "" || 
        question?.answerKey?.toLowerCase() === undefined || 
        question?.answerKey?.toLowerCase() === null  )
    return 0;

  if ( answer?.answer?.toLowerCase() === question?.answerKey?.toLowerCase() )
    return question?.points;
  else 
    return 0;
};

function hydrateCurrentCummulativePointsFromPersistence( store, persistedPointsObject, studentsPointsObject ){
  if ( persistedPointsObject && !studentsPointsObject?.userId ) {
    store.dispatch(saveStudentsAnswerPoints({ userId: persistedPointsObject?.userId, cummulativePoints: persistedPointsObject?.cummulativePoints, formUuId: persistedPointsObject?.formUuId, formName: persistedPointsObject?.formName }));
  };
  return { userId: persistedPointsObject?.userId, cummulativePoints: persistedPointsObject?.cummulativePoints, formUuId: persistedPointsObject?.formUuId, formName: persistedPointsObject?.formName };
};

