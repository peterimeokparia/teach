import { isEmptyObject } from 'services/course/helpers/Validations';
import { addNewFormField } from 'services/course/actions/formfields';
import { manageFormFieldCollection } from 'services/course/pages/FormBuilder/helpers/formFieldHelpers';

export const buildNewFormFieldsFromExisting = ( store, action ) => {
    try {
        let { 
            formId, parentComponentId, formFieldGroupId, formType, formName, 
            formUuId, formFieldCreatedBy, newQuestionId, oldQuestionId, userId, outcomeId
        } = action?.updateData;
    
        let formFields = Object.values( store?.getState()?.formFields?.formFields );
    
        if ( formFields?.length > 0 ) {
           let existingFormFields = formFields.filter( item => item?.questionId === oldQuestionId );
    
           let update = {
                formId, parentComponentId, formFieldGroupId, formType, formName, 
                formUuId, formFieldCreatedBy, questionId: newQuestionId, userId, outcomeId
            };
    
            if ( existingFormFields?.length > 0 ) {
                existingFormFields?.forEach( existingFormFieldData => {
                    let newFormFieldObject = formatFormieldData( existingFormFieldData, update );
            
                    if ( !isEmptyObject( newFormFieldObject ) ) {
                        store.dispatch( addNewFormField( {...manageFormFieldCollection( newFormFieldObject ), markDownContent: existingFormFieldData?.markDownContent, answer: existingFormFieldData?.answer, answerKey: existingFormFieldData?.answerKey  } ));     
                    }  
                }); 
            }
        }
    } catch (error) {
        console.log(`middleware - buildNewFormFieldsFromExisting${ error }`)
    }
};

export function formatFormieldData( existingFormFieldData, updateData ) {
    if ( isEmptyObject( existingFormFieldData ) ) return;
    if ( isEmptyObject( updateData ) ) return;

    return { ...existingFormFieldData, ...updateData };
}