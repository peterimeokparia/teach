import { useState } from 'react';
import { connect } from 'react-redux';
import { elementMeta } from 'services/course/pages/QuestionsPage/helpers';
import { inputType } from 'services/course/pages/QuestionsPage/helpers';
import { handleCheckBoxSelection } from 'services/course/pages/FormBuilder/FormBuilderStepWizard/SelectExistingFormBuilderComponent/FormFields/component/CheckBox/helpers';
import { getFormFieldAnswersByQuestionId } from 'services/course/selectors';
import { setElementContentFromEditorState } from 'services/course/editor/MyEditorTest2/helpers';
import { FORMFIELD_MARKDOWN  } from 'services/course/actions/formfields';
import { role } from 'services/course/helpers/PageHelpers';
import SidePanelDrawer from 'services/course/pages/FormBuilder/FormBuilderStepWizard/SelectExistingFormBuilderComponent/FormFields/component/SidePanelDrawer';
import useFormFieldAnswersHook from 'services/course/pages/FormBuilder/hooks/useFormFieldAnswersHook';
import useSetRefHook from 'services/course/pages/FormBuilder/hooks/useSetRefHook';
import useFormFieldEditorComponentHook from 'services/course/pages/FormBuilder/hooks/useFormFieldEditorComponentHook';
import MyEditorTest2 from 'services/course/editor/MyEditorTest2';
import './style.css';

const CheckBoxAnswerComponent = ({
  fieldProps,
  previewMode, 
  selectedQuestion,
  formFieldElement,
  formFields,
  studentAnswerByQuestionId,
  currentUser,
  saveProgress,
  readOnly 
}) => {
    let { formBuilderState, formBuilderStatus, handleSelectorFormFieldAnswers } = fieldProps;
  
    const [ inputValue, setInputValue ] = useState('');
    const [ checkedButton, setCheckedButton ] = useState( ( formBuilderState === elementMeta?.state.Manage ) ? { id: formFieldElement?._id, isChecked: formFieldElement['selected'] } : {} );
    const checkBoxGroup = formFields?.filter( field => field?.parentComponentId === formFieldElement?.parentComponentId && field?.formUuId === formFieldElement?.formUuId && field?.inputType === inputType.CheckBox );
    
    let {
      studentsAnswers, getStudentAnswer
    } = useFormFieldAnswersHook( studentAnswerByQuestionId, formFieldElement, formBuilderState );

    let {
      fieldRef
    } = useSetRefHook( previewMode, formFieldElement, selectedQuestion );

    let {
      handleEditor 
    } = useFormFieldEditorComponentHook( FORMFIELD_MARKDOWN );

    const handleCheckBoxSelectionProps = {
      formFieldElement,
      prevSelection: ( formBuilderState === elementMeta?.state.Manage  ) ? formFieldElement?.selected : studentAnswerByQuestionId?.selected,
      handleSelectorFormFieldAnswers,
      setInputValue,
      setCheckedButton
    };

return (
        <div className="custom-answer">
          { 
            <>     
            { 
              <div>
              { ( previewMode ) 
                  ? <SidePanelDrawer
                      fieldProps={fieldProps} 
                      previewMode={ previewMode } 
                      formFieldElement={formFieldElement}
                      fieldGroup={checkBoxGroup}
                      selectedQuestion={selectedQuestion}
                      inputValue={inputValue}
                      setInputValue={setInputValue}   
                    />
                  : <label className={ getStudentAnswer() ? 'answer-checkbox-label-test-selected' : 'answer-checkbox-label-test'} for={ formFieldElement?._id }> { formFieldElement?.inputValue } </label> 
              }  
              <> 
                <input 
                  ref={fieldRef}
                  type="checkbox" id={ formFieldElement?._id } 
                  name="checkboxFruit" value={ formFieldElement?.inputValue } 
                  onChange={e => handleCheckBoxSelection( e, handleCheckBoxSelectionProps )}
                  checked={ (  studentsAnswers && ( formBuilderState === elementMeta?.state.Taking || (formBuilderStatus === elementMeta?.status?.Reviewed || formBuilderStatus === elementMeta?.status?.Review ) ) ) ? studentsAnswers?.selected  : ( formBuilderState === elementMeta?.state.Manage && checkedButton?.id === formFieldElement?._id ) && checkedButton?.isChecked }
                />               
              </>
              <>
              <div className={( currentUser.role === role.Student ) ? "answer-content-overlay": ""}/>
              <div className="answer-content"> 
                <MyEditorTest2  
                  element={ formFieldElement } 
                  content={ formFieldElement?.markDownContent } 
                  readOnly={ readOnly } // form builder status is manage
                  showMenuButtons={ previewMode } 
                  setElementContentFromEditorState={ editorState => setElementContentFromEditorState( handleEditor, editorState, formFieldElement ) }
                />    
              </div> 
              </>
              </div>
            }
            </>      
          }
        </div>
    );
};

const mapState = ( state, ownProps ) => { 
  return {
    currentUser: state.users.user,
    currentUsers: Object.values( state.users.users ),
    formFields: Object.values( state?.formFields?.formFields ).filter( field => field?.questionId === ownProps?.fieldProps?.question?._id ),
    formFieldsLoading: state?.formFields?.formFieldsLoading,
    onFormFieldsLoadingError: state?.formFields?.onFormFieldsLoadingError,
    formFieldAnswersLoading: state?.formFieldAnswers?.formFieldAnswersLoading,
    onFormFieldAnswersLoadingError: state?.formFieldAnswers?.onFormFieldAnswersLoadingError,
    formQuestionPoints: Object.values( state?.formFieldPoints?.formFieldPoints )?.filter( field => field?.questionId === ownProps?.fieldProps?.question?._id ),
    studentsAnswer: Object.values( state?.formFieldAnswers?.formFieldAnswers ),
    studentAnswerByQuestionId: getFormFieldAnswersByQuestionId(state, ownProps ),   
    saveProgress: state?.formFields?.saveInProgress  
  };
};

export default connect( mapState, null )( CheckBoxAnswerComponent );