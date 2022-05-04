import { 
    saveStudentsAnswerPoints } from "services/course/actions/formfieldanswers";
    
    import { 
    addNewFormFieldPoint,
    saveFormFieldPoint } from "services/course/actions/formquestionpoints";
    
    import {
    inputType } from 'services/course/pages/QuestionsPage/helpers';
    
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
    }
    
    function handleCheckBoxAnswers( studentsPointsObject, persistedPointsObject, answerFormInputField, currentFormField, points ) {
    
      if ( answerFormInputField?.inputType !== 'checkbox' ) return;
    
      if ( !( answerFormInputField['answerKey'] === answerFormInputField['inputValue'] ) ) return;
    
      let props = {}; const cummulativeStudentPoints = function( cummulativePoints ){
        return cummulativePoints < 0 ? 0 : cummulativePoints;    
      };
    
      if ( answerFormInputField['selected'] && answerFormInputField['answerKey'] === answerFormInputField['inputValue'] ) {
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
    
      if ( !answerFormInputField['selected'] && answerFormInputField['answerKey'] === answerFormInputField['inputValue'] ) {
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
    
      if ( points === 0 && answerFormInputField['selected'] ) {
    
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
    
      if ( answerFormInputField?.inputType === "checkbox" || 
            answerFormInputField?.inputType === inputType.Toggle  || 
              answerFormInputField?.inputType === 'radio') return;
    
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
    
    }}
    
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
    
    // function getPointsForStudentAnswers( question, answer ){
       
    //   if (  question?.answerKey?.toLowerCase() === "" || 
    //         question?.answerKey?.toLowerCase() === undefined || 
    //         question?.answerKey?.toLowerCase() === null ||
    //         question?.answerKey === null  )
    
    //   return 0;
    
    //   return getPointsForCorrectAnswer( question, answer );
    // }
    
    // function getPointsForCorrectAnswer( question, answer ) {
    //   const isLowerCaseMatch =  ( answer?.answer?.toLowerCase() === question?.answerKey?.toLowerCase() );
    //   const isUpperCaseMatch =  ( answer?.answer?.toUpperCase() === question?.answerKey?.toUpperCase() );
    //   const isMatch =  ( answer?.answer?.trim() === question?.answerKey?.trim() );
    
    //   let correctAnswerMatched = ( isMatch && isLowerCaseMatch && isUpperCaseMatch );
    
    //   if ( !correctAnswerMatched ) return 0
    
    //   return question?.points;
    
    // }
    
    function hydrateCurrentCummulativePointsFromPersistence( store, persistedPointsObject, studentsPointsObject ){
      if ( persistedPointsObject && !studentsPointsObject?.userId ) {
        store.dispatch(saveStudentsAnswerPoints({ userId: persistedPointsObject?.userId, cummulativePoints: persistedPointsObject?.cummulativePoints, formUuId: persistedPointsObject?.formUuId, formName: persistedPointsObject?.formName }));
      };
      return { userId: persistedPointsObject?.userId, cummulativePoints: persistedPointsObject?.cummulativePoints, formUuId: persistedPointsObject?.formUuId, formName: persistedPointsObject?.formName };
    }
    
    
    
    
    
    
    
    
    
    
    
    
    // function getPointsForStudentAnswers( question, answer ){
       
    //   let answerPoints = 0;
      
    //   if (  question?.answerKey?.toLowerCase() === "" || 
    //         question?.answerKey?.toLowerCase() === undefined || 
    //         question?.answerKey?.toLowerCase() === null ||
    //         question?.answerKey === null  )
    
    //   return 0;
    
    //   const isLowerCaseMatch =  ( answer?.answer?.toLowerCase() === question?.answerKey?.toLowerCase() );
    //   const isUpperCaseMatch =  ( answer?.answer?.toUpperCase() === question?.answerKey?.toUpperCase() );
    //   const isMatch =  ( answer?.answer?.trim() === question?.answerKey?.trim() );
    
    //   if ( isMatch && isLowerCaseMatch && isUpperCaseMatch )
    
    //     return question?.points;
    
    //   else 
    
    //     return 0;
    // }
    
    
    
    
    // function handleAnswers( props ) {
    
    //   let {
    //     store,
    //     studentsPointsObject,
    //     persistedPointsObject,
    //     cummulativePoints,
    //     currentFormField,
    //     answerFormInputField,
    //     points
    //   } = props;
    
    //   let currentPoints = 0;
    
    // if ( studentsPointsObject?.userId ) {
    
    //   if ( persistedPointsObject?.userId ) {
    
    //     store.dispatch(saveFormFieldPoint({ ...persistedPointsObject, userId: answerFormInputField?.userId, cummulativePoints, formUuId: answerFormInputField?.formUuId }));
    
    //   }
    
    //   store.dispatch(saveStudentsAnswerPoints({ userId: answerFormInputField?.userId, cummulativePoints, formUuId: answerFormInputField?.formUuId, formName: answerFormInputField?.formName }));
    
    //   currentPoints =  cummulativePoints;
    
    // } else {
    
    //   if ( !persistedPointsObject?.userId ) {
    
    //     store.dispatch(addNewFormFieldPoint({ userId: answerFormInputField?.userId, cummulativePoints: points, formUuId: answerFormInputField?.formUuId, formName: answerFormInputField?.formName }));
    
    //   }
      
    //   store.dispatch(saveStudentsAnswerPoints({ userId: answerFormInputField?.userId, cummulativePoints: points, formUuId: answerFormInputField?.formUuId, formName: answerFormInputField?.formName }));
    
    // }
    //   currentPoints = points;
    
    //   return currentPoints;
    // }