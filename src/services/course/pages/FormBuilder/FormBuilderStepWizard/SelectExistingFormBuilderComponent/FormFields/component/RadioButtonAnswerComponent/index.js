import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { role } from 'services/course/helpers/PageHelpers';
import { connect } from 'react-redux';
import { saveFormField } from 'services/course/actions/formfields';
import { elementMeta } from 'services/course/pages/QuestionsPage/helpers';
import { inputType } from 'services/course/pages/QuestionsPage/helpers';
import { saveFormFieldAnswer, loadFormFieldAnswersByQuestionId } from 'services/course/actions/formfieldanswers';
import { handleRadioButtonSelection } from 'services/course/pages/FormBuilder/FormBuilderStepWizard/SelectExistingFormBuilderComponent/FormFields/component/RadioButton/helpers';
import { getFormFieldAnswersByQuestionId } from 'services/course/selectors';
import { update } from 'services/course/api';
import { setElementContentFromEditorState, handleEditor } from 'services/course/editor/MyEditorTest2/helpers';
import { loadFormFieldsByFormFieldId, SET_FORMFIELDS_MARKDOWN,  SAVE_FORMFIELDS_BEGIN,  SAVE_FORMFIELDS_SUCCESS } from 'services/course/actions/formfields';
import { FORMFIELD_MARKDOWN  } from 'services/course/actions/formfields';
import SidePanelDrawer from 'services/course/pages/FormBuilder/FormBuilderStepWizard/SelectExistingFormBuilderComponent/FormFields/component/SidePanelDrawer';
import useFormFieldEditorComponentHook from 'services/course/pages/FormBuilder/hooks/useFormFieldEditorComponentHook';
import useFormFieldAnswersHook from 'services/course/pages/FormBuilder/hooks/useFormFieldAnswersHook';
import useSetRefHook from 'services/course/pages/FormBuilder/hooks/useSetRefHook';
import MyEditorTest2 from 'services/course/editor/MyEditorTest2';
import './style.css';
import isEqual from 'react-fast-compare';

const RadioButtonAnswerComponent = ({
  fieldProps,
  previewMode, 
  selectedQuestion,
  formFieldElement,
  formFields,
  currentUser,
  formFieldAnswers,
  saveFormField,
  loadFormFieldAnswersByQuestionId,
  studentAnswerByQuestionId,
  readOnly
}) => {
    let { formBuilderState, formBuilderStatus, formUuId, handleSelectorFormFieldAnswers } = fieldProps;
  
    const [ inputValue, setInputValue ] = useState('');
    const radioButtonGroup = formFields?.filter( field => field?.parentComponentId === formFieldElement?.parentComponentId && field?.inputType === inputType.RadioButton );
    const radioButtonAnsGroup = formFieldAnswers?.filter( field => field?.parentComponentId === formFieldElement?.parentComponentId && field?.formUuId === formUuId && field?.inputType === inputType.RadioButton );
    const [ checkedRadioButton, setCheckedRadioButton ] = useState( ( formBuilderState === elementMeta?.state.Manage ) ? { id: formFieldElement?._id, isChecked: formFieldElement['selected'] } : {} );

    let { studentsAnswers, setStudentsAnswers, getStudentAnswer,
    } = useFormFieldAnswersHook( studentAnswerByQuestionId, formFieldElement, formBuilderState );

    let { fieldRef
    } = useSetRefHook( previewMode, formFieldElement, selectedQuestion );

    let {
      handleEditor 
    } = useFormFieldEditorComponentHook( FORMFIELD_MARKDOWN );

    const handleRadionButtonSelectionProps = {
      formFieldElement, radioButtonAnsGroup, radioButtonGroup, handleSelectorFormFieldAnswers, studentAnswerByQuestionId,
      formFields, currentUser, saveFormField, setInputValue, setStudentsAnswers, setCheckedRadioButton, formBuilderState,
      loadFormFieldAnswersByQuestionId
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
                      fieldGroup={radioButtonGroup}
                      selectedQuestion={selectedQuestion}
                      inputValue={inputValue}
                      setInputValue={setInputValue}
                  />
                  : <label className={ getStudentAnswer(formFieldElement) ? 'answer-label-test-selected' : 'answer-label-test'} for={ formFieldElement?._id }> { formFieldElement?.inputValue } </label> 
              }  
              <> 
              <input 
                ref={fieldRef}
                type="radio" id={ formFieldElement?._id } 
                name="radioFruit" value={ formFieldElement?.inputValue } 
                onChange={ e => handleRadioButtonSelection( e, handleRadionButtonSelectionProps ) } 
                />                
              </>
              <> 
              <div className={( currentUser.role === role.Student ) ? "answer-content-overlay": ""}/> 
              <div className="answer-content"> 
                <MyEditorTest2  
                  element={ formFieldElement } 
                  content={ formFieldElement?.markDownContent } 
                  readOnly={ false } // form builder status is manage
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

const mapDispatch = {
  saveFormField,
  saveFormFieldAnswer,
  loadFormFieldAnswersByQuestionId
};

const mapState = ( state, ownProps ) => { 
  return {
    currentUser: state.users.user,
    currentUsers: Object.values( state.users.users ),
    formFields: Object.values( state?.formFields?.formFields ).filter( field => field?.questionId === ownProps?.fieldProps?.question?._id ),
    formFieldsLoading: state?.formFields?.formFieldsLoading,
    onFormFieldsLoadingError: state?.formFields?.onFormFieldsLoadingError,
    formFieldAnswers: Object.values( state?.formFieldAnswers?.formFieldAnswers ).filter( field => field?.questionId === ownProps?.formFieldElement?.questionId ),
    formFieldAnswersLoading: state?.formFieldAnswers?.formFieldAnswersLoading,
    onFormFieldAnswersLoadingError: state?.formFieldAnswers?.onFormFieldAnswersLoadingError,
    formQuestionPoints: Object.values( state?.formFieldPoints?.formFieldPoints )?.filter( field => field?.questionId === ownProps?.fieldProps?.question?._id ),
    studentAnswerByQuestionId: getFormFieldAnswersByQuestionId(state, ownProps ) 
  };
};

export default connect( mapState, mapDispatch )( RadioButtonAnswerComponent );
