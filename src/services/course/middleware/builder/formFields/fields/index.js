import { update } from 'services/course/api';
import { SET_FORMFIELDS_MARKDOWN } from 'services/course/actions/formfields';

export const  updateFormFields = ( store, fieldvalue ) => {
    try {
        update( fieldvalue, `/formfields/` );
    } catch (error) {
        console.log( error );
    } 
};

export const  updateFormFieldsMarkDown = ( store, payload ) => {
    try {
        //update( payload, '/formfields/content/' );
        //store.dispatch({type: SET_FORMFIELDS_MARKDOWN,  payload });
    } catch (error) {
        console.log( error );
    } 
};