import 
react, { 
useState } from 'react';

import { 
connect } from 'react-redux';
    
import {
saveFormField } from 'services/course/actions/formfields';

import { 
handleChangedValue } from 'services/course/pages/FormBuilder/FormFields/helpers';

import {
saveOnlineQuestion } from 'services/course/actions/onlinequestions';

import {
elementMeta, inputType } from 'services/course/pages/QuestionsPage/helpers';

import FormFieldPanel from 'services/course/pages/FormBuilder/FormFields/components/FormFieldPanel';
import useAssignPointsHook from 'services/course/pages/FormBuilder/hooks/useAssignPointsHook';

const CheckBox = ( { 
    fieldProps,
    previewMode, 
    currentUser,
    formFieldElement,
    elememtFormFields,
    formFields,
    setSelected,
    studentsAnswer,
    formFieldAnswers,
    checkBoxFormFields,
    saveOnlineQuestion,
    saveFormField } ) => {
    
    const [ inputValue, setInputValue ] = useState('');
    const checkBoxGroup = formFields?.filter( field => field?.parentComponentId === formFieldElement?.parentComponentId && field?.inputType === inputType.CheckBox );
    
    let {
      formBuilderStatus,
      handleSelectorFormFieldAnswers,
    } = fieldProps;

    const [checkedRadioButton, setCheckedRadioButton ] = useState( ( formBuilderStatus === elementMeta?.state.Manage ) ? { id: formFieldElement?._id, isChecked: formFieldElement['selected'] } : {} );

    let {
        addFieldPoints,
        handleTogglingModal,
    } = useAssignPointsHook( {...fieldProps, formFieldElement, elememtFormFields, saveOnlineQuestion, saveFormField, previewMode, fieldGroup: checkBoxGroup }  );

    const handleCheckBoxSelection = ( e ) => {

        setCheckedRadioButton( { id: formFieldElement?._id, isChecked: e?.target.checked } );

        if ( e?.target?.checked && e?.target?.value ) {

             handleSelectorFormFieldAnswers( formFieldElement, e?.target?.value,  e?.target?.value,  e?.target?.checked,  formFieldElement['points'] );

        } else {

            const currentField = formFields?.find( field => field?._id === formFieldElement?._id );

            handleSelectorFormFieldAnswers( formFieldElement, e?.target?.value, "", false, 0 );
        }
    };

return(
    <>
      { ( previewMode ) &&
       <div className={"on-top"}>
        <FormFieldPanel props={ { ...fieldProps, handleTogglingModal, addFieldPoints, formFieldElement } } />
        <input
            type={"text"}
            value={inputValue}
            onChange={e => handleChangedValue( e.target.value, setInputValue, { ...formFieldElement, inputValue: e.target.value }, saveFormField )}
            placeholder={ formFieldElement?.inputValue } 
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
              value={ formFieldElement?.inputValue }
              onChange={e => handleCheckBoxSelection( e )}
              name={ formFieldElement?._id }
              checked={ (  studentsAnswer && formBuilderStatus === elementMeta?.state.Taking  ) ? studentsAnswer['selected']  : ( formBuilderStatus === elementMeta?.state.Manage && checkedRadioButton?.id === formFieldElement?._id ) && checkedRadioButton?.isChecked }
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
      formFields: Object.values( state?.formFields?.formFields ).filter( field => field?.questionId === ownProps?.fieldProps?.question?._id ),
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