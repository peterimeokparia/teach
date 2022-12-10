import { saveFormFieldAnswer, deleteFormFieldAnswer } from "services/course/actions/formfieldanswers";
import { isEmptyObject } from "services/course/helpers/Validations";

export function addNewFormFieldPlusAnswer( store, inputFieldData ){
  store.dispatch( saveFormFieldAnswer( inputFieldData ) );
};

export const getFormFieldAnswersToDelete = ( store, formBuilderProps ) => {
  
  let { formName, userId, formType } = formBuilderProps;

  try {

    let formFieldAnswer = Object.values( store.getState()?.formFieldAnswers?.formFieldAnswers )?.
      find( answer => answer?.formName === formName && answer?.userId === userId && answer?.formType === formType );

      alert('getFormFieldAnswersToDelete')
      alert(JSON.stringify(formFieldAnswer))

    if ( isEmptyObject( formFieldAnswer ) ) return;

    //store.dispatch( deleteFormFieldAnswer( formFieldAnswer ) );

  } catch ( error ) {
    throw Error(`There was problem deleting formfieldanswers: ${ formType } ${ formName }`);
  }
};
