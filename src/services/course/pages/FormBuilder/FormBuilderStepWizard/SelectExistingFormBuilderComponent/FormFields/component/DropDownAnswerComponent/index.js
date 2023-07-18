import { connect } from 'react-redux';
import { saveOnlineQuestions } from 'services/course/actions/onlinequestions';
import Select from 'react-select';
// import MathScienceLatex from 'services/course/pages/OnlineQuestionsPage/components/MathScienceLatex';
import FormFieldPanel from 'services/course/pages/FormBuilder/FormBuilderStepWizard/SelectExistingFormBuilderComponent/FormFields/component/FormFieldPanel';
import useAssignPointsHook from 'services/course/pages/FormBuilder/hooks/useAssignPointsHook';
import useDropDownSelectorHook from 'services/course/pages/FormBuilder/hooks/useDropDownSelectorHook';


import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { role } from 'services/course/helpers/PageHelpers';
import { loadFormFields, saveFormField } from 'services/course/actions/formfields';
import { elementMeta } from 'services/course/pages/QuestionsPage/helpers';
import { inputType } from 'services/course/pages/QuestionsPage/helpers';
import { loadFormFieldAnswers, saveFormFieldAnswer  } from 'services/course/actions/formfieldanswers';
import { handleRadioButtonSelection } from 'services/course/pages/FormBuilder/FormBuilderStepWizard/SelectExistingFormBuilderComponent/FormFields/component/RadioButton/helpers';
import { getFormFieldAnswersByQuestionId } from 'services/course/selectors';
import { update } from 'services/course/api';
import { setElementContentFromEditorState, handleEditor } from 'services/course/editor/MyEditorTest2/helpers';
import { loadFormFieldsByFormFieldId, SET_FORMFIELDS_MARKDOWN,  SAVE_FORMFIELDS_BEGIN,  SAVE_FORMFIELDS_SUCCESS } from 'services/course/actions/formfields';
import SidePanelDrawer from 'services/course/pages/FormBuilder/FormBuilderStepWizard/SelectExistingFormBuilderComponent/FormFields/component/SidePanelDrawer';
import useFormFieldEditorComponentHook from 'services/course/pages/FormBuilder/hooks/useFormFieldEditorComponentHook';
import { FORMFIELD_ANSWER_MARKDOWN, SET_FORMFIELDANSWERS_MARKDOWN } from 'services/course/actions/formfieldanswers';
import { FORMFIELD_MARKDOWN  } from 'services/course/actions/formfields';
import useFormFieldAnswersHook from 'services/course/pages/FormBuilder/hooks/useFormFieldAnswersHook';
import useSetRefHook from 'services/course/pages/FormBuilder/hooks/useSetRefHook';
import MyEditorTest2 from 'services/course/editor/MyEditorTest2';
import './style.css';
import isEqual from 'react-fast-compare';

const DropDownAnswerComponent = ({
  fieldProps,
  formFields,
  previewMode, 
  selectedQuestion,
  formFieldElement,
  loadFormFields,
  saveFormField,
  readOnly,
  loadFormFieldAnswers,
  saveFormFieldAnswer,
  saveOnlineQuestions,
  elememtFormFields,
  formFieldAnswers,
  studentAnswerByQuestionId,
  dropDownValues,
  currentUser
}) => {
    let { formBuilderState, formBuilderStatus, userId, formUuId, handleFormFieldAnswers } = fieldProps;

    let selectorProps = { userId, formUuId, dropDownValues, handleFormFieldAnswers, formFieldAnswers, studentAnswerByQuestionId, formFieldElement, currentUser, previewMode };

    let {
      input, inputValue, setInputValue,  mathModalOpen, setMathModalOpen, setInput,
      handleDropDownSelection, addOptionValue, deleteOptionValue, roleTypeCollection
    } = useDropDownSelectorHook( selectorProps );
  
    
    let { studentsAnswers, setStudentsAnswers, getStudentAnswer,
    } = useFormFieldAnswersHook( studentAnswerByQuestionId, formFieldElement, formBuilderState );

    let { fieldRef
    } = useSetRefHook( previewMode, formFieldElement, selectedQuestion );

    let {  
      handleEditor 
    } = useFormFieldEditorComponentHook( FORMFIELD_MARKDOWN );

    let {
      addFieldPoints, handleTogglingModal,
  } = useAssignPointsHook( {...fieldProps, formFieldElement, elememtFormFields, saveOnlineQuestions, saveFormField } );

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
                      selectedQuestion={selectedQuestion}
                      inputValue={inputValue}
                      setInputValue={setInputValue}
                  />
                  : <label className={ getStudentAnswer(formFieldElement) ? 'answer-label-test-selected' : 'answer-label-test'} for={ formFieldElement?._id }> { formFieldElement?.inputValue } </label> 
              }  
              <> 
              { ( previewMode ) && 
                  <div>
                      <input  
                          type={'text'}
                          value={input}
                          onChange={e => setInput( e.target.value )}
                      />
                      <button onClick={addOptionValue}>{"+"}</button>
                      { inputValue && <button onClick={deleteOptionValue}>{"-"}</button> }
                  </div>
              }
              { ( dropDownValues?.length > 0 ) &&  
                  <Select
                      placeholder={`Select`}
                      value={inputValue}
                      onChange={handleDropDownSelection}
                      options={ roleTypeCollection }  
                  />    
              }
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
  saveFormFieldAnswer
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

export default connect( mapState, mapDispatch )( DropDownAnswerComponent );
