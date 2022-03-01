import { 
saveStudentsAnswerPoints } from "services/course/actions/formfieldanswers";

import { 
addNewFormFieldPoint,
saveFormFieldPoint } from "services/course/actions/formquestionpoints";

import {
elementMeta, inputType } from 'services/course/pages/QuestionsPage/helpers';

const pointHelper = {
  Points : "points",
  CummulativePoints : "cummulativePoints"
};

export function assignPointsToQuestionForCorrectAnswer(  store, answerFormInputField ) {
  
  if ( !answerFormInputField || ( answerFormInputField?.inputType === 'radio' && !answerFormInputField['selected'] )  ) return;
  
  let studentsPointsObject = Object?.values( store?.getState().formFieldAnswers?.studentsCummulativePointsRecieved )?.find( ans => ans?.userId === answerFormInputField?.userId 
    && ans?.formUuId === answerFormInputField?.formUuId && ans?.formName === answerFormInputField?.formName );

  let persistedPointsObject = Object?.values( store?.getState().formFieldPoints?.studentsCummulativePointsRecieved )?.find( ans => ans?.userId === answerFormInputField?.userId 
    && ans?.formUuId === answerFormInputField?.formUuId  && ans?.formName === answerFormInputField?.formName );

  if ( !studentsPointsObject ) {
    studentsPointsObject = hydrateCurrentCummulativePointsFromPersistence( store, persistedPointsObject, studentsPointsObject );
  }

  let currentFormField = Object.values( store.getState().formFields?.formFields )?.find( field => field?._id ===  answerFormInputField?.fieldId ), cummulativePoints = 0;
  
  const points = getPointsForStudentAnswers( currentFormField, answerFormInputField ), assignedPoints = 0;

  handleToggleAnswers( studentsPointsObject, persistedPointsObject, answerFormInputField, currentFormField, points );

  handleCheckBoxAnswers( studentsPointsObject, persistedPointsObject, answerFormInputField, currentFormField, points );

  handleRadioButtonAnswers( studentsPointsObject, persistedPointsObject, answerFormInputField, currentFormField, points );

  handleInputFieldAnswers( studentsPointsObject, persistedPointsObject, answerFormInputField, currentFormField, points );


  function handleToggleAnswers( studentsPointsObject, persistedPointsObject, answerFormInputField, currentFormField, points ) {

    if ( answerFormInputField?.inputType !== inputType.Toggle ) return;
  
    let props = {}; const cummulativeStudentPoints = function( cummulativePoints ){
      return cummulativePoints < 0 ? 0 : cummulativePoints;    
    };
  
    if ( answerFormInputField['answerKey'] === answerFormInputField['answer'] ) {
      props = {
        store,
        studentsPointsObject,
        persistedPointsObject,
        cummulativePoints: cummulativeStudentPoints( (studentsPointsObject[ pointHelper?.CummulativePoints ] + currentFormField[pointHelper?.Points] )),
        currentFormField,
        answerFormInputField,
        points
      };
    } 
  
    if ( answerFormInputField['answerKey'] !== answerFormInputField['answer'] ) {
      props = {
        store,
        studentsPointsObject,
        persistedPointsObject,
        cummulativePoints: cummulativeStudentPoints( (studentsPointsObject[ pointHelper?.CummulativePoints ] - currentFormField[pointHelper?.Points] )),
        currentFormField,
        answerFormInputField,
        points
      };
    }
  
    return handleAnswers( props );
};

function handleCheckBoxAnswers( studentsPointsObject, persistedPointsObject, answerFormInputField, currentFormField, points ) {

  if ( answerFormInputField?.inputType !== 'checkbox' ) return;

  if ( ( answerFormInputField?.inputType === "checkbox" ) && !( answerFormInputField['answerKey'] === answerFormInputField['inputValue'] ) ) return;

  let props = {}; const cummulativeStudentPoints = function( cummulativePoints ){
    return cummulativePoints < 0 ? 0 : cummulativePoints;    
  };

  if ( ( answerFormInputField?.inputType === "checkbox" ) && answerFormInputField['selected'] && answerFormInputField['answerKey'] === answerFormInputField['inputValue'] ) {
    props = {
      store,
      studentsPointsObject,
      persistedPointsObject,
      cummulativePoints: cummulativeStudentPoints( (studentsPointsObject[ pointHelper?.CummulativePoints ] + currentFormField[pointHelper?.Points] )),
      currentFormField,
      answerFormInputField,
      points
    };
  } 

  if ( ( answerFormInputField?.inputType === "checkbox" ) && !answerFormInputField['selected'] && answerFormInputField['answerKey'] === answerFormInputField['inputValue'] ) {
    props = {
      store,
      studentsPointsObject,
      persistedPointsObject,
      cummulativePoints: cummulativeStudentPoints( (studentsPointsObject[ pointHelper?.CummulativePoints ] - currentFormField[pointHelper?.Points] )),
      currentFormField,
      answerFormInputField,
      points
    };
  }

  return handleAnswers( props );
};

function handleRadioButtonAnswers( studentsPointsObject, persistedPointsObject, answerFormInputField, currentFormField, points ){

  if ( answerFormInputField?.inputType !== 'radio' ) return;

  let props = {}; const cummulativeStudentPoints = function( cummulativePoints ){
    return cummulativePoints < 0 ? 0 : cummulativePoints;    
  };

  if ( points > 0 && answerFormInputField?.inputType === 'radio' ){

    props = {
      store,
      studentsPointsObject,
      persistedPointsObject,
      cummulativePoints: studentsPointsObject[ pointHelper?.CummulativePoints ] + points,
      currentFormField,
      answerFormInputField,
      points
    };
  
  }

  if ( points === 0 && answerFormInputField?.inputType === 'radio' && answerFormInputField['selected'] ) {

    props = {
      store,
      studentsPointsObject,
      persistedPointsObject,
      cummulativePoints: cummulativeStudentPoints( (studentsPointsObject[ pointHelper?.CummulativePoints ] - answerFormInputField?.points )),
      currentFormField,
      answerFormInputField,
      points: 0
    };

  }

  return handleAnswers( props );
}

function handleInputFieldAnswers( studentsPointsObject, persistedPointsObject, answerFormInputField, currentFormField, points ) {

  if ( answerFormInputField?.inputType === "checkbox" || answerFormInputField?.inputType === inputType.Toggle ) return;

  if ( answerFormInputField?.inputType === 'radio' ) return;

  let props = {}; const cummulativeStudentPoints = function( cummulativePoints ){
    return cummulativePoints < 0 ? 0 : cummulativePoints;    
  };

  if ( points > 0 ) {

    props = {
      store,
      studentsPointsObject,
      persistedPointsObject,
      cummulativePoints: studentsPointsObject[ pointHelper?.CummulativePoints ] + points,
      currentFormField,
      answerFormInputField,
      points
    };

  }

  // if ( points === 0 && ( answerFormInputField?.points > 0 ) ) {
    if ( points === 0 ) {

    props = {
      store,
      studentsPointsObject,
      persistedPointsObject,
      cummulativePoints: cummulativeStudentPoints( (studentsPointsObject[ pointHelper?.CummulativePoints ] - answerFormInputField?.points )),
      // cummulativePoints: cummulativeStudentPoints( (studentsPointsObject[ pointHelper?.CummulativePoints ] - currentFormField[pointHelper?.Points] )),
      currentFormField,
      answerFormInputField,
      points
    };

  }

  return handleAnswers( props );

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
  // store.dispatch( saveFormFieldAnswerWithPoints({ ...answerFormInputField, points: points }) );

  currentPoints = points;

  return currentPoints;
};

function getPointsForStudentAnswers( question, answer ){
   
  if (  question?.answerKey?.toLowerCase() === "" || 
        question?.answerKey?.toLowerCase() === undefined || 
        question?.answerKey?.toLowerCase() === null ||
        question?.answerKey === null  )

  return 0;

  const isLowerCaseMatch =  ( answer?.answer?.toLowerCase() === question?.answerKey?.toLowerCase() );
  const isUpperCaseMatch =  ( answer?.answer?.toUpperCase() === question?.answerKey?.toUpperCase() );
  const isMatch =  ( answer?.answer?.trim() === question?.answerKey?.trim() );

  if ( isMatch && isLowerCaseMatch && isUpperCaseMatch )

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











// if ( points > 0 && answerFormInputField?.inputType === 'radio' ) {
  //   //return handleRadioButtonCorrectAnswers( studentsPointsObject, persistedPointsObject, answerFormInputField, currentFormField, points );
  // } 

  // if ( points === 0 && answerFormInputField?.inputType === 'radio' && answerFormInputField['selected'] ) {
  //   //return handleRadioButtonInCorrectAnswers( studentsPointsObject, persistedPointsObject, answerFormInputField, currentFormField, points );
  // }

  // if ( points > 0 && answerFormInputField?.inputType === 'checkbox' ) {
  //   //return handleCorrectAnswers( studentsPointsObject, persistedPointsObject, answerFormInputField, currentFormField, points );
  // } 

  // if ( points === 0 && answerFormInputField?.inputType === 'checkbox' && answerFormInputField['selected'] ) {
  //   // return handleInCorrectAnswers( studentsPointsObject, persistedPointsObject, answerFormInputField, currentFormField, points );
  // }

  // if ( answerFormInputField?.inputType === 'checkbox' && answerFormInputField['inputValue'] === currentFormField?.answerKey ) {
  //   // return handleInCorrectAnswers( studentsPointsObject, persistedPointsObject, answerFormInputField, currentFormField, points );
  // }
  
  // if ( points === 0 ) {
  //   alert( points )
  //   //return handleInCorrectAnswers( studentsPointsObject, persistedPointsObject, answerFormInputField, currentFormField, points );
  // };

// function handleCorrectAnswers( studentsPointsObject, persistedPointsObject, answerFormInputField, currentFormField, points ) {
//   let props = {
//     store,
//     studentsPointsObject,
//     persistedPointsObject,
//     cummulativePoints: studentsPointsObject[ pointHelper?.CummulativePoints ] + points,
//     currentFormField,
//     answerFormInputField,
//     points
//   };

//   return handleAnswers( props );
// };

// function handleInCorrectAnswers( studentsPointsObject, persistedPointsObject, answerFormInputField, currentFormField, points ){
//   let props = {
//     store,
//     studentsPointsObject,
//     persistedPointsObject,
//     cummulativePoints: calculatePoints( studentsPointsObject, answerFormInputField, currentFormField, points ),
//     currentFormField,
//     answerFormInputField,
//     points: 0
//   };

//   return handleAnswers( props );
// }

// function calculatePoints( studentsPointsObject, answerFormInputField, formField, points ) {

//   const cummulativeStudentPoints = function( cummulativePoints ){
//     return cummulativePoints < 0 ? 0 : cummulativePoints;    
//   };
  

//   if ( answerFormInputField ) {

//     alert('calculatePoints')
//     alert('answerFormInputField')

//     alert(JSON.stringify( answerFormInputField ) )

//     alert( answerFormInputField?.points )

//     alert(JSON.stringify( answerFormInputField['selected'] ) )

//   }

//   if ( answerFormInputField?.inputType === "checkbox" && answerFormInputField['selected'] === false ) {
   
//     alert('in checkbox')
//     alert(JSON.stringify( answerFormInputField ) )
//     return cummulativeStudentPoints( (studentsPointsObject[ pointHelper?.CummulativePoints ] - formField[pointHelper?.Points] )); 
//   }
  
//   if ( answerFormInputField?.inputType === "checkbox" && answerFormInputField['selected'] ) {
   
//     alert('in checkbox')
//     alert(JSON.stringify( answerFormInputField ) )
//     return cummulativeStudentPoints( (studentsPointsObject[ pointHelper?.CummulativePoints ] + formField[pointHelper?.Points] )); 
//   }

//   return cummulativeStudentPoints( (studentsPointsObject[ pointHelper?.CummulativePoints ] - answerFormInputField?.points )); 


//   // if ( answerFormInputField['previousAnswerState'] ) {
//   //   return cummulativeStudentPoints( (studentsPointsObject[ pointHelper?.CummulativePoints ] - formField[pointHelper?.Points] ));  
//   // }

//   //return cummulativeStudentPoints( (studentsPointsObject[ pointHelper?.CummulativePoints ] - formField[pointHelper?.Points] ));  
//   // return cummulativeStudentPoints( (studentsPointsObject[ pointHelper?.CummulativePoints ] - formField[pointHelper?.Points] ));  
 
// };