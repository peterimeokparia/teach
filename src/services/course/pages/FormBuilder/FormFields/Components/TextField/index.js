import { 
useState } from 'react';

import { 
connect } from 'react-redux';
    
import {
saveFormField } from 'services/course/actions/formfields';

import {
saveOnlineQuestions } from 'services/course/actions/onlinequestions';

import { 
handleChangedValue } from 'services/course/pages/FormBuilder/FormFields/helpers';

import FormFieldPanel from 'services/course/pages/FormBuilder/FormFields/component/FormFieldPanel';
import useAssignPointsHook from 'services/course/pages/FormBuilder/hooks/useAssignPointsHook';

const TextField = ( { 
    fieldProps,
    previewMode, 
    textValueCallBack, 
    formFieldElement,
    elememtFormFields,
    studentsAnswer,
    saveFormField,
    saveOnlineQuestions  } ) => {

    const [ inputValue, setInputValue ] = useState('');

    let {
        handleFormFieldAnswers,
    } = fieldProps;

    let {
        addFieldPoints,
        handleTogglingModal,
    } = useAssignPointsHook({...fieldProps, formFieldElement, elememtFormFields, saveOnlineQuestions, saveFormField } );

return(
    <>  
        { ( previewMode ) &&
         <div className={"on-top"}>
            <FormFieldPanel props={ { ...fieldProps, handleTogglingModal, addFieldPoints, formFieldElement } } />
            <input
             type={ "text" }
             value={ inputValue }
             onChange={ e => handleChangedValue( e.target.value, setInputValue, formFieldElement, saveFormField ) }
             placeholder={ formFieldElement?.inputValue } 
            />
         </div>
        }
        <input
            type={"text"}
            value={textValueCallBack}
            onChange={e => handleChangedValue( e.target.value, setInputValue, formFieldElement, handleFormFieldAnswers( formFieldElement, e.target.value ) ) }
            placeholder={( studentsAnswer ) ? studentsAnswer['answer'] : formFieldElement?.inputValue}
        />  
        <div>
            { previewMode && <span>  { inputValue }  </span> } 
        </div>        
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
      formFieldAnswers: Object.values( state?.formFieldAnswers?.formFieldAnswers ).filter( field => field?.questionId === ownProps?.formFieldElement?.questionId ),
      formFieldAnswersLoading: state?.formFieldAnswers?.formFieldAnswersLoading,
      onFormFieldAnswersLoadingError: state?.formFieldAnswers?.onFormFieldAnswersLoadingError,
      formQuestionPoints: Object.values( state?.formFieldPoints?.formFieldPoints )?.filter( field => field?.questionId === ownProps?.fieldProps?.question?._id ),
      studentsAnswer: Object.values( state?.formFieldAnswers?.formFieldAnswers ).filter( field => field?.questionId === ownProps?.formFieldElement?.questionId ).find( field => field?.fieldId === ownProps?.formFieldElement?._id  && field?.formName === ownProps?.formFieldElement?.formName && field?.formUuId === ownProps?.fieldProps?.formUuId && field?.userId === (ownProps?.fieldProps?.userId ? ownProps?.fieldProps?.userId : ownProps?.currentUser?._id)),
    };
};
export default connect( mapState, mapDispatch )(TextField);