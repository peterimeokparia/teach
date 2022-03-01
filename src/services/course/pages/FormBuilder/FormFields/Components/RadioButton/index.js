import { 
useState } from 'react';

import { 
connect } from 'react-redux';

import {
saveFormField } from 'services/course/actions/formfields';

import {
saveOnlineQuestion } from 'services/course/actions/onlinequestions';

import { 
handleChangedValue } from 'services/course/pages/FormBuilder/FormFields/helpers';

import {
elementMeta } from 'services/course/pages/QuestionsPage/helpers';

import {
inputType } from 'services/course/pages/QuestionsPage/helpers';

import {
saveFormFieldAnswer,
saveFormFieldAnswerWithPoints } from 'services/course/actions/formfieldanswers';


import FormFieldPanel from 'services/course/pages/FormBuilder/FormFields/components/FormFieldPanel';
import useAssignPointsHook from 'services/course/pages/FormBuilder/hooks/useAssignPointsHook';

const RadioButton = ( { 
    fieldProps,
    previewMode, 
    formFieldElement,
    elememtFormFields,
    formFields,
    currentUser,
    studentsAnswer,
    formFieldAnswers,
    saveOnlineQuestion,
    saveFormField,
    saveFormFieldAnswerWithPoints } ) => {
    
    let {
      formBuilderStatus,
      handleSelectorFormFieldAnswers,
    } = fieldProps;

    const [ inputValue, setInputValue ] = useState('');
    const radioButtonGroup = formFields?.filter( field => field?.parentComponentId === formFieldElement?.parentComponentId && field?.inputType === inputType.RadioButton );
    const radioButtonAnsGroup = formFieldAnswers?.filter( field => field?.parentComponentId === formFieldElement?.parentComponentId && field?.inputType === inputType.RadioButton );
    const [checkedRadioButton, setCheckedRadioButton ] = useState( ( formBuilderStatus === elementMeta?.state.Manage ) ? { id: formFieldElement?._id, isChecked: formFieldElement['selected'] } : {} );
    //const radioButtonGroup = formFields?.filter( field => field?._id === formFieldElement?.fieldId && field?.inputType === inputType.RadioButton );

    let {
        addFieldPoints,
        handleTogglingModal,
    } = useAssignPointsHook({...fieldProps, formFieldElement, elememtFormFields,  saveOnlineQuestion, saveFormField, previewMode, fieldGroup: radioButtonGroup } );

    const handleRadioButtonSelection = ( e ) => {

      let points = radioButtonAnsGroup?.find( rd => rd['selected'] === true && rd?.answer === rd?.answerKey ) === undefined ? 0 : formFieldElement['points'];

      setCheckedRadioButton( { id: formFieldElement?._id, isChecked: e?.target.checked } );

       if ( !currentUser?._id ) return;

        const selectedRadioButton = e?.target?.checked;
        const input = e?.target?.value;

         setInputValue( e?.target?.value );

         if ( radioButtonGroup?.length > 0 ) {

            radioButtonGroup?.forEach(element => {

              if ( element?._id === formFieldElement?._id && selectedRadioButton && input && input !== "") {

                let formElement = { ...element, points }

                handleSelectorFormFieldAnswers( formElement, element?.inputValue, input, selectedRadioButton, points );  

              } else {
                  
                let selected = false, currentField = formFields?.find( field => field?._id === element?._id );

                handleSelectorFormFieldAnswers( element, element?.inputValue, "", selected, points );
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
           onChange={e => handleChangedValue( e.target.value, setInputValue, { ...formFieldElement, inputValue: e.target.value }, saveFormField )}
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
              // checked={ (  studentsAnswer ) ? studentsAnswer['selected']  : ( formBuilderStatus === elementMeta?.state.Manage && checkedRadioButton?.id === formFieldElement?._id ) && checkedRadioButton?.isChecked }
            /> 
        }
        </span>
    </span>
    </>
    )
};

  const mapDispatch = {
    saveFormField,
    saveOnlineQuestion,
    saveFormFieldAnswer,
    saveFormFieldAnswerWithPoints
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
                            find( field => field?.fieldId === ownProps?.formFieldElement?._id  && 
                              field?.formName === ownProps?.formFieldElement?.formName && 
                               field?.formUuId === ownProps?.fieldProps?.formUuId &&  
                                field?.userId === (ownProps?.fieldProps?.userId ? ownProps?.fieldProps?.userId : ownProps?.currentUser?._id)),
    };
  };

export default connect( mapState, mapDispatch )(RadioButton);