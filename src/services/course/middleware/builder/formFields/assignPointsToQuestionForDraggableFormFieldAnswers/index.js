import { saveStudentsAnswerPoints } from "services/course/actions/formfieldanswers";
import { addNewFormFieldPoint, saveFormFieldPoint, loadFormFieldPoints } from "services/course/actions/formquestionpoints";
import { inputType } from 'services/course/pages/QuestionsPage/helpers';

export function assignPointsToQuestionForDraggableFormFieldAnswers(  store, answerFormInputField, pointsAfter ) {
  if ( !answerFormInputField || ( answerFormInputField?.inputType === inputType.RadioButton && !answerFormInputField['selected'] )  ) return;

  store.dispatch( loadFormFieldPoints() );
   
  let studentsPointsObject = Object?.values( store?.getState().formFieldAnswers?.studentsCummulativePointsRecieved )?.find( ans => ans?.userId === answerFormInputField?.userId 
    && ans?.formUuId === answerFormInputField?.formUuId && ans?.formName === answerFormInputField?.formName );

  let persistedPointsObject = Object?.values( store?.getState().formFieldPoints?.studentsCummulativePointsRecieved )?.find( ans => ans?.userId === answerFormInputField?.userId 
    && ans?.formUuId === answerFormInputField?.formUuId  && ans?.formName === answerFormInputField?.formName );

  if ( !studentsPointsObject?.userId ) {
    studentsPointsObject = hydrateCurrentCummulativePointsFromPersistence( store, persistedPointsObject );
  }

  let currentFormField = Object.values( store.getState().formFields?.formFields )?.find( field => field?._id ===  answerFormInputField?.fieldId );
  let cummulativePointsFromPersistence = persistedPointsObject?.cummulativePoints;
  let pointsBefore = store?.getState().formFieldAnswers?.draggaleAnswerPointsBeforeMove;
  let calcPoints = (( cummulativePointsFromPersistence - pointsBefore) + pointsAfter?.points);
  let cummulativePoints = calcPoints < 0 ? 0 : calcPoints;
  
  handleDraggableAnswers( studentsPointsObject, answerFormInputField, currentFormField );

  function handleDraggableAnswers( studentsPointsObject, answerFormInputField, currentFormField ) {
    if ( answerFormInputField?.inputType !== inputType.DraggableListItem ) return; 
    if ( !answerFormInputField?.selected ) return; 

    // if ( !persistedPointsObject?.userId ) {
    //   store.dispatch(addNewFormFieldPoint({ userId: answerFormInputField?.userId, cummulativePoints, formUuId: answerFormInputField?.formUuId, formName: answerFormInputField?.formName }));
    // }

    if ( persistedPointsObject?.userId ) {
      store.dispatch(saveFormFieldPoint({ ...persistedPointsObject, userId: answerFormInputField?.userId, cummulativePoints, formUuId: answerFormInputField?.formUuId }));
    }

    store.dispatch(saveStudentsAnswerPoints({ userId: answerFormInputField?.userId, cummulativePoints, formUuId: answerFormInputField?.formUuId, formName: answerFormInputField?.formName }));
    store.dispatch( loadFormFieldPoints() );
    return;
  }
};

function hydrateCurrentCummulativePointsFromPersistence( store, persistedPointsObject ){
  if ( persistedPointsObject ) {
    store.dispatch(saveStudentsAnswerPoints({ userId: persistedPointsObject?.userId, cummulativePoints: persistedPointsObject?.cummulativePoints, formUuId: persistedPointsObject?.formUuId, formName: persistedPointsObject?.formName }));
  };

  return { userId: persistedPointsObject?.userId, cummulativePoints: persistedPointsObject?.cummulativePoints, formUuId: persistedPointsObject?.formUuId, formName: persistedPointsObject?.formName };
}