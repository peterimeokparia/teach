import React from "react";
import { connect } from 'react-redux';
import { loadOnlineQuestions,  saveOnlineQuestions, loadOnlineQuestionsByQuestionId } from 'services/course/actions/onlinequestions';
import MyEditorTest2 from 'services/course/editor/MyEditorTest2';
import './style.css';
// Refactor for reports
const ReportEditorComponent = ({
  className,
  question, 
  selectedQuestion,
  previewMode, 
  currentUser,
  markDownType,
  loadOnlineQuestions,  
  saveOnlineQuestions, 
  loadOnlineQuestionsByQuestionId,
  readOnly 
}) => {
function setElementContentFromEditorState( markDownContent, question ){
    if ( markDownContent ) {
        saveOnlineQuestions({ ...question, markDownContent });
        loadOnlineQuestionsByQuestionId( question?._id );
        loadOnlineQuestions();
    }
}

return (
         <div>
             { 
              <>
                {/* {(element?.inputType === inputType.MainBodyTableColumnQuestion && 
                      previewMode?.isPreviewMode  ) &&
                      <div className="input"> 
                        <input
                          type={"text"}
                          value={ element?.markDownContent ? element?.markDownContent : inputValue }
                          onChange={e => handleChangedValue( e.target.value, setInputValue, { ...element, markDownContent: e.target.value }, saveOnlineQuestions ) }
                          placeholder={""}
                        />  
                      </div>
                }
                {(element?.inputType === inputType.MainBodyTableColumnQuestion && 
                      !previewMode?.isPreviewMode  ) &&
                      <div className=""> 
                        {element?.markDownContent }
                      </div>
                } */}
                { <div className="">
                    <MyEditorTest2  
                      element={ question } 
                      content={ question?.markDownContent } 
                      readOnly={ false } 
                      showMenuButtons={ ( previewMode?.isPreviewMode && ( selectedQuestion?._id === question?._id) ) } 
                      setElementContentFromEditorState={ editorState => setElementContentFromEditorState( editorState, question ) }
                    /> 
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
      formFieldsLoading: state?.formFields?.formFieldsLoading,
      onFormFieldsLoadingError: state?.formFields?.onFormFieldsLoadingError,
      formFieldAnswers: Object.values( state?.formFieldAnswers?.formFieldAnswers ).filter( field => field?.questionId === ownProps?.form?.question?._id ),
      formFieldAnswersError: state?.formFieldAnswers?.onSaveError,
      formFieldAnswersLoading: state?.formFieldAnswers?.formFieldAnswersLoading,
      onFormFieldAnswersLoadingError: state?.formFieldAnswers?.onFormFieldAnswersLoadingError,
      formQuestionPoints: Object.values( state?.formFieldPoints?.formFieldPoints )?.filter( field => field?.questionId === ownProps?.form?.question?._id )
    };
  };

export default connect( mapState, { saveOnlineQuestions, loadOnlineQuestions, loadOnlineQuestionsByQuestionId })( ReportEditorComponent );