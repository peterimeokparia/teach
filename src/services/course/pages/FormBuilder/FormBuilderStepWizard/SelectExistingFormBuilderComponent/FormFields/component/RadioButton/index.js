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
handleChangedValue } from 'services/course/pages/FormBuilder/FormBuilderStepWizard/SelectExistingFormBuilderComponent/FormFields/helpers';

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

import MyEditorTest2 from 'services/course/editor/MyEditorTest2';
import MathScienceLatex from 'services/course/pages/OnlineQuestionsPage/components/MathScienceLatex';
import FormFieldPanel from 'services/course/pages/FormBuilder/FormBuilderStepWizard/SelectExistingFormBuilderComponent/FormFields/component/FormFieldPanel';
import useAssignPointsHook from 'services/course/pages/FormBuilder/hooks/useAssignPointsHook';
import useFormFieldAnswersHook from 'services/course/pages/FormBuilder/hooks/useFormFieldAnswersHook';
import './style.css';

const RadioButton = ( { 
  fieldProps,
  previewMode, 
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
    handleSelectorFormFieldAnswers,
  } = fieldProps;

  const [ inputValue, setInputValue ] = useState('');
  const radioButtonGroup = formFields?.filter( field => field?.parentComponentId === formFieldElement?.parentComponentId && field?.inputType === inputType.RadioButton );
  const radioButtonAnsGroup = formFieldAnswers?.filter( field => field?.parentComponentId === formFieldElement?.parentComponentId && field?.inputType === inputType.RadioButton );
  const [checkedRadioButton, setCheckedRadioButton ] = useState( ( formBuilderState === elementMeta?.state.Manage ) ? { id: formFieldElement?._id, isChecked: formFieldElement['selected'] } : {} );
  const [ mathModalOpen, setMathModalOpen ] = useState(false);

  let {
      addFieldPoints,
      handleTogglingModal,
  } = useAssignPointsHook({...fieldProps, formFieldElement, elememtFormFields,  saveOnlineQuestions, saveFormField, previewMode, fieldGroup: radioButtonGroup } );

  let {
    studentsAnswers,
    setStudentsAnswers
  } = useFormFieldAnswersHook( studentAnswerByQuestionId, formFieldElement );

  const handleRadionButtonSelectionProps = {
      formFieldElement,
      radioButtonAnsGroup,
      setCheckedRadioButton,
      radioButtonGroup,
      handleSelectorFormFieldAnswers,
      formFields,
      currentUser,
      setInputValue,
      setStudentsAnswers,
      saveFormField
  };

return(
    <>
      { ( previewMode ) && 
          <div className={"on-top"}>
            <FormFieldPanel props={ { ...fieldProps, handleTogglingModal, addFieldPoints, formFieldElement, setMathModalOpen }  }>
             <>
              <MathScienceLatex 
                  previewMode={previewMode} 
                  formElement={formFieldElement}
                  saveMathScienceFormField={saveFormField}
                  loadMathScienceFormField={loadFormFields}
              /> 
              {/* <MyEditorTest2 
                element={ formFieldElement }
                content={ formFieldElement?.inputValue }
                setElementContentFromEditorState={ editorState => setElementContentFromEditorState( editorState ) }
              /> */}
             </>
            </FormFieldPanel>
          </div>              
      }
      {( previewMode ) &&
        <div> 
          <input
              type={"text"}
              value={inputValue}
              onChange={e => handleChangedValue( e.target.value, setInputValue, { ...formFieldElement, inputValue: e.target.value }, saveFormField )}
              placeholder={formFieldElement?.inputValue} 
          />  
      </div>
      }
    <span>
        <span className="radioButton">

        { !previewMode &&
            <input
              type={ "radio" }
              value={ formFieldElement?.inputValue }
              onChange={ e => handleRadioButtonSelection( e, handleRadionButtonSelectionProps ) }
              name={ formFieldElement?.parentComponentId }
             // checked={ (  studentsAnswers && ( formBuilderState === elementMeta?.state.Taking || (formBuilderStatus === elementMeta?.status.Review ) || formBuilderStatus === elementMeta?.status.Reviewed || formBuilderStatus === elementMeta?.status.Reviewing )   ) ? studentsAnswers?.selected  : ( formBuilderState === elementMeta?.state.Manage && checkedRadioButton?.id === formFieldElement?._id ) && checkedRadioButton?.isChecked }
            /> 
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

export default connect( mapState, mapDispatch )(RadioButton);