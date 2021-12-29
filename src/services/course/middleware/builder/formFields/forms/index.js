import { 
navigate } from "@reach/router";

import { 
formTypes } from 'services/course/pages/FormBuilder/helpers';

export function redirectToFormAfterAddingNewFormBuilder( store, formData ){
  try {
    switch (formData?.formType) {
      case formTypes?.survey:
        navigate(`/${formData?.operatorBusinessName}/formBuilder/${formData?.formType}/${formData?.formName}/${formData?.formUuId}/${formData?.userId}/${formData?.formBuilderStatus}`);
        break;
      case formTypes?.report:  
        navigate(`/${formData?.operatorBusinessName}/formBuilder/${formData?.formType}/${formData?.formName}/${formData?.formUuId}/${formData?.userId}/${formData?.formBuilderStatus}`);
        break;
      case formTypes?.quizzwithpoints:
        navigate(`/${formData?.operatorBusinessName}/formBuilder/${formData?.formType}/${formData?.formName}/${formData?.formId}/${formData?.formUuId}/${formData?.userId}/${formData?.formBuilderStatus}`);
        break;
      default:
        break;
    }
    
  } catch (error) {
    console.log(' no form data')
  }
};
