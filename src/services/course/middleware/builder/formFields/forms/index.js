import { setQuestionProperties } from 'services/course/actions/onlinequestions';
import { handleRedirection, getFormBuilderProperties } from 'services/course/middleware/builder/formFields/forms/helper';

export function redirectToFormAfterAddingNewFormBuilder( store, actionType, formData ){
  handleRedirection( store, actionType, formData );
}

export function addNewFormBuilderNoRedirect( store, actionType, formData ) {
  let formBuilderQuestionProperties = getFormBuilderProperties( store, actionType, formData );

  store?.dispatch( setQuestionProperties( formBuilderQuestionProperties ) );
}