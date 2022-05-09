import { 
useState} from 'react';

import { 
connect } from 'react-redux';
        
import {
saveFormField } from 'services/course/actions/formfields';

import {
getFormFieldAnswersByQuestionId } from 'services/course/selectors';

import {
saveOnlineQuestion } from 'services/course/actions/onlinequestions';

import { 
handleChangedValue } from 'services/course/pages/FormBuilder/FormFields/helpers';

import Latex from "react-latex";
import FormFieldPanel from 'services/course/pages/FormBuilder/FormFields/component/FormFieldPanel';
import useAssignPointsHook from 'services/course/pages/FormBuilder/hooks/useAssignPointsHook';

const Latex = ( { 
    fieldProps,
    previewMode, 
    formFieldElement,
    formFields,
    fieldAnswer,
    elememtFormFields,
    saveOnlineQuestion,
    saveFormField,
    currentUser  } ) => {

    const [ startDate, setStartDate ] = useState(fieldAnswer?.answer);
    
    let {
        handleFormFieldAnswers,
    } = fieldProps;

    let {
        addFieldPoints,
        handleTogglingModal,
    } = useAssignPointsHook( {...fieldProps, formFieldElement, elememtFormFields, saveOnlineQuestion, saveFormField }  );

return(
    <>  
        { ( previewMode ) &&
          <div className={"on-top"}>
            <FormFieldPanel props={ { ...fieldProps, handleTogglingModal, addFieldPoints, formFieldElement } } />
          </div>
        } 
        {
         <Latex>{ formFieldElement?.inputValue }</Latex>
        } 
    </>
    )
};


const mapDispatch = {
    saveFormField,
    saveOnlineQuestion
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

export default connect( mapState, mapDispatch )(Latex);