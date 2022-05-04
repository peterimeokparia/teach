import { 
navigate } from "@reach/router";

import { 
formTypes } from 'services/course/pages/FormBuilder/helpers';

import {
elementMeta } from 'services/course/pages/QuestionsPage/helpers';

import { 
addMissedAnswers } from "services/course/actions/missedanswers";

export function redirectToFormAfterAddingNewFormBuilder( store, actionType, formData ){

  try {

    const operatorBusinessName = formData?.operatorBusinessName;
    const formType = formData?.formType;
    const formName = formData?.formName;
    const formUuId = formData?.formUuId;
    const formId = !formData?.formId ? '000' : formData?.formId;
    const lessonData = getLessonDataFromFormId(store, formId);
    const courseId = ( !formData?.courseId && lessonData ) ? lessonData?.courseId : formData?.courseId;
    const lessonId = ( !formData?.lessonId  && lessonData ) ? lessonData?.lessonId : formData?.lessonId;
    const formBuilderStatus = formData?.state;
    const eventId = !formData?.eventId ? '000' : formData?.eventId;
    const userId = formData?.userId;

    switch (formType) {
      case formTypes?.survey:
        navigate(`/${operatorBusinessName}/formBuilder/${formType}/${formName}/${formUuId}/${userId}/${formBuilderStatus}`);
        break;
      case formTypes?.report:  
        if ( formBuilderStatus === elementMeta.state.Manage ) {
          navigate(`/${operatorBusinessName}/formEventBuilder/${formType}/${formName}/${formUuId}/${userId}/${formBuilderStatus}/${eventId}`);
          return;
        }       
        navigate(`/${operatorBusinessName}/formEventBuilder/${formType}/${formName}/${formUuId}/${userId}/${formBuilderStatus}/${eventId}`);
        break;
      case formTypes?.quizzwithpoints:
      case formTypes?.homework:  

        let props = {
            formType,
            formName,
            formUuId,
            userId
        };

        handleMissedAnswers( store, props );
        navigate(`/${operatorBusinessName}/formBuilder/${formType}/${formName}/${courseId}/${lessonId}/${formUuId}/${userId}/${formBuilderStatus}/${eventId}`);
        break;
      case formTypes?.examwithpoints:
        navigate(`/${operatorBusinessName}/formBuilder/${formType}/${formName}/${courseId}/${formUuId}/${userId}/${formBuilderStatus}/${eventId}`);
        break;
      default:
        break;
    }
    
  } catch (error) {
    console.log(' no form data');
  }
}

function handleMissedAnswers( store, props ){
  store.dispatch(addMissedAnswers(props));
}

function getLessonDataFromFormId(store, formId) {
   if ( !formId ) return;

   let lesson = Object.values( store?.getState()?.lessons?.lessons )?.
    find(lesson => lesson?._id === formId );

    if ( !lesson ) {
      return undefined;
    }

    return { courseId: lesson?.courseId, lessonId: lesson?._id}
}