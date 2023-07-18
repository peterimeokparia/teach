import { deleteFormBuilder } from 'services/course/actions/formbuilders';
import { isEmptyObject } from "services/course/helpers/Validations";

export const getFormBuilderToDelete = ( store, formBuilderProps ) => {

    let { formName, userId, formType } = formBuilderProps;

    try {
       
        let formBuilder = Object.values( store.getState()?.formBuilders?.formBuilders )?.
            find( builder => builder?.formName === formName && builder?.userId === userId && builder?.formType === formType );


      alert('getFormBuilderToDelete')
      alert(JSON.stringify(formBuilder))
      
        if ( isEmptyObject( formBuilder ) ) return;
            
        // store.dispatch( deleteFormBuilder( formBuilder ) );

    } catch ( error ) {
        throw Error(`There was problem deleting formBuilder: ${ formType } ${ formName }`);
    }
};