import React from 'react';

import { 
connect } from 'react-redux';

import {
editor_upload_url,
handleChange } from 'services/course/pages/OnlineQuestionsPage/helpers';

import { 
formTypes } from 'services/course/pages/FormBuilder/helpers';

import {
deleteQuestionIconStyle,
videoMeta } from 'services/course/pages/OnlineQuestionsPage/components/OnlineListItems/inlineStyles.js';

import {
inputType } from 'services/course/pages/QuestionsPage/helpers';

import {
elementMeta } from 'services/course/pages/QuestionsPage/helpers';

import { 
role } from 'services/course/helpers/PageHelpers';

import { 
loadOnlineQuestions,  
saveOnlineQuestions } from 'services/course/actions/onlinequestions';

import { 
saveEditorMarkDownObjectToMw } from 'services/course/actions/editor';

import { 
SET_ONLINEQUESTION_MARKDOWN,
SET_EXPLANATION_ANSWER_MARKDOWN } from 'services/course/actions/onlinequestions';

import { 
handleChangedValue } from 'services/course/pages/FormBuilder/FormFields/helpers';

import Roles from 'services/course/pages/components/Roles';
import MaterialUiVideoComponent from 'services/course/pages/components/MaterialUiVideoComponent';
import EditorComponent from 'services/course/pages/components/EditorComponent';
import DeleteIcon from '@material-ui/icons/Delete';
import MiniSideBarMenu from 'services/course/pages/components/SubscriptionComponent/MiniSideBarMenu';
import MiniSideBarButton from 'services/course/pages/components/SubscriptionComponent/MiniSideBarButton';
import Basic from 'services/course/pages/components/SubscriptionComponent/MiniSideBarMenu/helper/formTypeSelector/Basic';  
import MathScience from 'services/course/pages/OnlineQuestionsPage/components/MathScience';
    
function OnlineQuestionEditorComponent({ 
  props,
  element,
  deleteQuestion,
  saveRecording,
  inputValue,
  setInputValue,
  saveOnlineQuestions,
  loadOnlineQuestions,
  saveEditorMarkDownObjectToMw }){

    let {
      formType,
      currentUser,
      formBuilderStatus,
      displayVideoComponent,
      previewMode,
      addNewMathScienceFormInputField
    } = props;

return (
  <div className={"OnlineListItems"}
    id={ element?._id }
  >
    <div> 
    <Roles role={ currentUser?.role === role.Tutor && formBuilderStatus === elementMeta.state.Manage }>
    <div className={"sideburgerMenu"}>  
    <span>
    <MiniSideBarMenu question={ element } formType={formType}>
      {( handleMouseDown, menuVisible ) => (
        <>
        <MiniSideBarButton
          mouseDown={ handleMouseDown }
          navMenuVisible={ menuVisible } 
        />
        <div id="sideFlyoutMenu" className={ menuVisible ? "show" : "hide" } >
        { <Basic question={ element }/> }
        </div>
        </>
      )}
    </MiniSideBarMenu>
    </span>  
    </div> 
    <span>
    { previewMode?.isPreviewMode &&  
      <DeleteIcon
        style={ deleteQuestionIconStyle() }
        className="comment-round-button-3"
        onClick={() => deleteQuestion( element )}
      />
    }
    </span> 
    </Roles>  
    <div className={ (formBuilderStatus === elementMeta.state.Taking ) ? 'editor-taking' : 'editor'  }>
    {(element?.inputType === inputType.MathScienceQuestion) &&
      <div className=""> 
      <MathScience 
        className={'editor-main'}
        previewMode={previewMode?.isPreviewMode} 
        formElement={element}
        saveMathScienceFormField={saveOnlineQuestions}
        loadMathScienceFormField={loadOnlineQuestions}
      />
        { (formType !== formTypes?.report) &&
          <div className="explanation-content"> 
            <EditorComponent
              id={element?._id}
              className={'editor-main'}
              name={element?.name}
              content={ element?.answerExplanationMarkDownContent }
              handleChange={(editor) => handleChange({ ...element, answerExplanationMarkDownContent: editor }, SET_EXPLANATION_ANSWER_MARKDOWN, `/onlinequestions/`, saveEditorMarkDownObjectToMw )}
              upload_url={editor_upload_url}
              readOnly={( currentUser?._id && element?.userId === currentUser?._id && currentUser?.role === role.Tutor) ? false : true}
            /> 
          </div>
        }
          </div>
        }
        {(element?.inputType === inputType.MainBodyTableColumnQuestion && 
          previewMode?.isPreviewMode  ) &&
          <div className="input"> 
            <input
              type={"text"}
              // value={ inputValue }
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
        }
        { (element?.inputType === inputType.MainBodyQuestion) &&
          <div>    
            <EditorComponent
              id={element?._id}
              className={'editor-main'}
              name={element?.name}
              upload_url={editor_upload_url} 
              content={ element?.markDownContent }
              handleChange={(editor) => handleChange({ ...element, markDownContent: editor }, SET_ONLINEQUESTION_MARKDOWN, `/onlinequestions/`, saveEditorMarkDownObjectToMw )}
              readOnly={( currentUser?._id && element?.userId === currentUser?._id && currentUser?.role === role.Tutor) ? false : true}
            /> 
            {(formType !== formTypes?.report) &&
            <div className="explanation-content"> 
              <EditorComponent
                id={element?._id}
                className={'editor-main'}
                name={element?.name}
                upload_url={editor_upload_url}
                content={ element?.answerExplanationMarkDownContent }
                handleChange={(editor) => handleChange({ ...element, answerExplanationMarkDownContent: editor }, SET_EXPLANATION_ANSWER_MARKDOWN, `/onlinequestions/`, saveEditorMarkDownObjectToMw )}
                readOnly={( currentUser?._id && element?.userId === currentUser?._id && currentUser?.role === role.Tutor) ? false : true}
              /> 
            </div>
          }
          { ( displayVideoComponent ) && 
              < MaterialUiVideoComponent 
                className={"onlineQuestionVideoComponent"} 
                element={ element } 
                videoMeta={videoMeta( element )}
                saveRecording={saveRecording}
                extendedMeetingSettings={false} 
              />
          }
          </div> 
        }
    </div>
    </div>
  </div>
 )
}

export default connect( null, { loadOnlineQuestions, saveOnlineQuestions, saveEditorMarkDownObjectToMw })(OnlineQuestionEditorComponent);
    
    