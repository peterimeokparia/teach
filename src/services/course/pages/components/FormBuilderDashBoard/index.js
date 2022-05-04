import {
useEffect } from 'react';

import { 
connect } from 'react-redux';
  
import { 
role } from 'services/course/helpers/PageHelpers';

import { 
red } from '@mui/material/colors';

import {
addNewFormBuilder,
saveFormBuilder,
loadFormBuilders } from 'services/course/actions/formbuilders';

import {
iconStyle
} from './inlineStyles';

import { 
useTheme } from '@mui/material/styles';

import { 
orange } from '@material-ui/core/colors';

import React from "react";
import Fab from '@mui/material/Fab';
import Zoom from '@mui/material/Zoom';
import StopCircleOutlinedIcon from '@mui/icons-material/StopCircleOutlined';
import PublishIcon from '@mui/icons-material/Publish';
import Tooltip from '@mui/material/Tooltip';
import Swal from 'sweetalert2';
import './style.css';
import { elementMeta } from '../../QuestionsPage/helpers';

const FormBuilderDashBoard = ({ 
  addNewFormBuilder,
  saveFormBuilder,
  loadFormBuilders,
  previewMode,
  currentUser,
  formBuilders,
  formQuestionPoints,
  formUuId,
  children }) => {

    const theme = useTheme();
    
    useEffect( () => {
    }, []);

function publishContent(){
  let publishForm = formBuilders?.find( form => form?.formUuId === formUuId );

  Swal.fire({
    title: 'Publish content',
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: 'Publish',
    confirmButtonColor: '#20c997',
    cancelButtonText: 'Cancel'
  }).then( (response) => {

    if ( response?.value &&  publishForm ) {    
      saveFormBuilder( { ...publishForm, orderedFormQuestions: [], status: elementMeta.status.Published, state: elementMeta.state.Manage,  userId: currentUser?._id } );
      return;
    } else {
      return;
    }

  });
};

function submit(){
  let submitForm = formBuilders?.find( form => form?.formUuId === formUuId );

  Swal.fire({
    title: 'Submit content',
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: 'Submit',
    confirmButtonColor: '#20c997',
    cancelButtonText: 'Cancel'
  }).then( (response) => {

    if ( response?.value &&  submitForm ) {    
      saveFormBuilder( { ...submitForm, status: elementMeta.status.Submitted, state: elementMeta.state.Submitted } );
      return;
    } else {
      return;
    }

  });

};

const fabStyle = {
  position: 'absolute',
  bottom: 16,
  right: 16,
};

const fabPublishStyle = {
  position: 'absolute',
  bottom: 26,
  right: 26,
};

const transitionDuration = {
  enter: theme.transitions.duration.enteringScreen,
  exit: theme.transitions.duration.leavingScreen,
};

const fabRedStyle = {
  color: 'common.white',
  bgcolor: red[500],
  '&:hover': {
    bgcolor: red[600],
  },
};

const fabOrangeStyle = {
  color: 'common.white',
  bgcolor: orange[500],
  '&:hover': {
    bgcolor: orange[600],
  },
};

const fabs =  [
  {
    color: 'primary',
    sx: { ...fabStyle, ...fabRedStyle },
    icon: <StopCircleOutlinedIcon onClick={ () => submit() } />,
    label: 'Submit',
    value: 0
  },
  {
    color: 'primary',
    sx: { ...fabPublishStyle, ...fabOrangeStyle },
    icon: <PublishIcon onClick={ () => publishContent() } />,
    label: 'Publish',
    value: 1
  }
];

return (
    <div className="clock">
        <span className="digital"> 
          { children }   
          <span>
            {
              fabs?.map((fab, index) => (
                  <Zoom
                    // key={fab.color}
                    in={((previewMode) ? fab.value : 0 )=== index }
                    timeout={transitionDuration}
                    style={{
                      "top": "50%",
                      "left": "177%",
                      color:"greenyellow",
                      transitionDelay: `${(fab.value === index) ? transitionDuration.exit : 0}ms`,
                    }}
                    unmountOnExit
                  >
                    <Fab sx={fab.sx} aria-label={fab.label} color={fab.color}>
                      {
                        <Tooltip title={fab.label} arrow>
                          {  fab.icon }
                        </Tooltip>  
                      }
                    </Fab>
                </Zoom>
              ))
            }
          </span>     
        </span> 
    </div>
); };

const mapDispatch = {
  addNewFormBuilder,
  saveFormBuilder,
  loadFormBuilders
};

const mapState = ( state, ownProps ) => {
  return {
    currentUser: state.users.user,
    formBuilders: Object.values( state.formBuilders?.formBuilders ),
    formQuestionPoints: Object.values( state?.formFieldPoints?.formFieldPoints )?.filter( field => field?.questionId === ownProps?.question?._id )
  };
};

export default connect( mapState, mapDispatch )( FormBuilderDashBoard );
