import React from 'react';
import { connect } from 'react-redux';
import { deleteQuestionIconStyle } from 'services/course/pages/OnlineQuestionsPage/components/OnlineQuestionDetailPage/OnlineListItems/inlineStyles.js';
import { inputType } from 'services/course/pages/QuestionsPage/helpers';
import { elementMeta } from 'services/course/pages/QuestionsPage/helpers';
import { role } from 'services/course/helpers/PageHelpers';
import { saveEditorMarkDownObjectToMw } from 'services/course/actions/editor';
import Roles from 'services/course/pages/components/Roles';
import DeleteIcon from '@material-ui/icons/Delete';
import MiniSideBarMenu from 'services/course/pages/components/SubscriptionComponent/MiniSideBarMenu';
import MiniSideBarButton from 'services/course/pages/components/SubscriptionComponent/MiniSideBarButton';
import Basic from 'services/course/pages/components/SubscriptionComponent/MiniSideBarMenu/helper/formTypeSelector/Basic';  
import ReportEditorComponent from 'services/course/pages/OnlineQuestionsPage/components/OnlineQuestionsMultiEditorComponent/OnlineQuestionReportComponent/components/ReportEditorComponent';

function OnlineQuestionReportComponent({ 
  props,
  element,
  deleteQuestion }){
  let {
    formType,
    currentUser,
    formBuilderState,
    previewMode
  } = props;

return (
  <div className='OnlineListItems' id={ element?._id }>
    <div className='listItem'> 
      <div className='lessons'>
    <Roles role={ currentUser?.role === role.Tutor && formBuilderState === elementMeta.state.Manage }>
     <div className={"sideburgerMenu"}>  
      <span>
    {/* Refactor side bar for reports  */}
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
    <div className={'editor'}>
      {(element?.inputType === inputType.MainBodyTableColumnQuestion  ) &&
        <ReportEditorComponent 
        />
      }
    </div>
   </div> 
    </div>
  </div>
 );
}

export default connect( null, { saveEditorMarkDownObjectToMw })( OnlineQuestionReportComponent );
    
    