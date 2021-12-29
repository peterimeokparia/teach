import {
add,
update,
remove,
get,
getById } from 'services/course/api';

import { 
SAVE_FORMFIELDS_SUCCESS,
saveFormField } from "services/course/actions/formfields";

export const  updateFormFields = ( store, fieldvalue ) => {
    try {
        update( fieldvalue, `/formfields/` )
    } catch (error) {
        console.log( error )
    } 
};