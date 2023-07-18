import { useState} from 'react';
import { connect } from 'react-redux';
import { loadFormFields, loadFormFieldsByFormFieldId, saveFormField, saveFormFieldPoints } from 'services/course/actions/formfields';
import { saveFormFieldAnswer, saveFormFieldAnswerWithPoints } from 'services/course/actions/formfieldanswers';
import { getFormFieldAnswersByQuestionId } from 'services/course/selectors';
import { saveOnlineQuestions } from 'services/course/actions/onlinequestions';
import { handleChangedValue } from 'services/course/pages/FormBuilder/FormBuilderStepWizard/SelectExistingFormBuilderComponent/FormFields/helpers';
import renderExplanationSidePanelFields from 'services/course/pages/FormBuilder/FormBuilderStepWizard/SelectExistingFormBuilderComponent/FormFields/component/SidePanelDrawer/helpers/renderExplanationSidePanelFields';
import renderDraggableSidePanelFields from 'services/course/pages/FormBuilder/FormBuilderStepWizard/SelectExistingFormBuilderComponent/FormFields/component/SidePanelDrawer/helpers/renderDraggableSidePanelFields';
import renderDropDownSidePanelFields from 'services/course/pages/FormBuilder/FormBuilderStepWizard/SelectExistingFormBuilderComponent/FormFields/component/SidePanelDrawer/helpers/renderDropDownSidePanelFields';
import renderInputSidePanelFields from 'services/course/pages/FormBuilder/FormBuilderStepWizard/SelectExistingFormBuilderComponent/FormFields/component/SidePanelDrawer/helpers/renderInputSidePanelFields';
import FormFieldPanel from 'services/course/pages/FormBuilder/FormBuilderStepWizard/SelectExistingFormBuilderComponent/FormFields/component/FormFieldPanel';
import useAssignPointsHook from 'services/course/pages/FormBuilder/hooks/useAssignPointsHook';
import useHandleMarkDownEditorHook from 'services/course/pages/FormBuilder/hooks/useHandleMarkDownEditorHook';
import useSetRefHook from 'services/course/pages/FormBuilder/hooks/useSetRefHook';
import './style.css';

const SidePanelDrawer = ( { 
    fieldProps,
    previewMode, 
    formFieldElement,
    fieldGroup,
    selectedQuestion,
    setInputValue,
    elementFormFields,
    saveOnlineQuestions,
    loadFormFieldsByFormFieldId,
    loadFormFields,
    saveFormField,
    saveFormFieldPoints,
    saveFormFieldAnswer,
    saveFormFieldAnswerWithPoints,
    handleAnswerPoints,
    fieldAnswer,
    inputValue 
  } ) => {
    const [ openDrawer, setOpenDrawer ] = useState( false );
   
    let { points, setPoints, addExplanationQuestionFieldPoints, addExplanationAnswerFieldPoints, handleTogglingModal 
    } = useAssignPointsHook({...fieldProps, formFieldElement, elementFormFields, saveOnlineQuestions, saveFormField, saveFormFieldPoints, previewMode, fieldGroup, handleAnswerPoints, openDrawer } );
  
    let {
      setElementContentFromEditorState 
    } = useHandleMarkDownEditorHook({ previewMode, formFieldElement, saveFormField, loadFormFields, loadFormFieldsByFormFieldId });

    let { fieldRef } = useSetRefHook( previewMode, formFieldElement, selectedQuestion );

    let sidePanelHelperProps = {
      fieldProps, fieldRef, previewMode, fieldAnswer, formFieldElement, openDrawer, selectedQuestion,
      points, saveFormField, saveFormFieldAnswer, saveFormFieldAnswerWithPoints, loadFormFieldsByFormFieldId,
      inputValue, setInputValue, setOpenDrawer, addExplanationQuestionFieldPoints, addExplanationAnswerFieldPoints,
      handleChangedValue
    };
    
return(
    <div className='sidePanel'>  
    { ( previewMode ) &&
        <div className={"on-top"}>
          <FormFieldPanel props={ { ...fieldProps, loadFormFields, handleTogglingModal, setPoints, formFieldElement, saveFormField, setInputValue, setElementContentFromEditorState, openDrawer } } />
        </div>
    } 
    <span>
    {
      renderDraggableSidePanelFields( sidePanelHelperProps )
    }
    {
      renderExplanationSidePanelFields( sidePanelHelperProps )
    }
    {
      renderInputSidePanelFields( sidePanelHelperProps )
    }
    {
      renderDropDownSidePanelFields( sidePanelHelperProps )
    }
    </span>
    </div>
    );
};

const mapDispatch = {
    loadFormFieldsByFormFieldId,
    loadFormFields,
    saveFormFieldAnswer,
    saveFormFieldAnswerWithPoints,
    saveFormField,
    saveFormFieldPoints,
    saveOnlineQuestions
};
  
const mapState = ( state, ownProps ) => { 
return {
    currentUser: state.users.user,
    currentUsers: Object.values( state.users.users ),
    formfields: Object.values( state?.formFields?.formFields ).filter( field => field?.questionId === ownProps?.fieldProps?.question?._id ),
    elementFormFields: Object.values( state?.formFields?.formFields ).filter( field => field?.questionId === ownProps?.formFieldElement?.questionId ),
    formFieldsLoading: state?.formFields?.formFieldsLoading,
    onFormFieldsLoadingError: state?.formFields?.onFormFieldsLoadingError,
    fieldAnswer: getFormFieldAnswersByQuestionId( state, ownProps ),
    formFieldAnswersLoading: state?.formFieldAnswers?.formFieldAnswersLoading,
    onFormFieldAnswersLoadingError: state?.formFieldAnswers?.onFormFieldAnswersLoadingError,
    formQuestionPoints: Object.values( state?.formFieldPoints?.formFieldPoints )?.filter( field => field?.questionId === ownProps?.fieldProps?.question?._id ),
 };
};

export default connect( mapState, mapDispatch )(SidePanelDrawer);