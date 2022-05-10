import { 
useState} from 'react';

import { 
connect } from 'react-redux';
        
import {
saveFormField } from 'services/course/actions/formfields';

import {
getFormFieldAnswersByQuestionId } from 'services/course/selectors';

import {
saveOnlineQuestions } from 'services/course/actions/onlinequestions';

import { 
handleChangedValue } from 'services/course/pages/FormBuilder/FormFields/helpers';

import FormFieldPanel from 'services/course/pages/FormBuilder/FormFields/component/FormFieldPanel';
import useAssignPointsHook from 'services/course/pages/FormBuilder/hooks/useAssignPointsHook';

const Numbers = ( { 
    fieldProps,
    previewMode, 
    formFieldElement,
    formFields,
    fieldAnswer,
    elememtFormFields,
    saveOnlineQuestions,
    saveFormField,
    currentUser  } ) => {

    const [ selectedNumber, setSelectedNumber ] = useState(fieldAnswer?.answer);
    
    let {
        handleFormFieldAnswers,
    } = fieldProps;

    let {
        addFieldPoints,
        handleTogglingModal,
    } = useAssignPointsHook( {...fieldProps, formFieldElement, elememtFormFields, saveOnlineQuestions, saveFormField }  );

return(
    <>  
        { ( previewMode ) &&
          <div className={"on-top"}>
            <FormFieldPanel props={ { ...fieldProps, handleTogglingModal, addFieldPoints, formFieldElement } } />
          </div>
        } 
        { <label>
            {`${selectedNumber}` }
            <div>
            <input
                type="number" 
                value={ selectedNumber }
                onChange={ e => handleChangedValue( e.target.value, setSelectedNumber, formFieldElement, handleFormFieldAnswers( formFieldElement, e.target.value ) ) }
            />
            </div>
          </label>
        } 
    </>
    )
};


const mapDispatch = {
    saveFormField,
    saveOnlineQuestions
};
  
const mapState = ( state, ownProps ) => { 
return {
    currentUser: state.users.user,
    currentUsers: Object.values( state.users.users ),
    formfields: Object.values( state?.formFields?.formFields ).filter( field => field?.questionId === ownProps?.fieldProps?.question?._id ),
    elememtFormFields: Object.values( state?.formFields?.formFields ).filter( field => field?.questionId === ownProps?.formFieldElement?.questionId ),
    formFieldsLoading: state?.formFields?.formFieldsLoading,
    onFormFieldsLoadingError: state?.formFields?.onFormFieldsLoadingError,
    fieldAnswer: getFormFieldAnswersByQuestionId( state, ownProps ),
    formFieldAnswersLoading: state?.formFieldAnswers?.formFieldAnswersLoading,
    onFormFieldAnswersLoadingError: state?.formFieldAnswers?.onFormFieldAnswersLoadingError,
    formQuestionPoints: Object.values( state?.formFieldPoints?.formFieldPoints )?.filter( field => field?.questionId === ownProps?.fieldProps?.question?._id ),
};
};

export default connect( mapState, mapDispatch )(Numbers);