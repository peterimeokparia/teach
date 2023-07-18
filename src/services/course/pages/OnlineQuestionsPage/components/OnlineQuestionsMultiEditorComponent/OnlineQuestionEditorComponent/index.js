import React, { useRef } from 'react';
import { connect } from 'react-redux';
import { deleteQuestionIconStyle, videoMeta } from 'services/course/pages/OnlineQuestionsPage/components/OnlineQuestionDetailPage/OnlineListItems/inlineStyles.js';
import { inputType } from 'services/course/pages/QuestionsPage/helpers';
import { elementMeta } from 'services/course/pages/QuestionsPage/helpers';
import { role } from 'services/course/helpers/PageHelpers';
import { QUESTION_MARKDOWN } from 'services/course/actions/onlinequestions';
import { EXPLAINER_MARKDOWN } from 'services/course/actions/onlinequestionexplainanswer';
import { formTypes } from 'services/course/pages/FormBuilder/helpers';
import useSectionPageRef from 'services/course/helpers/Hooks/useSectionPageRef';
import Roles from 'services/course/pages/components/Roles';
import MaterialUiVideoComponent from 'services/course/pages/components/MaterialUiVideoComponent';
import DeleteIcon from '@material-ui/icons/Delete';
import MiniSideBarMenu from 'services/course/pages/components/SubscriptionComponent/MiniSideBarMenu';
import MiniSideBarButton from 'services/course/pages/components/SubscriptionComponent/MiniSideBarButton';
import Basic from 'services/course/pages/components/SubscriptionComponent/MiniSideBarMenu/helper/formTypeSelector/Basic';  
import QuestionComponent from 'services/course/pages/OnlineQuestionsPage/components/OnlineQuestionsMultiEditorComponent/OnlineQuestionEditorComponent/components/QuestionComponent';

function OnlineQuestionEditorComponent({ 
  props,
  element,
  explainAnswer,
  selectedOnlineQuestion,
  deleteQuestion,
  saveRecording,
  outcomes 
}){
  let { formType, currentUser, formBuilderState, formBuilderStatus, displayVideoComponent, previewMode } = props;

  const inputRef = useRef( null );
  const questionOutcome = outcomes?.find( outcome => outcome?.links.find( link => link.uniqueId === element?.uniqueId ) );
  const { title } = Object(questionOutcome);

  let { setPageSectionRef } = useSectionPageRef( (selectedOnlineQuestion?._id === element?._id), inputRef );

return (
  <div className='OnlineListItems' id={ element?._id }>
    <div className='listItem'> 
      <div className='lessons'>
    <Roles role={ currentUser?.role === role.Tutor && formBuilderState === elementMeta.state.Manage }>
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
    <div className={ 'editor'  }> 
      {( formType === formTypes?.furtherstudy ) && 
        <>
        <div className='editor-header'>
          <div> <h1>{ title }</h1> </div> 
        </div>
        </> 
      }
      {(element?.inputType === inputType.MainBodyQuestion) &&
        <div className="">
            <QuestionComponent
              question={ element }
              editorMarkDownContentType={ QUESTION_MARKDOWN }
              formBuilderState={ formBuilderState }
              previewMode={ previewMode } 
              readOnly={ false }
              placeHolder={'Write question...'}
            />
          { ( formBuilderState !== elementMeta?.state.Taking || [ elementMeta?.status.Submitted, elementMeta?.status.Reviewed  ].includes( formBuilderStatus  )  ) && 
              <QuestionComponent
                question={ explainAnswer }
                editorMarkDownContentType={ EXPLAINER_MARKDOWN }
                previewMode={ previewMode } 
                formBuilderState={ formBuilderState }
                readOnly={ false }
                placeHolder={'Write answer and explanation...'}
              />
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
          {
            setPageSectionRef( (selectedOnlineQuestion?._id === element?._id), inputRef )
          }
        </div> 
      }
    </div>
   </div> 
    </div>
  </div>
 );
}

export default connect( null, null )(OnlineQuestionEditorComponent);
    
    