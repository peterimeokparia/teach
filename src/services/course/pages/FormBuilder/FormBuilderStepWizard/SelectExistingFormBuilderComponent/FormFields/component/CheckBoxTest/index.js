import  { 
useState } from 'react';

import { 
connect } from 'react-redux';
    
import {
saveFormField, 
loadFormFields,
loadFormFieldsByFormFieldId } from 'services/course/actions/formfields';

import {
saveOnlineQuestions } from 'services/course/actions/onlinequestions';

import {
elementMeta, 
inputType } from 'services/course/pages/QuestionsPage/helpers';

import {
handleCheckBoxSelection } from 'services/course/pages/FormBuilder/FormBuilderStepWizard/SelectExistingFormBuilderComponent/FormFields/component/CheckBox/helpers';

import { 
getFormFieldAnswersByQuestionId } from 'services/course/selectors';

import useFormFieldAnswersHook from 'services/course/pages/FormBuilder/hooks/useFormFieldAnswersHook';
import SidePanelDrawer from 'services/course/pages/FormBuilder/FormBuilderStepWizard/SelectExistingFormBuilderComponent/FormFields/component/SidePanelDrawer';
import useSetRefHook from 'services/course/pages/FormBuilder/hooks/useSetRefHook';

const CheckBoxTest = ( { 
    fieldProps,
    previewMode,
    selectedQuestion,
    currentUser,
    formFieldElement,
    elememtFormFields,
    formFields,
    setSelected,
    formFieldAnswers,
    checkBoxFormFields,
    saveOnlineQuestions,
    studentAnswerByQuestionId,
    loadFormFields,
    loadFormFieldsByFormFieldId,
    saveFormField } ) => {
    
    const [ inputValue, setInputValue ] = useState('');
    const checkBoxGroup = formFields?.filter( field => field?.parentComponentId === formFieldElement?.parentComponentId && field?.inputType === inputType.CheckBox );
   
    let {
      formBuilderState,
      formBuilderStatus,
      handleSelectorFormFieldAnswers } = fieldProps;

    let {
      studentsAnswers
    } = useFormFieldAnswersHook( studentAnswerByQuestionId );

    const [ checkedButton, setCheckedButton ] = useState( ( formBuilderState === elementMeta?.state.Manage ) ? { id: formFieldElement?._id, isChecked: formFieldElement['selected'] } : {} );

    let {
      fieldRef
    } = useSetRefHook( previewMode, formFieldElement, selectedQuestion );

    const handleCheckBoxSelectionProps = {
      formFieldElement,
      handleSelectorFormFieldAnswers,
      setInputValue,
      setCheckedButton
    };

return(
    <>
    {
      <SidePanelDrawer
        fieldProps={fieldProps} 
        previewMode={previewMode} 
        formFieldElement={formFieldElement}
        fieldGroup={checkBoxGroup}
        selectedQuestion={selectedQuestion}
        inputValue={inputValue}
        setInputValue={setInputValue}
      />
    }
    <span>
        <span className="radioButton">
        { !previewMode &&
            <input
              ref={ !previewMode && formFieldElement?.questionId === selectedQuestion?._id  ? fieldRef : null }
              type={"checkbox"}
              id={ formFieldElement?._id }
              value={ formFieldElement?.inputValue }
              onChange={e => handleCheckBoxSelection( e, handleCheckBoxSelectionProps )}
              name={ formFieldElement?._id }
              checked={ (  studentsAnswers && ( formBuilderState === elementMeta?.state.Taking || (formBuilderStatus === elementMeta?.status?.Reviewed || formBuilderStatus === elementMeta?.status?.Review ) ) ) ? studentsAnswers?.selected  : ( formBuilderState === elementMeta?.state.Manage && checkedButton?.id === formFieldElement?._id ) && checkedButton?.isChecked }
            /> 
        }
        </span>
    </span>
    </>
    )
};


 const mapDispatch = {
    saveFormField,
    loadFormFields,
    loadFormFieldsByFormFieldId,
    saveOnlineQuestions
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
      studentAnswerByQuestionId: getFormFieldAnswersByQuestionId(state, ownProps)
    };
  };

export default connect( mapState, mapDispatch )(CheckBoxTest);