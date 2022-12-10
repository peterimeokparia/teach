import { saveStudentsAnswerPoints } from "services/course/actions/formfieldanswers";
import { addNewFormFieldPoint, saveFormFieldPoint, loadFormFieldPoints } from "services/course/actions/formquestionpoints";
import { inputType } from 'services/course/pages/QuestionsPage/helpers';
import { isEmptyObject } from "services/course/helpers/Validations";

export function assignPointsToQuestionForDraggableFormFieldAnswers( store, answerFormInputField, pointsAfter ) {

  if ( !answerFormInputField || ( answerFormInputField?.inputType === inputType.RadioButton && !answerFormInputField['selected'] )  ) return;

  store.dispatch( loadFormFieldPoints() );
   
  let studentsPointsObject = Object?.values( store?.getState().formFieldAnswers?.studentsCummulativePointsRecieved )?.find( ans => ans?.userId === answerFormInputField?.userId 
    && ans?.formUuId === answerFormInputField?.formUuId && ans?.formName === answerFormInputField?.formName );

  let persistedPointsObject = Object?.values( store?.getState().formFieldPoints?.studentsCummulativePointsRecieved )?.find( ans => ans?.userId === answerFormInputField?.userId 
    && ans?.formUuId === answerFormInputField?.formUuId && ans?.formName === answerFormInputField?.formName );

  if ( !studentsPointsObject?.userId ) {
    studentsPointsObject = hydrateCurrentCummulativePointsFromPersistence( store, persistedPointsObject );
  }

  let cummulativePointsFromPersistence = persistedPointsObject?.cummulativePoints;
  let pointsBefore = store?.getState().formFieldAnswers?.draggaleAnswerPointsBeforeMove;
  let calcPoints = (( cummulativePointsFromPersistence - pointsBefore) + pointsAfter?.points);
  let cummulativePoints = calcPoints < 0 ? 0 : calcPoints;

  handleDraggableAnswers( answerFormInputField );

  function handleDraggableAnswers( answerFormInputField ) {

    if ( isEmptyObject( answerFormInputField ) ) return;
    if ( answerFormInputField?.inputType !== inputType.DraggableListItem ) return; 
    if ( !answerFormInputField?.selected ) return; 

    let { userId, courseId, lessonId, formType, formUuId, formName } = answerFormInputField;

    // need to initialize points if first question is a draggable....how?
    // if ( !persistedPointsObject?.userId ) { 
    //   store.dispatch(addNewFormFieldPoint({ userId, cummulativePoints, formUuId, formName, formType, courseId }));
    // }

    if ( !isEmptyObject(persistedPointsObject) ) {
      store.dispatch(saveFormFieldPoint({ ...persistedPointsObject, userId, cummulativePoints, formUuId, formType, courseId, lessonId }));
    }

    store.dispatch( saveStudentsAnswerPoints({ userId, cummulativePoints, formUuId, formName, formUuId, formType, courseId, lessonId }) );
    store.dispatch( loadFormFieldPoints() );
    return;
  }
};

function hydrateCurrentCummulativePointsFromPersistence( store, persistedPointsObject ){
  if ( isEmptyObject( persistedPointsObject ) ) return; 
  
    let { userId, cummulativePoints, formUuId,  formName  } = persistedPointsObject;

    store.dispatch( saveStudentsAnswerPoints({ userId, cummulativePoints, formUuId, formName }) );
  
  return { userId, cummulativePoints, formUuId, formName };
}