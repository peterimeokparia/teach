import { deleteFormFieldPoints } from "services/course/actions/formquestionpoints";
import { isEmptyObject } from "services/course/helpers/Validations";

export const getFormFieldPointsToDelete = ( store, formBuilderProps ) => {
  
  let { formName, userId, formType } = formBuilderProps;

  try {

    let answerPoints = Object.values( store.getState()?.formFieldPoints?.formFieldPoints )?.
      find( points => points?.formName === formName && points?.userId === userId && points?.formType === formType );

      alert('delete ans points')
      alert(JSON.stringify(answerPoints))

    if ( isEmptyObject( answerPoints ) ) return;

    ///store.dispatch( deleteFormFieldPoints( answerPoints ) );

  } catch ( error ) {
    throw Error(`There was problem deleting FormFieldPoints: ${ formType } ${ formName }`);
  }
};