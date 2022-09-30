import { useState } from 'react';
import { connect } from 'react-redux';
import { setElementContentFromEditorState } from 'services/course/editor/MyEditorTest2/helpers';
import { FORMFIELD_MARKDOWN  } from 'services/course/actions/formfields';
import { FORMFIELD_ANSWER_MARKDOWN, SET_FORMFIELDANSWERS_MARKDOWN } from 'services/course/actions/formfieldanswers';
import { addNewFormFieldAnswer, loadFormFieldAnswersByQuestionId  } from 'services/course/actions/formfieldanswers';
import { getFormFieldAnswersByQuestionId } from 'services/course/selectors';
import { getFormFieldAnswers } from 'services/course/pages/FormBuilder/helpers/formFieldHelpers';
import SidePanelDrawer from 'services/course/pages/FormBuilder/FormBuilderStepWizard/SelectExistingFormBuilderComponent/FormFields/component/SidePanelDrawer';
import useFormFieldEditorComponentHook from 'services/course/pages/FormBuilder/hooks/useFormFieldEditorComponentHook';
import MyEditorTest2 from 'services/course/editor/MyEditorTest2';
import './style.css';

// add explain answer component field selector ...!!!
const ExplainAnswerComponent = ({
  fieldProps,
  previewMode, 
  selectedQuestion,
  formFieldElement,
  studentAnswerByQuestionId,
  addNewFormFieldAnswer,
  loadFormFieldAnswersByQuestionId,
  saveProgress,
  readOnly }) => {

    let { handleMarkDownEditorAnswersPoints, handleMarkDownEditorAnswers, formUuId, eventId, question, currentUser } = fieldProps;
  
    const [ inputValue, setInputValue ] = useState('');

    let {
      handleEditor 
    } = useFormFieldEditorComponentHook( FORMFIELD_ANSWER_MARKDOWN );

  function handleFormEditorAnswer( editorState, formFieldElement ) {
    let editorProps = {
      handleEditor, 
      editorState, 
      formFieldElement,
      setElementContentFromEditorState
    };

    handleMarkDownEditorAnswers( formFieldElement, editorState, 0, editorProps );
  }

  function handleAnswerPoints( element, prevPoints, ) {
    let editorProps = {
      handleEditor,  
      formFieldElement,
      setElementContentFromEditorState
    };

    handleMarkDownEditorAnswersPoints( element, prevPoints, editorProps );
  }

  function displayEditor( formFieldElement ) {
    if ( !studentAnswerByQuestionId ) {
      let answerProps = {
        element: formFieldElement, 
        question, 
        currentUser, 
        formUuId, 
        eventId
      };
      
      let formFieldAnswer = { ...getFormFieldAnswers( answerProps ), inputValue: null, answer: null, points: 0 };

      addNewFormFieldAnswer( formFieldAnswer );
      loadFormFieldAnswersByQuestionId( formFieldAnswer?.questionId );
    }
  }

return (
         <div className="custom-answer">
             { 
                <>     
                { 
                 <div>
                  {  
                    <SidePanelDrawer
                      fieldProps={fieldProps} 
                      previewMode={ previewMode } 
                      formFieldElement={formFieldElement}
                      selectedQuestion={selectedQuestion}
                      inputValue={inputValue}
                      setInputValue={setInputValue}
                      handleAnswerPoints={handleAnswerPoints}
                    />
                  }  
                  <div className="answer-content"> 
                  { ( studentAnswerByQuestionId ) 
                      ?  <MyEditorTest2  
                          element={ studentAnswerByQuestionId } 
                          content={ studentAnswerByQuestionId?.markDownContent } 
                          readOnly={ false } // form builder status is manage
                          showMenuButtons={ true } 
                          setElementContentFromEditorState={ editorState => handleFormEditorAnswer( editorState, studentAnswerByQuestionId ) }
                        />   
                      : <button 
                          style={{width: 1000, height: 100, marginLeft: 170 }} 
                          onClick={() => displayEditor( formFieldElement )}
                        >
                          {'Answer Question'}
                        </button>
                  }
                  </div> 
                  </div>
                }
                </>      
             }
        </div>
    );
};

const mapState = ( state, ownProps ) => { 
  return {
    currentUsers: Object.values( state.users.users ),
    formFieldsLoading: state?.formFields?.formFieldsLoading,
    onFormFieldsLoadingError: state?.formFields?.onFormFieldsLoadingError,
    formFieldAnswersLoading: state?.formFieldAnswers?.formFieldAnswersLoading,
    onFormFieldAnswersLoadingError: state?.formFieldAnswers?.onFormFieldAnswersLoadingError,
    formQuestionPoints: Object.values( state?.formFieldPoints?.formFieldPoints )?.filter( field => field?.questionId === ownProps?.fieldProps?.question?._id ),
    saveProgress: state?.formFields?.saveInProgress,
    studentAnswerByQuestionId: getFormFieldAnswersByQuestionId(state, ownProps )   
  };
};

export default connect( mapState, { addNewFormFieldAnswer, loadFormFieldAnswersByQuestionId } )( ExplainAnswerComponent );
