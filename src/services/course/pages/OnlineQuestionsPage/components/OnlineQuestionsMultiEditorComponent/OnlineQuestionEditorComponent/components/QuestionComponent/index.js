import React from "react";
import { elementMeta } from 'services/course/pages/QuestionsPage/helpers';
import { connect } from 'react-redux';
import { saveOnlineQuestions, saveMarkDowns, loadOnlineQuestionsByQuestionId, loadOnlineQuestions } from 'services/course/actions/onlinequestions';
import { setMarkDown } from 'services/course/actions/editor';
import { setElementContentFromEditorState } from 'services/course/editor/MyEditorTest2/helpers';
import useQuestionComponentHook from 'services/course/pages/OnlineQuestionsPage/hooks/useQuestionComponentHook';
import MyEditorTest2 from 'services/course/editor/MyEditorTest2';
import './style.css';

const QuestionComponent = ({
  question, 
  selectedOnlineQuestion,
  editorMarkDownContentType,
  currentUser, 
  formBuilderState,
  setMarkDown,
  markDownContent,
  saveMarkDowns,
  saveOnlineQuestions,
  loadOnlineQuestionsByQuestionId,
  loadOnlineQuestions,
  onlineQuestions,
  readOnly,
  placeHolder
}) => {
  let useQuestionComponentHookProps = {
    loadOnlineQuestionsByQuestionId, 
    loadOnlineQuestions,
    setMarkDown,
    question,
    saveMarkDowns,
    saveOnlineQuestions, 
    editorMarkDownContentType };

  let {
    handleEditor
  } = useQuestionComponentHook( useQuestionComponentHookProps );

return (
         <div>
          { <>
              { 
                <div className={'question-content'}>       
                  <MyEditorTest2  
                    element={ question } 
                    content={ question?.markDownContent }
                    readOnly={ false } // form builder status is manage
                    showMenuButtons={ true } 
                    setElementContentFromEditorState={ editorState => setElementContentFromEditorState( handleEditor, editorState, question ) }
                    placeHolder={ placeHolder }
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
    onlineQuestions: state.onlineQuestions.onlineQuestions,
    selectedOnlineQuestion: state.onlineQuestions.selectedOnlineQuestion
  };
};

export default connect( mapState, { saveMarkDowns, setMarkDown, saveOnlineQuestions, loadOnlineQuestionsByQuestionId, loadOnlineQuestions })( QuestionComponent );