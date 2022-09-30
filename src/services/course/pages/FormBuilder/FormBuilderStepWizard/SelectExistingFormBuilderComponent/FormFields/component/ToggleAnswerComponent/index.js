import { useState } from 'react';
import { connect } from 'react-redux';        
import { saveFormFieldAnswer } from 'services/course/actions/formfieldanswers';    
import { getFormFieldAnswersByQuestionId } from 'services/course/selectors';
import { elementMeta } from 'services/course/pages/QuestionsPage/helpers';
import { handleToggleChange } from 'services/course/pages/FormBuilder/FormBuilderStepWizard/SelectExistingFormBuilderComponent/FormFields/component/Toggle/helpers';
import { setElementContentFromEditorState } from 'services/course/editor/MyEditorTest2/helpers';
import { FORMFIELD_MARKDOWN  } from 'services/course/actions/formfields';
import SidePanelDrawer from 'services/course/pages/FormBuilder/FormBuilderStepWizard/SelectExistingFormBuilderComponent/FormFields/component/SidePanelDrawer';
import useFormFieldAnswersHook from 'services/course/pages/FormBuilder/hooks/useFormFieldAnswersHook';
import ToggleButton from 'services/course/pages/components/ToggleButton';
import useFormFieldEditorComponentHook from 'services/course/pages/FormBuilder/hooks/useFormFieldEditorComponentHook';
import MyEditorTest2 from 'services/course/editor/MyEditorTest2';
// fix styling

const ToggleAnswerComponent = ( { 
    fieldProps,
    previewMode, 
    formFieldElement,
    selectedQuestion,
    formFields,
    studentAnswerByQuestionId,
    readOnly
} ) => {
    let { formBuilderState, formBuilderStatus, handleSelectorFormFieldAnswers } = fieldProps;

    const [ inputValue, setInputValue ] = useState('');
    const [ toggleCheckBox, setCheckedRadioButton ] = useState( ( formBuilderState === elementMeta?.state.Manage ) ? { id: formFieldElement?._id, isChecked: formFieldElement['selected'] } : {});

    let { studentsAnswers, setStudentsAnswers, getStudentAnswer,
      } = useFormFieldAnswersHook( studentAnswerByQuestionId, formFieldElement, formBuilderState );
  
    let {
         handleEditor 
    } = useFormFieldEditorComponentHook( FORMFIELD_MARKDOWN );

    const handleToggleButtonSelectionProps = {
        formFieldElement, handleSelectorFormFieldAnswers, formFields, setCheckedRadioButton, setStudentsAnswers,
    };

return(
    <>  
        { ( previewMode ) &&
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
                : <label className={ getStudentAnswer() ? 'answer-label-test-selected' : 'answer-label-test'} for={ formFieldElement?._id }> { formFieldElement?.inputValue } </label> 
            }   
          </div>
        } 
        {
         <div> <label> { `${ toggleCheckBox?.isChecked?.toString() }` }  </label> </div>           
        }
        { 
         <div>
            <ToggleButton
                isDisabled={false} 
                onChange={ e => handleToggleChange(e, handleToggleButtonSelectionProps ) }
                isChecked={ (  studentsAnswers && ( formBuilderState === elementMeta?.state.Taking || (formBuilderStatus === elementMeta?.status.Review ) || formBuilderStatus === elementMeta?.status.Reviewed || formBuilderStatus === elementMeta?.status.Reviewing )   ) ? studentsAnswers?.selected  : ( formBuilderState === elementMeta?.state.Manage && toggleCheckBox?.id === formFieldElement?._id ) && toggleCheckBox?.isChecked }
                value={ `${ toggleCheckBox?.isChecked?.toString() }` }
            />
             <div className="answer-content"> 
                <MyEditorTest2  
                  element={ formFieldElement } 
                  content={ formFieldElement?.markDownContent } 
                  readOnly={ readOnly } // form builder status is manage
                  showMenuButtons={ previewMode } 
                  setElementContentFromEditorState={ editorState => setElementContentFromEditorState( handleEditor, editorState, formFieldElement ) }
                />    
            </div> 
          </div>
        }  
    </>
    );
};

const mapDispatch = {
    saveFormFieldAnswer
};
  
const mapState = ( state, ownProps ) => { 
    return {
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

export default connect( mapState, mapDispatch )( ToggleAnswerComponent );