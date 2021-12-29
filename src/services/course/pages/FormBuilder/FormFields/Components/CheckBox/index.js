import 
react, { 
useState } from 'react';

import { 
connect } from 'react-redux';
    
import {
saveFormField } from 'services/course/actions/formfields';

import { 
handleChangedValue } from './helpers';

import {
saveOnlineQuestion } from 'services/course/actions/onlinequestions';

import { 
role } from 'services/course/helpers/PageHelpers';

import FormFieldPanel from 'services/course/pages/FormBuilder/FormFields/Components/FormFieldPanel';
import useAssignPointsHook from 'services/course/pages/FormBuilder/hooks/useAssignPointsHook';

const CheckBox = ( { 
    fieldProps,
    previewMode, 
    currentUser,
    formFieldElement,
    elememtFormFields,
    formfields,
    setSelected,
    studentsAnswer,
    formFieldAnswers,
    checkBoxFormFields,
    saveOnlineQuestion,
    saveFormField } ) => {
    
    const [ inputValue, setInputValue ] = useState('');

    let {
      handleSelectorFormFieldAnswers,
    } = fieldProps;

    let {
        addFieldPoints,
        handleTogglingModal,
    } = useAssignPointsHook( {...fieldProps, formFieldElement, elememtFormFields, saveOnlineQuestion, saveFormField }  );

    const handleCheckBoxSelection = ( e ) => {

        if ( e?.target?.checked && e?.target?.value ) {
            handleSelectorFormFieldAnswers( formFieldElement, e?.target?.value,  e?.target?.value,  e?.target?.checked  );
        } else {
            handleSelectorFormFieldAnswers( formFieldElement, e?.target?.value, "", false  );
        }

        // if ( ( formFieldElement && formFieldElement['selected'] ) && !e?.target?.checked ) {
        //     handleSelectorFormFieldAnswers( formFieldElement, e?.target?.value, "", false  );
        // }
    };

return(
    <>
      { ( previewMode ) &&
       <div className={"on-top"}>
        <FormFieldPanel props={ { ...fieldProps, handleTogglingModal, addFieldPoints, formFieldElement } } />
        <input
            type={"text"}
            value={inputValue}
            onChange={e => handleChangedValue( e.target.value, setInputValue, formFieldElement, saveFormField )}
            placeholder={formFieldElement?.inputValue} 
          />
       </div>
      }
    <span>
        { previewMode && <span>  <label>   { inputValue } </label> </span> }
        <span className="radioButton">
        { !previewMode &&
            <input
              type={"checkbox"}
              id={ formFieldElement?._id }
              value={formFieldElement?.inputValue}
              onChange={e => handleCheckBoxSelection( e )}
              name={ formFieldElement?._id }
              checked={ ( studentsAnswer ) ? studentsAnswer['selected'] : formFieldElement?.inputValue }
            /> 
        }
        </span>
    </span>
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
      elememtFormFields: Object.values( state?.formFields?.formFields ).filter( field => field?.questionId === ownProps?.formFieldElement?.questionId ),
      formfields: Object.values( state?.formFields?.formFields ).filter( field => field?.questionId === ownProps?.fieldProps?.question?._id ),
      formFieldsLoading: state?.formFields?.formFieldsLoading,
      onFormFieldsLoadingError: state?.formFields?.onFormFieldsLoadingError,
      formFieldAnswers: Object.values( state?.formFieldAnswers?.formFieldAnswers ).filter( field => field?.questionId === ownProps?.formFieldElement?.questionId ),
      formFieldAnswersLoading: state?.formFieldAnswers?.formFieldAnswersLoading,
      onFormFieldAnswersLoadingError: state?.formFieldAnswers?.onFormFieldAnswersLoadingError,
      formQuestionPoints: Object.values( state?.formFieldPoints?.formFieldPoints )?.filter( field => field?.questionId === ownProps?.fieldProps?.question?._id ),
      studentsAnswer: Object.values( state?.formFieldAnswers?.formFieldAnswers ).filter( field => field?.questionId === ownProps?.formFieldElement?.questionId ).
                            find( field => field?.fieldId === ownProps?.formFieldElement?._id  && field?.formName === ownProps?.formFieldElement?.formName 
                              && field?.formUuId === ownProps?.fieldProps?.formUuId && field?.userId === (ownProps?.fieldProps?.userId ? ownProps?.fieldProps?.userId : ownProps?.currentUser?._id)),
    };
  };

export default connect( mapState, mapDispatch )(CheckBox);