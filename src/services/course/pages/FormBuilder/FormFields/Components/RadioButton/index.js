import 
react, { 
useState } from 'react';

import { 
connect } from 'react-redux';

import {
saveFormField } from 'services/course/actions/formfields';

import {
saveOnlineQuestion } from 'services/course/actions/onlinequestions';

import { 
handleChangedValue } from './helpers';

import { 
role } from 'services/course/helpers/PageHelpers';

import FormFieldPanel from 'services/course/pages/FormBuilder/FormFields/Components/FormFieldPanel';
import useAssignPointsHook from 'services/course/pages/FormBuilder/hooks/useAssignPointsHook';

const RadioButton = ( { 
    fieldProps,
    previewMode, 
    formFieldElement,
    elememtFormFields,
    formfields,
    currentUser,
    setSelected,
    formFieldAnswers,
    studentsAnswer,
    saveOnlineQuestion,
    saveFormField } ) => {
    
    const [ inputValue, setInputValue ] = useState('');
    const radioButtonGroup = formfields?.filter( field => field?.parentComponentId === formFieldElement?.parentComponentId && field?.inputType === 'radio');

    let {
      handleSelectorFormFieldAnswers,
    } = fieldProps;

    let {
        addFieldPoints,
        handleTogglingModal,
    } = useAssignPointsHook({...fieldProps, formFieldElement, elememtFormFields,  saveOnlineQuestion, saveFormField } );

    const handleRadioButtonSelection = ( e ) => {
       if ( !currentUser?._id ) return;
         setInputValue( e?.target?.value );
         if ( radioButtonGroup?.length > 0 ) {
            radioButtonGroup?.forEach(element => {
              if ( element?._id === formFieldElement?._id && e?.target?.checked  && element?.inputValue  &&  element?.inputValue !== "") {
                  handleSelectorFormFieldAnswers( element, element?.inputValue, element?.inputValue, e?.target?.checked  );  
              } else {
                  let selected = false;
                  handleSelectorFormFieldAnswers( element, element?.inputValue, "", selected  );
              }
            });
         }
     };
return(
    <>
      { ( previewMode ) &&
       <div className={"on-top"}>
        <FormFieldPanel props={ { ...fieldProps, handleTogglingModal, addFieldPoints, formFieldElement }  }/>
        <input
           type={"text"}
           value={inputValue}
           onChange={e => handleChangedValue( e.target.value, setInputValue, {...formFieldElement, inputValue: e.target.value }, saveFormField )}
           placeholder={formFieldElement?.inputValue} 
        />
       </div>
      }
    <span>
        { previewMode && <span>  <label>   { inputValue } </label> </span> }
        <span className="radioButton">
        { !previewMode &&
            <input
              type={ "radio" }
              value={ formFieldElement?.inputValue }
              onChange={ e => handleRadioButtonSelection( e ) }
              name={ formFieldElement?.parentComponentId }
              checked={ (  studentsAnswer ) ? studentsAnswer['selected'] : formFieldElement?.inputValue }
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
                            find( field => field?.fieldId === ownProps?.formFieldElement?._id  && 
                              field?.formName === ownProps?.formFieldElement?.formName && 
                               field?.formUuId === ownProps?.fieldProps?.formUuId &&  
                                field?.userId === (ownProps?.fieldProps?.userId ? ownProps?.fieldProps?.userId : ownProps?.currentUser?._id)),
    };
  };

export default connect( mapState, mapDispatch )(RadioButton);