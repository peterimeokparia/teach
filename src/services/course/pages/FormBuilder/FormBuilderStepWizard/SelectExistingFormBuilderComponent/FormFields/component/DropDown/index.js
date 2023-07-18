import { connect } from 'react-redux';
import { saveFormField } from 'services/course/actions/formfields';
import { loadFormFieldAnswers, saveFormFieldAnswer } from 'services/course/actions/formfieldanswers';
import { getFormFieldAnswersByQuestionId } from 'services/course/selectors';
import SidePanelDrawer from 'services/course/pages/FormBuilder/FormBuilderStepWizard/SelectExistingFormBuilderComponent/FormFields/component/SidePanelDrawer';
import useDropDownSelectorHook from 'services/course/pages/FormBuilder/hooks/useDropDownSelectorHook';
import CustomSelectComponent from 'services/course/pages/components/CustomSelectComponent';
import MyEditorTest2 from 'services/course/editor/MyEditorTest2';
import './style.css';

const DropDown = ( { 
    fieldProps,
    previewMode, 
    formFieldElement,
    selectedQuestion,
    saveFormField,
    loadFormFieldAnswers,
    saveFormFieldAnswer,
    formFieldAnswers,
    studentAnswerByQuestionId,
    dropDownValues,
    currentUser
}) => {
    let { userId, formUuId, handleFormFieldAnswers, formBuilderState  } = fieldProps;

    let selectorProps = { userId, formUuId, dropDownValues, handleFormFieldAnswers, formFieldAnswers, studentAnswerByQuestionId,
        saveFormField, loadFormFieldAnswers, saveFormFieldAnswer, formFieldElement, currentUser, previewMode
    };

    let {
        inputValue, handleInputValue,
        addOptionValue, deleteOptionValue, editorState, setEditorStateTest
    } = useDropDownSelectorHook( selectorProps );

return(
    <>
    { ( !previewMode ) &&   
        <div>
        { ( dropDownValues?.length > 0 ) &&  
            <CustomSelectComponent 
                formFieldElement={formFieldElement} 
                dropDownOptions={dropDownValues}
                setInputValue={handleInputValue}
                previewMode={previewMode}
                formBuilderState={formBuilderState}
                studentAnswer={studentAnswerByQuestionId}
                currentUser={currentUser}
            />
        }
        </div>
    }
    { ( previewMode ) && 
        <SidePanelDrawer
            fieldProps={fieldProps} 
            previewMode={ previewMode } 
            formFieldElement={formFieldElement}
            selectedQuestion={selectedQuestion}
        />
    }
    { ( previewMode ) && 
    <>
        <div className='row button-add-remove'>
            <button className={'field-button-add-selected'} onClick={addOptionValue}>{"+"}</button>
            { inputValue && <button className={'field-button-remove-selected'} onClick={deleteOptionValue}>{"-"}</button> }
        </div>
        <div>
        { ( dropDownValues?.length > 0 ) &&  
            <CustomSelectComponent 
                formFieldElement={formFieldElement} 
                dropDownOptions={dropDownValues}
                setInputValue={handleInputValue}
                previewMode={previewMode}
                currentUser={currentUser}
            />
        }
        </div>
        <div className='row editor-select'>
            <MyEditorTest2  
                placeHolder={'write something'}
                element={ formFieldElement } 
                content={ editorState } 
                readOnly={ false } // form builder status is manage
                showMenuButtons={ ( ( previewMode  ) ) } 
                setElementContentFromEditorState={ editorState => setEditorStateTest( editorState ) }
            />    
        </div>
        </>
    }
    </>
    );
};

const mapState = ( state, ownProps ) => {
    return {
        currentUser: state.users.user,
        saveLessonInProgress: state.lessons.saveLessonInProgress,
        onlineQuestions: Object.values(state.onlineQuestions.onlineQuestions),
        error: state.lessons.onSaveLessonError,
        formFieldAnswers: state?.formFieldAnswers?.formFieldAnswers,
        studentAnswerByQuestionId: getFormFieldAnswersByQuestionId(state, ownProps)
    };
};

export default connect( mapState, { saveFormField, saveFormFieldAnswer, loadFormFieldAnswers } )(DropDown);