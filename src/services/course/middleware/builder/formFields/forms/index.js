import { 
navigate } from "@reach/router";

import { 
formTypes } from 'services/course/pages/FormBuilder/helpers';

import {
elementMeta } from 'services/course/pages/QuestionsPage/helpers';

export function redirectToFormAfterAddingNewFormBuilder( store, actionType, formData ){
  
  try {

    const operatorBusinessName = formData?.operatorBusinessName;
    const formType = formData?.formType;
    const formName = formData?.formName;
    const formUuId = formData?.formUuId;
    const courseId = formData?.courseId;
    const lessonId = formData?.lessonId;
    const formBuilderStatus = formData?.state;
    const eventId = !formData?.eventId ? '000' : formData?.eventId;
    const formId = !formData?.formId ? '000' : formData?.formId;
    const userId = formData?.userId;

    switch (formType) {
      case formTypes?.survey:

        navigate(`/${operatorBusinessName}/formBuilder/${formType}/${formName}/${formUuId}/${userId}/${formBuilderStatus}`);

        break;
      case formTypes?.report:  

        if ( formBuilderStatus === elementMeta.state.Manage ) {

          navigate(`/${operatorBusinessName}/formEventBuilder/${formType}/${formName}/${formUuId}/${userId}/${formBuilderStatus}/${eventId}`);
        }
          
        if ( formBuilderStatus === elementMeta.state.Taking ) {

          navigate(`/${operatorBusinessName}/formEventBuilder/${formType}/${formName}/${formUuId}/${userId}/${formBuilderStatus}/${eventId}`);
        }
        break;
      case formTypes?.quizzwithpoints:
      case formTypes?.homework:  

        navigate(`/${operatorBusinessName}/formBuilder/${formType}/${formName}/${courseId}/${lessonId}/${formUuId}/${userId}/${formBuilderStatus}/${eventId}`);

        break;

      case formTypes?.examwithpoints:

        navigate(`/${operatorBusinessName}/formBuilder/${formType}/${formName}/${courseId}/${formUuId}/${userId}/${formBuilderStatus}/${eventId}`);

        break;
        
      default:
        break;
    }
    
  } catch (error) {
    console.log(' no form data')
  }
};