import { connect } from 'react-redux';
import { role } from 'services/course/helpers/PageHelpers';
import { toggleIconStyleHeader, plusOneIconStyleHeader } from 'services/course/pages/FormBuilder/FormBuilderStepWizard/SelectExistingFormBuilderComponent/FormFields/inlineStyles';
import { elementMeta } from 'services/course/pages/QuestionsPage/helpers';
import Tooltip from '@mui/material/Tooltip';
import PlusOneIcon from '@material-ui/icons/PlusOne';
import SwapHorizIcon from '@material-ui/icons/SwapHoriz';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Roles from 'services/course/pages/components/Roles';

const EditorMenuComponent = ({
    element,
    selectedOnlineQuestion,
    toggleSetPreviewMode,
    toggleFormFieldSelector,
    formFieldQuestionProps,
    formBuilderState,
    currentUser,
}) => {
    let {
        previewMode, enableAddPointsToQuestionInputField, addPoints, toggleQuestionPointField
    } = formFieldQuestionProps;
    return <div>
        { <Roles role={ currentUser?.role === role.Tutor && formBuilderState === elementMeta.state.Manage }>
            <Tooltip title="Toggle Preview Mode" arrow>
                <SwapHorizIcon
                    style={ toggleIconStyleHeader() }
                    className="lesson-plan-round-button-1"
                    onClick={ () => toggleSetPreviewMode( element ) } 
                />
            </Tooltip>
            { previewMode?.isPreviewMode && selectedOnlineQuestion?._id === element?._id &&
            <Tooltip title="Add Form Field" arrow>
                <AddCircleIcon 
                style={plusOneIconStyleHeader()}
                className="comment-round-button-2"
                onClick={() => toggleFormFieldSelector( element )}
                /> 
            </Tooltip>
            }
            { previewMode?.isPreviewMode && selectedOnlineQuestion?._id === element?._id &&
            <Tooltip title="Display Points" arrow>
                <PlusOneIcon 
                style={plusOneIconStyleHeader()}
                className="comment-round-button-2"
                onClick={() => toggleQuestionPointField( element )}
                /> 
            </Tooltip>
            }
            { previewMode?.isPreviewMode && enableAddPointsToQuestionInputField && selectedOnlineQuestion?._id === element?._id &&
                <div className="form-question" >
                  <input
                    className="form-question-input"
                    type="number" 
                    value={  element?.pointsAssigned }
                    onChange={ e => addPoints( e?.target?.value, element ) }
                    placeholder={'+'}
                    style={ plusOneIconStyleHeader() }    
                  /> 
                </div>
            }
         </Roles> 
        }
    </div>
};

const mapState = ( state, ownProps ) => {
    return {
      currentUser: state?.users?.user
    };
  };
  export default connect(mapState,null)( EditorMenuComponent );