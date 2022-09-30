import { 
useState } from 'react';

import { 
connect } from 'react-redux';

import {
loadFormFields,  
saveFormField } from 'services/course/actions/formfields';

import {
loadOnlineQuestionsByQuestionId,
saveOnlineQuestions } from 'services/course/actions/onlinequestions';

import {
elementMeta } from 'services/course/pages/QuestionsPage/helpers';

import {
inputType } from 'services/course/pages/QuestionsPage/helpers';

import {
loadFormFieldAnswers,
saveFormFieldAnswer,
saveFormFieldAnswerWithPoints } from 'services/course/actions/formfieldanswers';

import {
handleRadioButtonSelection } from 'services/course/pages/FormBuilder/FormBuilderStepWizard/SelectExistingFormBuilderComponent/FormFields/component/RadioButton/helpers';

import { 
getFormFieldAnswersByQuestionId } from 'services/course/selectors';

import SidePanelDrawer from 'services/course/pages/FormBuilder/FormBuilderStepWizard/SelectExistingFormBuilderComponent/FormFields/component/SidePanelDrawer';
import useFormFieldAnswersHook from 'services/course/pages/FormBuilder/hooks/useFormFieldAnswersHook';
import useSetRefHook from 'services/course/pages/FormBuilder/hooks/useSetRefHook';
import './style.css';
  
  const RadioButtonTest = ( { 
    fieldProps,
    previewMode, 
    selectedQuestion,
    formFieldElement,
    elememtFormFields,
    formFields,
    currentUser,
    studentsAnswer,
    formFieldAnswers,
    saveOnlineQuestions,
    loadOnlineQuestionsByQuestionId,
    loadFormFields,
    saveFormField,
    studentAnswerByQuestionId,
    saveFormFieldAnswerWithPoints,
    loadFormFieldAnswers } ) => {
    
    let {
      formBuilderState,
      formBuilderStatus,
      handleSelectorFormFieldAnswers } = fieldProps;
  
    const [ inputValue, setInputValue ] = useState('');
    const radioButtonGroup = formFields?.filter( field => field?.parentComponentId === formFieldElement?.parentComponentId && field?.inputType === inputType.RadioButton );
    const radioButtonAnsGroup = formFieldAnswers?.filter( field => field?.parentComponentId === formFieldElement?.parentComponentId && field?.inputType === inputType.RadioButton );
    const [ checkedRadioButton, setCheckedRadioButton ] = useState( ( formBuilderState === elementMeta?.state.Manage ) ? { id: formFieldElement?._id, isChecked: formFieldElement['selected'] } : {} );
    
    let {
      studentsAnswers,
      setStudentsAnswers
    } = useFormFieldAnswersHook( studentAnswerByQuestionId, formFieldElement );

    let {
      fieldRef
    } = useSetRefHook( previewMode, formFieldElement, selectedQuestion );

    const handleRadionButtonSelectionProps = {
      formFieldElement,
      radioButtonAnsGroup,
      radioButtonGroup,
      handleSelectorFormFieldAnswers,
      formFields,
      currentUser,
      saveFormField,
      setInputValue,
      setStudentsAnswers,
      setCheckedRadioButton
    };

  return(
      <>
      {
        <SidePanelDrawer
          fieldProps={fieldProps} 
          previewMode={previewMode} 
          formFieldElement={formFieldElement}
          fieldGroup={radioButtonGroup}
          selectedQuestion={selectedQuestion}
          inputValue={inputValue}
          setInputValue={setInputValue}
        />
      }
      <span>
          <span className="radioButton">
          { !previewMode &&
            <div>
               <input
                ref={ !previewMode && formFieldElement?.questionId === selectedQuestion?._id  ? fieldRef : null }
                type={ "radio" }
                id={ formFieldElement?._id }
                value={ formFieldElement?.inputValue }
                onChange={ e => handleRadioButtonSelection( e, handleRadionButtonSelectionProps ) }
                name={ formFieldElement?.parentComponentId }
                checked={ formFieldElement?.selected }


                
                // checked={ checkedRadioButton?.isChecked }
                // checked={ ( formBuilderState === elementMeta?.state.Manage && checkedRadioButton?.id === formFieldElement?._id ) && checkedRadioButton?.isChecked }
                // checked={ (  studentsAnswers && ( formBuilderState === elementMeta?.state.Taking || (formBuilderStatus === elementMeta?.status.Review ) || formBuilderStatus === elementMeta?.status.Reviewed || formBuilderStatus === elementMeta?.status.Reviewing )   ) ? studentsAnswers?.selected  : ( formBuilderState === elementMeta?.state.Manage && checkedRadioButton?.id === formFieldElement?._id ) && checkedRadioButton?.isChecked }
                // checked={ (  studentsAnswers && ( formBuilderState === elementMeta?.state.Taking || (formBuilderStatus === elementMeta?.status.Review ) || formBuilderStatus === elementMeta?.status.Reviewed || formBuilderStatus === elementMeta?.status.Reviewing )) ? studentsAnswers?.selected  : ( formBuilderState === elementMeta?.state.Manage && checkedRadioButton?.id === formFieldElement?._id ) && checkedRadioButton?.isChecked }
                // checked={ (  studentsAnswers && ( formBuilderState === elementMeta?.state.Taking || (formBuilderStatus === elementMeta?.status?.Reviewed || formBuilderStatus === elementMeta?.status?.Review ) ) ) ? studentsAnswers?.selected  : ( formBuilderState === elementMeta?.state.Manage && checkedButton?.id === formFieldElement?._id ) && checkedButton?.isChecked }
              /> 
            </div>
          }
          </span>
      </span>
      </>
      )
  };
  
  const mapDispatch = {
    loadFormFields,
    saveFormField,
    saveOnlineQuestions,
    saveFormFieldAnswer,
    saveFormFieldAnswerWithPoints,
    loadFormFieldAnswers,
    loadOnlineQuestionsByQuestionId
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
      studentsAnswer: Object.values( state?.formFieldAnswers?.formFieldAnswers ),
      studentAnswerByQuestionId: getFormFieldAnswersByQuestionId(state, ownProps ),   
    };
  };
  
export default connect( mapState, mapDispatch )(RadioButtonTest);